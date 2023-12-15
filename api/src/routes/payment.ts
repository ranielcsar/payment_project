import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'
import { Balance } from '@prisma/client'

function getPayments(app: FastifyInstance) {
  app.get('/payments', async (request, reply) => {
    try {
      const payments = await prisma.payment.findMany({
        where: {
          userId: request.user.sub,
        },
      })

      return reply.status(200).send({ payments })
    } catch (err) {
      return reply.status(404).send({ error: 'Erro interno do servidor!', err })
    }
  })
}

function getPayment(app: FastifyInstance) {
  app.get('/payments/:id', async (request, reply) => {
    try {
      const paramsSchema = z.object({
        id: z.string().uuid(),
      })
      const { id } = paramsSchema.parse(request.params)

      const payment = await prisma.payment.findUniqueOrThrow({
        where: {
          id,
        },
      })

      return reply.status(200).send({ payment })
    } catch (err) {
      return reply.status(404).send({ error: 'Pagamento não encontrado!', err })
    }
  })
}

function createPayment(app: FastifyInstance) {
  app.post('/payments', async (request, reply) => {
    try {
      const userId = request.user.sub

      const bodySchema = z.object({
        name: z.string(),
        description: z.string(),
        value: z.coerce.number(),
        balance_to_use: z.string(),
      })
      const { name, value, description, balance_to_use } = bodySchema.parse(request.body)

      const balance = await prisma.balance.findFirst({
        where: {
          id: balance_to_use,
          userId,
        },
      })

      if (!balance) {
        return reply.status(404).send({ error: 'Saldo não encontrado' })
      }

      const payment = await prisma.payment.create({
        data: {
          name,
          description,
          value,
          userId,
          balanceId: balance_to_use,
        },
      })

      await prisma.balance.update({
        data: {
          ...balance,
          used_value: calculateUsedValue(value, balance),
          remaining_value: calculateRemainingValue(value, balance),
        },
        where: {
          id: balance.id,
          userId,
        },
      })

      return { payment }
    } catch (err) {
      return reply.status(500).send({ error: 'Erro no servidor', err })
    }
  })
}

function updatePayment(app: FastifyInstance) {
  app.patch('/payments/:id', async (request, reply) => {
    try {
      const paramsSchema = z.object({
        id: z.string().uuid(),
      })
      const { id } = paramsSchema.parse(request.params)

      const bodySchema = z.object({
        name: z.string(),
      })
      const { name } = bodySchema.parse(request.body)

      const payment = await prisma.payment.update({
        data: {
          name,
        },
        where: {
          id,
        },
      })

      return reply
        .status(200)
        .send({ message: 'Pagamento atualizado com sucesso.', payment })
    } catch (err) {
      return reply.status(500).send({ error: 'Erro no servidor', err })
    }
  })
}

function deletePayment(app: FastifyInstance) {
  app.delete('/payments/:id', async (request, reply) => {
    try {
      const userId = request.user.sub

      const paramsSchema = z.object({
        id: z.string().uuid(),
      })
      const { id } = paramsSchema.parse(request.params)

      const payment = await prisma.payment.delete({
        where: {
          id,
        },
      })

      if (!payment) return reply.status(404).send({ error: 'Pagamento não encontrado' })

      const balance = await prisma.balance.findFirst({
        where: {
          id: payment.balanceId,
        },
      })

      if (!balance) return reply.status(404).send({ error: 'Saldo não encontrado' })

      await prisma.balance.update({
        data: {
          ...balance,
          used_value: (balance.used_value ? balance.used_value : 0) - payment.value,
          remaining_value:
            (balance.remaining_value ? balance.remaining_value : 0) + payment.value,
        },
        where: {
          id: balance.id,
          userId,
        },
      })

      return reply
        .status(200)
        .send({ message: 'Pagamento deletado com sucesso.', payment })
    } catch (err) {
      return reply.status(500).send({ error: 'Erro no servidor', err })
    }
  })
}

export async function paymentRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })

  getPayments(app)
  getPayment(app)
  createPayment(app)
  updatePayment(app)
  deletePayment(app)
}

function calculateUsedValue(value: number, { used_value }: Balance) {
  if (!used_value) return value

  return used_value + value
}

function calculateRemainingValue(value: number, { initial_value, used_value }: Balance) {
  const result = (used_value ? used_value : 0) + value

  return initial_value - result
}
