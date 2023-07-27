import { FastifyInstance } from 'fastify'
import { create } from './create.controller'

export async function ongsRoutes(app: FastifyInstance) {
  app.post('/ongs', create)
}
