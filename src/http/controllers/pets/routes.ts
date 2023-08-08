import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { create } from './create.controller'

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/pet/:ongId/auth', create)
}
