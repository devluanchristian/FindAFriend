import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetUseCase } from './get-pet'
import { PetDoesNotExist } from './errors/pet-does-not-exist-error'

let petRepository: InMemoryPetsRepository
let sut: GetPetUseCase

describe('Get pet details Use Case', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetsRepository()
    sut = new GetPetUseCase(petRepository)
  })

  it('should be able to view details of a pet', async () => {
    const createPet = await petRepository.create({
      name: 'Ana Catarina',
      about: 'Uma cadela da raça Akita, bem docil e brincalhona',
      age: 'Jovem',
      dog_size: 'Grande',
      energy_level: 'Alta',
      idependencies_Level: 'Medio',
      ongId: 'ong-01',
    })
    const { pet } = await sut.execute({
      petId: createPet.id,
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toEqual('Ana Catarina')
  })
  it('should not be able to view a pets details', async () => {
    await expect(() =>
      sut.execute({
        petId: 'non-existent-id',
      }),
    ).rejects.toBeInstanceOf(PetDoesNotExist)
  })
})
