import { Repository } from 'typeorm'
import { Category } from '../entities/Category'
import { ICategoriesRepository } from '../../../repositories/ICategoriesRepository'
import { AppDataSource } from '@shared/infra/typeorm'

export class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>

  constructor() {
    this.repository = AppDataSource.getRepository(Category)
  }

  async create({ description, name }) {
    const category = this.repository.create({
      description,
      name,
    })

    await this.repository.save(category)
  }

  async list() {
    const categories = await this.repository.find()
    return categories
  }

  async findByName(name: string) {
    return await this.repository.findOne({ where: { name } })
  }
}
