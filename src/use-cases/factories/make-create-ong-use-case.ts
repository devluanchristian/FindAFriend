import { PrismaOngsRepository } from '@/repositories/prisma/prisma-ongs-repository'
import { CreateOngsUseCase } from '../create-ong'

export function makeCreateOngUseCase() {
  const ongRepository = new PrismaOngsRepository()
  const useCase = new CreateOngsUseCase(ongRepository)

  return useCase
}
