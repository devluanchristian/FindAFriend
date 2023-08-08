import { Prisma } from '@prisma/client'

import { randomUUID } from 'crypto'
import { IFindManyParams, IPetsRepository } from '../@type-pets-repository'

type PetWithOng = Prisma.PetGetPayload<{ include: { ong: true } }>

export class InMemoryPetsRepository implements IPetsRepository {
  public items: PetWithOng[] = []

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)
    if (!pet) {
      return null
    }
    return pet
  }

  async create(data: PetWithOng) {
    const pet = {
      id: data.id ?? randomUUID(),
      ongId: data.ongId,
      ong: data.ong,
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

  async findByManyCity({
    city,
    age,
    dog_size,
    energy_level,
    idependencies_Level,
    name,
  }: IFindManyParams): Promise<PetWithOng[]> {
    let pets = this.items.filter((pet) => pet.ong.address.includes(city))

    if (!pets) {
      return []
    }
    if (name) {
      pets = pets.filter((pet) => pet.name === name)
    }
    if (age) {
      pets = pets.filter((pet) => pet.age === age)
    }
    if (dog_size) {
      pets = pets.filter((pet) => pet.dog_size === dog_size)
    }
    if (energy_level) {
      pets = pets.filter((pet) => pet.energy_level === energy_level)
    }
    if (idependencies_Level) {
      pets = pets.filter(
        (pet) => pet.idependencies_Level === idependencies_Level,
      )
    }
    return pets
  }
}
