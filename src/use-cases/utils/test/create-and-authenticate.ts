import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  // faz a criação de uma conta
  await prisma.ong.create({
    data: {
      name: 'Ong 31',
      address: 'rua cascais, Belo Horizonte - Minas Gerais',
      cep: '1255070',
      email: 'luanchristian.rochadocarmo@gmail.com',
      password_hash: await hash('123456', 6),
      phone: '',
    },
  })
  // loga essa conta criada
  const authResponse = await request(app.server).post('/session').send({
    email: 'luanchristian.rochadocarmo@gmail.com',
    password: '123456',
  })
  // pega o token da conta criada e retorna esse token
  const { token } = authResponse.body
  return { token }
}
