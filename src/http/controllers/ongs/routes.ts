import { FastifyInstance } from 'fastify'
import { create } from './create.controller'
import { authenticate } from './authenticate.controller'
import { profile } from './profile.controller'

export async function ongsRoutes(app: FastifyInstance) {
  app.post('/ong', create)
  app.post('/session', authenticate)

  // Authenticated
  app.get('/me', profile)
}
