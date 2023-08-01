import { InMemoryOngsRepository } from '@/repositories/in-memory/in-memory-ongs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { PetUseCase } from './create-pet'

let ongRepository: InMemoryOngsRepository
let petRepository: InMemoryPetsRepository
let sut: PetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    ongRepository = new InMemoryOngsRepository()
    petRepository = new InMemoryPetsRepository()
    sut = new PetUseCase(petRepository, ongRepository)
  })

  it('should be able to create a pet', async () => {
    await ongRepository.create({
      id: 'ong-01',
      name: 'Aprisco',
      address: 'rua cascais',
      cep: '31255070',
      phone: '31971262835',
      email: 'luan@gmail.com',
      password_hash: '123445',
    })

    const { pet } = await sut.execute({
      name: 'Ana Catarina',
      about: 'Uma cadela da raça Akita, bem docil e brincalhona',
      age: 'Jovem',
      dog_size: 'Grande',
      energy_level: 'Alta',
      idependencies_Level: 'Medio',
      ongId: 'ong-01',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
