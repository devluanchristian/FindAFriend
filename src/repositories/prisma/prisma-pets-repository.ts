import { Prisma } from '@prisma/client'
import { IPetsRepository } from '../@type-pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements IPetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pets = await prisma.pet.create({
      data,
    })
    return pets
  }
}
