import { CategoriesRepository } from '@modules/cars/repositories/implementations/CategoriesRepository'
import { ListCategoriesUseCase } from './ListCategoriesUseCase'
import { ListCategoriesController } from './ListCategoriesController'

const categoriesRepository = new CategoriesRepository()
const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository)
export const listCategoriesController = new ListCategoriesController(
  listCategoriesUseCase
)
