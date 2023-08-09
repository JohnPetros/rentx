import { CategoriesRepository } from '@modules/cars/repositories/implementations/CategoriesRepository'
import { UploadCategoryUseCase } from './UploadCategoryUseCase'
import { UploadCategoryController } from './UploadCategoryController'

const categoriesRepository = new CategoriesRepository()
const uploadCategoryUseCase = new UploadCategoryUseCase(categoriesRepository)
export const uploadCategoryController = new UploadCategoryController(
  uploadCategoryUseCase
)
