import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute() {
    const categories = await this.categoriesRepository.list()

    return categories
  }
}
