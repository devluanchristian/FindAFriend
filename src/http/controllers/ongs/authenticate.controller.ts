import { makeAuthenticateOngUseCase } from '@/use-cases/factories/make-authenticate-ong-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateOngSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateOngSchema.parse(request.body)

  try {
    const createOngUseCase = makeAuthenticateOngUseCase()

    await createOngUseCase.execute({
      email,
      password,
    })
  } catch (error) {
    if (error === true) {
      return reply.status(409).send({ message: 'Error' })
    }
    throw error
  }
  return reply.status(201).send()
}
