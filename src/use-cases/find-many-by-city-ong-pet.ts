import {
  IFindManyParams,
  IPetsRepository,
} from '@/repositories/@type-pets-repository'

import { Pet } from '@prisma/client'

interface IFindManyByCityOngPetUseCaseResponse {
  pets: Pet[]
}

export class FindManyByCityOngPetUseCase {
  constructor(private petRepository: IPetsRepository) {}
  async execute({
    city,
    age,
    dog_size,
    name,
    energy_level,
    idependencies_Level,
  }: IFindManyParams): Promise<IFindManyByCityOngPetUseCaseResponse> {
    const pets = await this.petRepository.findByManyCity({
      city,
      age,
      dog_size,
      name,
      energy_level,
      idependencies_Level,
    })
    return {
      pets,
    }
  }
}
