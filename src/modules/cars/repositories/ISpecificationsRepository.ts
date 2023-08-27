import { Specification } from '../infra/typeorm/entities/Specification'

export interface ICreateServiceDTO {
  name: string
  description: string
}

export interface ISpecificationsRepository {
  create({ name, description }: ICreateServiceDTO): Promise<void>
  findByName(name: string): Promise<Specification>
}
