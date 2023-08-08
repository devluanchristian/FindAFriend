import { IPetsRepository } from '@/repositories/@type-pets-repository'
import { Pet } from '@prisma/client'
import { PetDoesNotExist } from './errors/pet-does-not-exist-error'

interface IGetPetUseCaseRequest {
  petId: string
}

interface IGetPetUseCaseResponse {
  pet: Pet
}

export class GetPetUseCase {
  constructor(private petRepository: IPetsRepository) {}
  async execute({
    petId,
  }: IGetPetUseCaseRequest): Promise<IGetPetUseCaseResponse> {
    const pet = await this.petRepository.findById(petId)

    if (!pet) {
      throw new PetDoesNotExist()
    }
    return {
      pet,
    }
  }
}
