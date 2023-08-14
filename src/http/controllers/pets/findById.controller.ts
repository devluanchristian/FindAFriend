import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetPetUseCase } from '@/use-cases/factories/make-get-pet-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function findById(request: FastifyRequest, reply: FastifyReply) {
  const getPetSchema = z.object({
    petId: z.string(),
  })

  const { petId } = getPetSchema.parse(request.params)

  try {
    const getPetUseCase = makeGetPetUseCase()

    const pet = await getPetUseCase.execute({
      petId,
    })
    return reply.status(200).send(pet)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: error.message })
    }
    throw error
  }
}
