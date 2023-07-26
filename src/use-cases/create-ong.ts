import { IOngsRepository } from '@/repositories/@types-ong-repository'
import { Ong } from '@prisma/client'
import { hash } from 'bcryptjs'

interface IOngsUseCase {
  name: string
  cep: string
  address: string
  email: string
  phone: string
  password: string
}

interface IOngsUseCaseResponse {
  ong: Ong
}

export class OngsUseCase {
  constructor(private ongRepository: IOngsRepository) {}
  async execute({
    name,
    address,
    cep,
    email,
    password,
    phone,
  }: IOngsUseCase): Promise<IOngsUseCaseResponse> {
    // criptografa a senha do usuario
    const password_hash = await hash(password, 6)

    // verifica se ja existe o email
    const userEithSameEmail = await this.ongRepository.findById(email)

    if (userEithSameEmail) {
      throw new Error()
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
