import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FindManyByCityOngPetUseCase } from '../find-many-by-city-ong-pet'

export function makeFindManyCityUseCase() {
  const petRepository = new PrismaPetsRepository()
  const useCase = new FindManyByCityOngPetUseCase(petRepository)

  return useCase
}
