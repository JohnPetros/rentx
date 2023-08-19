import { Repository } from 'typeorm'
import { AppDataSource } from 'database'

import { Specification } from '../../entities/Specification'
import {
  ICreateServiceDTO,
  ISpecificationsRepository,
} from '../ISpecificationsRepository'

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
