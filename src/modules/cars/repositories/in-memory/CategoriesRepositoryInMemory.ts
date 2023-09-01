import { ICreateCategoryDTO } from '@modules/cars/dtos/ICreateCategoryDTO'
import {
  ICategoriesRepository,
} from '../ICategoriesRepository'
import { Category } from '../../infra/typeorm/entities/Category'

export class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = []

  async findByName(name: string) {
    return this.categories.find((category) => category.name === name)
  }

  async list(): Promise<Category[]> {
    return this.categories
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category()

    Object.assign(category, {
      name,
      description,
    })

    this.categories.push(category)
  }
}
