import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeFindManyCityUseCase } from '@/use-cases/factories/make-find-many-city-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function findManyCity(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const findByManyCitySchema = z.object({
    name: z.string().optional(),
    city: z.string(),
    about: z.string().optional(),
    age: z.enum(['Filhote', 'Jovem', 'Adulto']).optional(),
    dog_size: z.enum(['Pequenino', 'Medio', 'Grande']).optional(),
    energy_level: z
      .enum(['Muito_baixa', 'Baixa', 'Media', 'Alta', 'Muito_Alta'])
      .optional(),
    idependencies_Level: z.enum(['Baixo', 'Medio', 'Alto']).optional(),
  })

  const { name, age, dog_size, energy_level, idependencies_Level, city } =
    findByManyCitySchema.parse(request.query)

  try {
    const findByManyCityUseCase = makeFindManyCityUseCase()

    const pet = await findByManyCityUseCase.execute({
      city,
      age,
      dog_size,
      energy_level,
      idependencies_Level,
      name,
    })
    return reply.status(200).send(pet)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: error.message })
    }
    throw error
  }
}
