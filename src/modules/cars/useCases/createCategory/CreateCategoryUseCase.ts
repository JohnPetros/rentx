import { inject, injectable } from 'tsyringe'
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'
import { AppError } from '../../../../shared/errors/AppError'

interface IRequest {
  name: string
  description: string
}

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ name, description }: IRequest) {
    const categoryAldearyExists = await this.categoriesRepository.findByName(
      name
    )

    if (categoryAldearyExists) {
      throw new AppError('Category already exists')
    }

    this.categoriesRepository.create({ name, description })
  }
}
