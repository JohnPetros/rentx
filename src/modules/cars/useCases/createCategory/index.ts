import { CategoriesRepository } from '@modules/cars/repositories/implementations/CategoriesRepository'
import { CreateCategoryUseCase } from './CreateCategoryUseCase'
import { CreateCategoryController } from './CreateCategoryController'

export default () => {
  const categoriesRepository = new CategoriesRepository()

  const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository)

  const createCategoryController = new CreateCategoryController(
    createCategoryUseCase
  )

  return createCategoryController
}
