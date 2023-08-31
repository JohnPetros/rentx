import { Router } from 'express'

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'

import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthentication } from '../middlewares/ensureAthentication'

export const carRoutes = Router()

const createCarController = new CreateCarController()

carRoutes.post(
  '/',
  ensureAuthentication,
  ensureAdmin,
  createCarController.handle
)
