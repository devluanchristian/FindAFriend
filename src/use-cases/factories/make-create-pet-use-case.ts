import { PrismaOngsRepository } from '@/repositories/prisma/prisma-ongs-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { PetUseCase } from '../create-pet'

export function makeCreatePetUseCase() {
  const ongRepository = new PrismaOngsRepository()
  const petRepository = new PrismaPetsRepository()
  const useCase = new PetUseCase(petRepository, ongRepository)

  return useCase
}
