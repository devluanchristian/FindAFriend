import { Prisma, Ong } from '@prisma/client'
import { ICreateOngsRepository } from '../@types-ong-repository'
import { randomUUID } from 'crypto'

export class InMemoryOngsRepository implements ICreateOngsRepository {
  public items: Ong[] = []

  async create(data: Prisma.OngCreateInput) {
    const ong = {
      id: data.id ?? randomUUID(),
      name: data.name,
      cep: data.cep,
      address: data.address,
      email: data.email,
      phone: data.phone,
      password_hash: data.password_hash,
      created_at: new Date(),
    }
    this.items.push(ong)
    return ong
  }

  async findById(id: string) {
    const ong = this.items.find((item) => item.id === id)
    if (!ong) {
      return null
    }
    return ong
  }

  async findByEmail(email: string) {
    const ong = this.items.find((item) => item.email === email)
    if (!ong) {
      return null
    }
    return ong
  }
}
