import { InMemoryOngsRepository } from '@/repositories/in-memory/in-memory-ongs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { GetOngProfileUseCase } from './profile-ong'

let ongRepository: InMemoryOngsRepository
let sut: GetOngProfileUseCase

describe('Get user profile Ong Use Case', async () => {
  beforeEach(async () => {
    ongRepository = new InMemoryOngsRepository()
    sut = new GetOngProfileUseCase(ongRepository)
  })

  it('should be able to get user profile ONG', async () => {
    const createOng = await ongRepository.create({
      name: 'Aprisco',
      address: 'rua cascais',
      cep: '123124414',
      phone: '13123123123',
      email: 'teste@example.com',
      password_hash: await hash('123456', 6),
    })

    const { ong } = await sut.execute({
      ongId: createOng.id,
    })

    expect(ong.id).toEqual(expect.any(String))
    expect(ong.name).toEqual('Aprisco')
  })
})
