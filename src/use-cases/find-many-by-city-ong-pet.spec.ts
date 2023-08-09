import { InMemoryOngsRepository } from '@/repositories/in-memory/in-memory-ongs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { FindManyByCityOngPetUseCase } from './find-many-by-city-ong-pet'
import { hash } from 'bcryptjs'

let ongRepository: InMemoryOngsRepository
let petRepository: InMemoryPetsRepository
let sut: FindManyByCityOngPetUseCase

describe('Find Many By City Use Case', () => {
  beforeEach(() => {
    ongRepository = new InMemoryOngsRepository()
    petRepository = new InMemoryPetsRepository()
    sut = new FindManyByCityOngPetUseCase(petRepository)
  })

  it('should be able to find a pet with a city', async () => {
    const ong = await ongRepository.create({
      id: 'ong-01',
      name: 'Aprisco',
      cep: '31255070',
      address: 'R. Caete, 416 - Belo Horizonte, Minas Gerais - Brasil',
      email: 'luanzin@gmail.com',
      password_hash: await hash('123456', 6),
      phone: '31 971262835',
    })

    await petRepository.create({
      name: 'Ana Catarina',
      about: 'Uma cadela da raça Akita, bem docil e brincalhona',
      age: 'Jovem',
      dog_size: 'Grande',
      energy_level: 'Alta',
      idependencies_Level: 'Medio',
      ongId: 'ong-01',
      ong,
    })

    await petRepository.create({
      name: 'Spike',
      about: 'Bem docil e brincalhona',
      age: 'Jovem',
      dog_size: 'Pequenino',
      energy_level: 'Alta',
      idependencies_Level: 'Medio',
      ongId: 'ong-01',
      ong,
    })
    const { pets } = await sut.execute({
      city: 'Belo Horizonte',
      dog_size: 'Grande',
    })

    expect(pets[0].id).toEqual(expect.any(String))
  })

  it('should not be able to to find a pet without a city', async () => {
    expect(() =>
      sut.execute({
        city: 'Congonhas',
      }),
    ).toHaveLength(0)
  })
})
