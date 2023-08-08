import {
  IFindManyParams,
  IPetsRepository,
} from '@/repositories/@type-pets-repository'
import { Pet } from '@prisma/client'

interface IGetPetFindManyByCityUseCaseResponse {
  pets: Pet[]
}

export class GetPetFindManyByCityUseCase {
  constructor(private petRepository: IPetsRepository) {}
  async execute({
    city,
    age,
    name,
    dog_size,
    energy_level,
    idependenciesLevel,
  }: IFindManyParams): Promise<IGetPetFindManyByCityUseCaseResponse> {
    const pets = await this.petRepository.findManyByCity({
      city,
      age,
      name,
      dog_size,
      energy_level,
      idependenciesLevel,
    })
    return { pets }
  }
}
