import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/use-cases/utils/test/create-and-authenticate'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be albe to create pet', async () => {
    const ong = await prisma.ong.create({
      data: {
        name: 'Aprisco',
        address: 'rua cascais',
        cep: '31255070',
        phone: '31971262835',
        email: 'luan@gmail.com',
        password_hash: '123456',
      },
    })
    const { token } = await createAndAuthenticateUser(app)
    const response = await request(app.server)
      .post(`/pet/${ong.id}/auth`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Ana Catarina',
        about: 'Uma cadela da raça Akita, bem docil e brincalhona',
        age: 'Jovem',
        dog_size: 'Grande',
        energy_level: 'Alta',
        idependencies_Level: 'Medio',
        ong,
      })
    expect(response.statusCode).toEqual(201)
  })
})
