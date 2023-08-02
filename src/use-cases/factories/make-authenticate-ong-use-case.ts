import { PrismaOngsRepository } from '@/repositories/prisma/prisma-ongs-repository'
import { AuthenticateOngUseCase } from '../authenticate-ongs'

export function makeAuthenticateOngUseCase() {
  const ongRepository = new PrismaOngsRepository()
  const useCase = new AuthenticateOngUseCase(ongRepository)

  return useCase
}
