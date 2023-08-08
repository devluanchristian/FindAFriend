import { InMemoryOngsRepository } from '@/repositories/in-memory/in-memory-ongs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateOngUseCase } from './authenticate-ongs'
import { hash } from 'bcryptjs'
import { InvalidCrendetials } from './errors/invalid-credentials-errors'

let ongRepository: InMemoryOngsRepository
let sut: AuthenticateOngUseCase

describe('Authenticate Ong Use Case', async () => {
  beforeEach(async () => {
    ongRepository = new InMemoryOngsRepository()
    sut = new AuthenticateOngUseCase(ongRepository)

    await ongRepository.create({
      name: 'Teste 11:30',
      address: 'rua cascais',
      cep: '31255070',
      phone: '31971262835',
      email: 'luan@yahoo.com',
      password_hash: await hash('123456', 6),
    })
  })

  it('should be able to authenticate ONG', async () => {
    const { ong } = await sut.execute({
      email: 'luan@yahoo.com',
      password: '123456',
    })

    expect(ong.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'prisma@prisma.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCrendetials)
  })
})
