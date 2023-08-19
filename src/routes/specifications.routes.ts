import { CreateSpeceficationController } from '@modules/cars/useCases/createSpecification/CreateSpeceficationController'
import { Router } from 'express'

export const specificationsRoutes = Router()

const createSpeceficationController = new CreateSpeceficationController()

specificationsRoutes.post('/', createSpeceficationController.handle)

// specificationsRoutes.get('/', (request, response) => {
//   const specifications = specificationsRepository.list()

//   return response.json(specifications)
// })
