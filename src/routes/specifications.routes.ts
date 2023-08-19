import { Router } from 'express'
import { ensureAuthentication } from 'middlewares/ensureAthentication'
import { CreateSpeceficationController } from '@modules/cars/useCases/createSpecification/CreateSpeceficationController'

export const specificationsRoutes = Router()

const createSpeceficationController = new CreateSpeceficationController()

specificationsRoutes.use(ensureAuthentication)

specificationsRoutes.post('/', createSpeceficationController.handle)
