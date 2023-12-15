import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import fastify from 'fastify'
import 'dotenv/config'

import { authRoutes } from '@/routes/auth'
import { paymentRoutes } from '@/routes/payment'
import { balanceRoutes } from '@/routes/balance'

export const app = fastify()

app.register(cors, {
  origin: true,
})

app.register(jwt, {
  secret: 'payment',
})

app.get('/', () => {
  return { isOnline: true }
})

app.register(authRoutes)
app.register(paymentRoutes)
app.register(balanceRoutes)

app
  .listen({
    port: 3333,
  })
  .then(() => console.log('Server listening on http://localhost:3333'))
