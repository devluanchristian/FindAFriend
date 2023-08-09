import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { create } from './create.controller'
import { findManyCity } from './findManyCity.controller'
import { findById } from './findById.controller'

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/pet/:ongId/auth', create)
  app.get('/pets', findManyCity)
  app.get('/pet/:petId', findById)
}
