import { IPetsRepository } from '@/repositories/@type-pets-repository'
import { ICreateOngsRepository } from '@/repositories/@types-ong-repository'

import {
  Age,
  Dog_Size,
  Energy_Level,
  IdependenciesLevel,
  Pet,
} from '@prisma/client'

interface IPetUseCase {
  name: string
  about: string
  age: Age
  dog_size: Dog_Size
  energy_level: Energy_Level
  idependencies_Level: IdependenciesLevel
  ongId: string
}

interface IPetUseCaseResponse {
  pet: Pet
}

export class PetUseCase {
  constructor(
    private petsRepository: IPetsRepository,
    private ongsRepository: ICreateOngsRepository,
  ) {}

  async execute({
    name,
    about,
    age,
    dog_size,
    energy_level,
    idependencies_Level,
    ongId,
  }: IPetUseCase): Promise<IPetUseCaseResponse> {
    const ong = await this.ongsRepository.findById(ongId)
    if (!ong) {
      throw new Error()
    }

    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      dog_size,
      energy_level,
      idependencies_Level,
      ongId,
    })
    return {
      pet,
    }
  }
}
