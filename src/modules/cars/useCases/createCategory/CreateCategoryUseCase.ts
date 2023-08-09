import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'

interface IRequest {
  name: string
  description: string
}

export class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({ name, description }: IRequest) {
    const categoryAldearyExists = this.categoriesRepository.findByName(name)

    if (categoryAldearyExists) {
      throw new Error('Category already exists')
    }

    this.categoriesRepository.create({ name, description })
  }
}
