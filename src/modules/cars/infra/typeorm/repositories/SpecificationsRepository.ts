import { Repository } from 'typeorm'
import { In } from 'typeorm'
import { AppDataSource } from '@shared/infra/typeorm'

import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository'

import { ICreateSpecificationDTO } from '@modules/cars/dtos/ICreateSpecificationDTO'

import { Specification } from '../entities/Specification'

export class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>

  constructor() {
    this.repository = AppDataSource.getRepository(Specification)
  }

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({
      name,
      description,
    })

    await this.repository.save(specification)

    return specification
  }

  async findByName(name: string): Promise<Specification> {
    const specification = this.repository.findOne({
      where: { name },
    })

    return specification
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return await this.repository.findBy({
      id: In(ids),
    })
  }
}
