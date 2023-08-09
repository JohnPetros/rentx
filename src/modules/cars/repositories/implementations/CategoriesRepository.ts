import { Repository } from 'typeorm'
import { Category } from '../../entities/Category'
import { ICategoriesRepository } from '../ICategoriesRepository'
import { AppDataSource } from 'database'

export class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>

  constructor() {
    this.repository = AppDataSource.getRepository(Category)
  }

  async create({ description, name }) {
    const category = await this.repository.create({
      description,
      name,
    })

    await this.repository.save(category)
  }

  async list() {
    return await this.repository.find()
  }

  async findByName(name: string) {
    return this.repository.findOne({ where: { name } })
  }
}
