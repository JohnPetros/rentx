import { CategoriesRepository } from '@modules/cars/repositories/implementations/CategoriesRepository'
import { ListCategoriesUseCase } from './ListCategoriesUseCase'
import { ListCategoriesController } from './ListCategoriesController'

const categoriesRepository = CategoriesRepository.getInstance()
const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository)
export const listCategoriesController = new ListCategoriesController(
  listCategoriesUseCase
)
