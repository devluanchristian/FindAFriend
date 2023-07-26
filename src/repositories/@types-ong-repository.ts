import { Ong, Prisma } from '@prisma/client'

export interface IOngsRepository {
  create(data: Prisma.OngCreateInput): Promise<Ong>
  findById(id: string): Promise<Ong | null>
  findByEmail(email: string): Promise<Ong | null>
}
