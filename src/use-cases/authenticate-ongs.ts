import { ICreateOngsRepository } from '@/repositories/@types-ong-repository'
import { Ong } from '@prisma/client'
import { compare } from 'bcryptjs'

interface IAuthenticateOngUseCase {
  email: string
  password: string
}

interface IAuthenticateOngUseCaseResponse {
  ong: Ong
}

export class AuthenticateOngUseCase {
  constructor(private ongRepository: ICreateOngsRepository) {}
  async execute({
    email,
    password,
  }: IAuthenticateOngUseCase): Promise<IAuthenticateOngUseCaseResponse> {
    const ong = await this.ongRepository.findByEmail(email)

    if (!ong) {
      throw new Error()
    }
    const doesPasswordMatches = await compare(password, ong.password_hash)

    if (!doesPasswordMatches) {
      throw new Error()
    }
    return {
      ong,
    }
  }
}
