import { OngDoesNotExist } from '@/use-cases/errors/ong-does-not-exist-errors'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetsParamsSchema = z.object({
    ongId: z.string().uuid(),
  })
  const createPetsSchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.enum(['Filhote', 'Jovem', 'Adulto']),
    dog_size: z.enum(['Pequenino', 'Medio', 'Grande']),
    energy_level: z.enum([
      'Muito_baixa',
      'Baixa',
      'Media',
      'Alta',
      'Muito_Alta',
    ]),
    idependencies_Level: z.enum(['Baixo', 'Medio', 'Alto']),
  })
  const { ongId } = createPetsParamsSchema.parse(request.params)
  const { name, about, age, dog_size, energy_level, idependencies_Level } =
    createPetsSchema.parse(request.body)

  try {
    const createOngUseCase = makeCreatePetUseCase()

    const { pet } = await createOngUseCase.execute({
      name,
      about,
      age,
      dog_size,
      energy_level,
      idependencies_Level,
      ongId,
    })
    return reply.status(201).send({ pet })
  } catch (error) {
    if (error instanceof OngDoesNotExist) {
      return reply.status(409).send({ message: error.message })
    }
    throw error
  }
}
