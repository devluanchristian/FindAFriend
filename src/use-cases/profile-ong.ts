import { ICreateOngsRepository } from '@/repositories/@types-ong-repository'
import { Ong } from '@prisma/client'
import { OngDoesNotExist } from './errors/ong-does-not-exist-errors'

interface IGetOngProfileRequest {
  ongId: string
}

interface IGetOngProfileResponse {
  ong: Ong
}

export class GetOngProfileUseCase {
  constructor(private ongRepository: ICreateOngsRepository) {}
  async execute({
    ongId,
  }: IGetOngProfileRequest): Promise<IGetOngProfileResponse> {
    const ong = await this.ongRepository.findById(ongId)

    if (!ong) {
      throw new OngDoesNotExist()
    }
    return {
      ong,
    }
  }
}
