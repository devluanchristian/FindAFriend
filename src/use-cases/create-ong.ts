import { ICreateOngsRepository } from '@/repositories/@types-ong-repository'
import { Ong } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UserAlreadyExists } from './errors/user-already-exists-errors'

interface ICreateOngsUseCase {
  name: string
  cep: string
  address: string
  email: string
  phone: string
  password: string
}

interface ICreateOngsUseCaseResponse {
  ong: Ong
}

export class CreateOngsUseCase {
  constructor(private ongRepository: ICreateOngsRepository) {}
  async execute({
    name,
    address,
    cep,
    email,
    password,
    phone,
  }: ICreateOngsUseCase): Promise<ICreateOngsUseCaseResponse> {
    // criptografa a senha do usuario
    const password_hash = await hash(password, 6)

    // verifica se ja existe o email
    const userEithSameEmail = await this.ongRepository.findByEmail(email)

    if (userEithSameEmail) {
      throw new UserAlreadyExists()
    }
    // cadastra a ONG com as informações recebidas pela requisição
    const ong = await this.ongRepository.create({
      name,
      address,
      cep,
      email,
      password_hash,
      phone,
    })
    return { ong }
  }
}
