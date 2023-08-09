import { Category } from '../../models/Category'
import { ICategoriesRepository } from '../ICategoriesRepository'

export class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[]

  private static INSTANCE: CategoriesRepository

  private constructor() {
    this.categories = []
  }

  public static getInstance() {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository()
    }

    return CategoriesRepository.INSTANCE
  }

  create({ description, name }) {
    const category = new Category()

    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    })

    this.categories.push(category)
  }

  list() {
    return this.categories
  }

  findByName(name: string): Category {
    return this.categories.find((category) => category.name === name)
  }
}
