import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'
import { Router } from 'express'

export const carRoutes = Router()

const createCarController = new CreateCarController()

carRoutes.post('/', createCarController.handle)
