import { PrismaOngsRepository } from '@/repositories/prisma/prisma-ongs-repository'
import { GetOngProfileUseCase } from '../profile-ong'

export function makeProfileOngUseCase() {
  const ongRepository = new PrismaOngsRepository()
  const useCase = new GetOngProfileUseCase(ongRepository)

  return useCase
}
