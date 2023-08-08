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
  idependencies_Level?: IdependenciesLevel
}
export interface IPetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findByManyCity({
    city,
    age,
    dog_size,
    energy_level,
    idependencies_Level,
    name,
  }: IFindManyParams): Promise<Pet[]>
}
