import { FastifyInstance } from 'fastify'
import { create } from './create.controller'
import { authenticate } from './authenticate.controller'
import { profile } from './profile.controller'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { refresh } from './refresh.controller'

export async function ongsRoutes(app: FastifyInstance) {
  app.post('/ong', create)
  app.post('/session', authenticate)
  app.patch('/token/refresh', refresh)
  // Authenticated
  app.get('/me', { onRequest: verifyJWT }, profile)
}
