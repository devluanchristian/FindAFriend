import { Pet, Prisma } from '@prisma/client'
import { IPetsRepository } from '../@type-pets-repository'
import { randomUUID } from 'crypto'

export class InMemoryPetsRepository implements IPetsRepository {
  public items: Pet[] = []

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)
    if (!pet) {
      return null
    }
    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      ongId: data.ongId,
      name: data.name,
      about: data.about,
      age: data.age,
      dog_size: data.dog_size,
      idependencies_Level: data.idependencies_Level,
      energy_level: data.energy_level,
      created_at: new Date(),
    }

    this.items.push(pet)
    return pet
  }
}
