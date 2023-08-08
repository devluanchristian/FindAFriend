import {
  Age,
  Dog_Size,
  Energy_Level,
  IdependenciesLevel,
  Pet,
  Prisma,
} from '@prisma/client'
export interface IFindManyParams {
  city: string
  name?: string
  age?: Age
  dog_size?: Dog_Size
  energy_level?: Energy_Level
  idependenciesLevel?: IdependenciesLevel
}
export interface IPetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findManyByCity({
    city,
    age,
    dog_size,
    energy_level,
    idependenciesLevel,
    name,
  }: IFindManyParams): Promise<Pet[]>
}
