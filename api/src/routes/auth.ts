import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'
import bcrypt, { compare } from 'bcrypt'

function register(app: FastifyInstance) {
  app.post('/register', async (request, reply) => {
    try {
      const bodySchema = z.object({
        email: z.string(),
        name: z.string(),
        username: z.string(),
        password: z.string(),
      })

      const { email, name, username, password } = bodySchema.parse(request.body)

      let user = await prisma.user.findFirst({
        where: {
          email,
        },
      })

      if (user) {
        return reply.status(409).send({ error: 'Usuário já cadastrado' })
      }

      const existingUsername = await prisma.user.findFirst({
        where: {
          username,
        },
      })

      if (existingUsername) {
        return reply.status(409).send({ error: 'Nome de usuário já existe' })
      }

      const hashPassword = await bcrypt.hash(password, 10)

      user = await prisma.user.create({
        data: {
          email,
          name,
          username,
          password: hashPassword,
        },
      })

      return reply.status(200).send({ message: 'Usuário criado com sucesso' })
    } catch (err) {
      return reply.status(500).send({ error: 'Erro interno no servidor', err })
    }
  })
}

function login(app: FastifyInstance) {
  app.post('/login', async (request, reply) => {
    try {
      const bodySchema = z.object({
        email: z.string(),
        password: z.string(),
      })

      const { email, password } = bodySchema.parse(request.body)

      let user = await prisma.user.findFirstOrThrow({
        where: {
          email,
        },
      })

      const is_valid = await compare(password, user.password)

      if (is_valid) {
        const token = app.jwt.sign(
          {
            name: user.name,
            username: user.username,
            email,
          },
          {
            sub: user.id,
            expiresIn: '7 days',
          }
        )

        return reply.status(200).send({ token })
      }

      return reply.status(404).send({ message: 'Usuário não encontrado' })
    } catch (err: any) {
      return reply.status(500).send({ error: 'Erro no servidor', err })
    }
  })
}

export async function authRoutes(app: FastifyInstance) {
  register(app)
  login(app)
}
