import { Router } from 'express'

import multer from 'multer'
import uploadConfig from '../../../../config/Upload'

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController'
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController'

import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthentication } from '../middlewares/ensureAthentication'
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImages/UploadCarImagesController'

export const carRoutes = Router()

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarImagesController = new UploadCarImagesController()

const uploadCarImage = multer(uploadConfig.upload('./tmp/cars'))

carRoutes.post(
  '/',
  ensureAuthentication,
  ensureAdmin,
  createCarController.handle
)

carRoutes.get('/available', listAvailableCarsController.handle)

carRoutes.post(
  '/specifications/:id',
  ensureAuthentication,
  ensureAdmin,
  createCarSpecificationController.handle
)

carRoutes.post(
  '/images',
  ensureAuthentication,
  ensureAdmin,
  uploadCarImage.array('images'),
  uploadCarImagesController.handle
)
