import { CategoriesRepository } from '@modules/cars/repositories/implementations/CategoriesRepository'
import { CreateCategoryUseCase } from './CreateCategoryUseCase'
import { CreateCategoryController } from './CreateCategoryController'

const categoriesRepository = new CategoriesRepository()

const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository)

export const createCategoryController = new CreateCategoryController(
  createCategoryUseCase
)
