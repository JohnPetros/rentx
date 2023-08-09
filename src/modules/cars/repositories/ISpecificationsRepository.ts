import { Specification } from '../entities/Specification'

export interface ICreateServiceDTO {
  name: string
  description: string
}

export interface ISpecificationsRepository {
  create({ name, description }: ICreateServiceDTO): void
  findByName(name: string): Specification
}
