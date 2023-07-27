import { InMemoryOngsRepository } from '@/repositories/in-memory/in-memory-ongs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOngsUseCase } from './create-ong'

let ongRepository: InMemoryOngsRepository
let sut: CreateOngsUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    ongRepository = new InMemoryOngsRepository()
    sut = new CreateOngsUseCase(ongRepository)
  })

  it('should be able to create a pet', async () => {
    const { ong } = await sut.execute({
      name: 'Aprisco',
      address: 'rua cascais',
      cep: '31255070',
      phone: '31971262835',
      email: 'luan@gmail.com',
      password: '123456',
    })

    expect(ong.id).toEqual(expect.any(String))
  })
})
