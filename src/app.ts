import fastify from 'fastify'
import { ongsRoutes } from './http/controllers/ongs/routes'

export const app = fastify()

app.register(ongsRoutes)
