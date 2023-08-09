import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate login Ong (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be albe to create ong', async () => {
    await request(app.server).post('/ong').send({
      name: 'Aprisco',
      address: 'rua cascais, Belo Horizonte',
      cep: '31255070',
      phone: '31971262835',
      email: 'luan@gmail.com',
      password: '123456',
    })
    const response = await request(app.server).post('/session').send({
      email: 'luan@gmail.com',
      password: '123456',
    })
    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
