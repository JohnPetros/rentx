import { Repository } from 'typeorm'
import { AppDataSource } from '@shared/infra/typeorm'

import { Specification } from '../../infra/typeorm/entities/Specification'
import {
  ICreateServiceDTO,
  ISpecificationsRepository,
} from '@modules/cars/repositories/ISpecificationsRepository'

export class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>

  constructor() {
    this.repository = AppDataSource.getRepository(Specification)
  }

  async create({ name, description }: ICreateServiceDTO): Promise<void> {
    const specification = this.repository.create({
      name,
      description,
    })

    await this.repository.save(specification)
  }

  async findByName(name: string): Promise<Specification> {
    const specification = this.repository.findOne({
      where: { name },
    })

    return specification
  }
}