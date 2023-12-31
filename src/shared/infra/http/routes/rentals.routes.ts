import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController'
import { Router } from 'express'
import { ensureAuthentication } from '../middlewares/ensureAthentication'

export const rentalsRoutes = Router()

const createRentalController = new CreateRentalController()

rentalsRoutes.post('/', ensureAuthentication, createRentalController.handle)

