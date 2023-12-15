import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'
import bcrypt, { compare } from 'bcrypt'

function register(app: FastifyInstance) {
  app.post('/register', async (request, reply) => {
    try {
      const bodySchema = z.object({
        username: z.string(),
        password: z.string(),
      })

      const { username, password } = bodySchema.parse(request.body)

      let user = await prisma.user.findFirst({
        where: {
          username,
        },
      })

      if (user) {
        return reply.status(409).send({ error: 'Usuário já cadastrado!' })
      }

      const salt = 10
      const hash_password = await bcrypt.hash(password, salt)

      user = await prisma.user.create({
        data: {
          username,
          password: hash_password,
        },
      })

      return reply.status(200).send({ message: 'Usuário criado com sucesso!' })
    } catch (err) {
      return reply.status(500).send({ error: 'Erro interno no servidor' })
    }
  })
}

function login(app: FastifyInstance) {
  app.post('/login', async (request, reply) => {
    try {
      const bodySchema = z.object({
        username: z.string(),
        password: z.string(),
      })

      const { username, password } = bodySchema.parse(request.body)

      let user = await prisma.user.findFirstOrThrow({
        where: {
          username,
        },
      })

      const is_valid = await compare(password, user.password)

      if (is_valid) {
        const token = app.jwt.sign(
          {
            name: user.username,
          },
          {
            sub: user.id,
            expiresIn: '30 days',
          }
        )

        return reply.status(200).send({ token })
      }

      return reply.status(404).send({ message: 'Usuário não encontrado.' })
    } catch (err: any) {
      return reply.status(500).send({ error: err.name })
    }
  })
}

export async function authRoutes(app: FastifyInstance) {
  register(app)
  login(app)

  // app.get('/users', async () => {
  //   try {
  //     const users = await prisma.user.findMany({
  //       select: {
  //         id: true,
  //         username: true,
  //         balances: true,
  //         payments: true,
  //       },
  //     })

  //     return {
  //       users,
  //     }
  //   } catch (err) {
  //     return err
  //   }
  // })
}
