import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { IOngsRepository } from '../@types-ong-repository'

export class PrismaOngsRepository implements IOngsRepository {
  async create(data: Prisma.OngCreateInput) {
    const ongs = await prisma.ong.create({
      data,
    })
    return ongs
  }

  async findById(id: string) {
    const ong = await prisma.ong.findUnique({
      where: {
        id,
      },
    })
    return ong
  }

  async findByEmail(email: string) {
    const ong = await prisma.ong.findUnique({
      where: {
        email,
      },
    })
    return ong
  }
}
