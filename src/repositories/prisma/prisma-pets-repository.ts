import { Prisma } from '@prisma/client'
import { IFindManyParams, IPetsRepository } from '../@type-pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements IPetsRepository {
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })
    return pet
  }

  async findByManyCity({
    city,
    age,
    dog_size,
    energy_level,
    idependencies_Level,
    name,
  }: IFindManyParams) {
    const pets = await prisma.pet.findMany({
      where: {
        age,
        dog_size,
        energy_level,
        idependencies_Level,
        name,
        ong: {
          address: { contains: city },
        },
      },
    })
    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pets = await prisma.pet.create({
      data,
    })
    return pets
  }
}
