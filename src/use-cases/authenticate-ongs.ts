import { ICreateOngsRepository } from '@/repositories/@types-ong-repository'
import { Ong } from '@prisma/client'
import { compare } from 'bcryptjs'
import { InvalidCrendetials } from './errors/invalid-credentials-errors'

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
      throw new InvalidCrendetials()
    }
    const doesPasswordMatches = await compare(password, ong.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCrendetials()
    }
    return {
      ong,
    }
  }
}
