import { Router } from 'express'
import multer from 'multer'

import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController'
import { UploadCategoryController } from '@modules/cars/useCases/uploadCategory/UploadCategoryController'
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController'

import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthentication } from '../middlewares/ensureAthentication'

export const categoriesRoutes = Router()

const upload = multer({
  dest: './tmp',
})

const createCategoryController = new CreateCategoryController()
const uploadCategoryController = new UploadCategoryController()
const listCategoriesController = new ListCategoriesController()

categoriesRoutes.post(
  '/',
  ensureAuthentication,
  ensureAdmin,
  createCategoryController.handle
)

categoriesRoutes.get('/', listCategoriesController.handle)

categoriesRoutes.post(
  '/upload',
  ensureAuthentication,
  ensureAdmin,
  upload.single('file'),
  (request, response) => {
    return uploadCategoryController.handle(request, response)
  }
)
