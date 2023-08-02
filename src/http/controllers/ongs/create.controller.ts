import { UserAlreadyExists } from '@/use-cases/errors/user-already-exists-errors'
import { makeCreateOngUseCase } from '@/use-cases/factories/make-create-ong-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOngsSchema = z.object({
    name: z.string(),
    cep: z.string(),
    address: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.string(),
  })

  const { name, address, cep, email, password, phone } = createOngsSchema.parse(
    request.body,
  )

  try {
    const createOngUseCase = makeCreateOngUseCase()

    await createOngUseCase.execute({
      name,
      address,
      cep,
      email,
      password,
      phone,
    })
  } catch (error) {
    if (error instanceof UserAlreadyExists) {
      return reply.status(409).send({ message: error.message })
    }
    throw error
  }
  return reply.status(201).send()
}
