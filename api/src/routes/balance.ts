import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

function getBalances(app: FastifyInstance) {
  app.get('/balances', async (request, reply) => {
    try {
      const balances = await prisma.balance.findMany({
        where: {
          userId: request.user.sub,
        },
      })

      return reply.status(200).send({ balances })
    } catch (err) {
      return reply.status(404).send({ error: 'Erro interno do servidor!', err })
    }
  })
}

function getBalance(app: FastifyInstance) {
  app.get('/balances/:id', async (request, reply) => {
    try {
      const paramsSchema = z.object({
        id: z.string().uuid(),
      })
      const { id } = paramsSchema.parse(request.params)

      const balance = await prisma.balance.findUniqueOrThrow({
        where: {
          id,
        },
      })

      return {
        balance,
      }
    } catch (err) {
      return reply.status(500).send({ error: 'Erro no servidor', err })
    }
  })
}

function createBalance(app: FastifyInstance) {
  app.post('/balances', async (request, reply) => {
    try {
      const bodySchema = z.object({
        name: z.string(),
        description: z.string(),
        initial_value: z.coerce.number(),
      })
      const { name, initial_value, description } = bodySchema.parse(request.body)

      await prisma.balance.create({
        data: {
          userId: request.user.sub,
          name,
          description,
          initial_value,
        },
      })

      return reply.status(200).send({ message: 'Saldo criado com sucesso.' })
    } catch (err) {
      return reply.status(500).send({ error: 'Erro ao criar novo saldo.', err })
    }
  })
}

function updateBalance(app: FastifyInstance) {
  app.patch('/balances/:id', async (request, reply) => {
    try {
      const paramsSchema = z.object({
        id: z.string().uuid(),
      })
      const { id } = paramsSchema.parse(request.params)

      const bodySchema = z.object({
        name: z.string(),
        description: z.string(),
      })
      const { name, description } = bodySchema.parse(request.body)

      const balance = await prisma.balance.update({
        data: {
          name,
          description,
        },
        where: {
          id,
        },
      })

      return reply.status(200).send({ message: 'Saldo atualizado com sucesso.', balance })
    } catch (err) {
      return reply.status(500).send({ error: 'Erro no servidor', err })
    }
  })
}

function deleteBalance(app: FastifyInstance) {
  app.delete('/balances/:id', async (request, reply) => {
    try {
      const paramsSchema = z.object({
        id: z.string().uuid(),
      })
      const { id } = paramsSchema.parse(request.params)

      const balance = await prisma.balance.delete({
        where: {
          id,
        },
      })

      return reply.status(200).send({ message: 'Saldo deletado com sucesso.', balance })
    } catch (err) {
      return reply.status(500).send({ error: 'Erro no servidor', err })
    }
  })
}

export async function balanceRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })

  getBalances(app)
  getBalance(app)
  createBalance(app)
  updateBalance(app)
  deleteBalance(app)
}
