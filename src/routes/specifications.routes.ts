import { Router } from 'express'
import { createSpeceficationController } from '@modules/cars/useCases/createSpecification'

export const specificationsRoutes = Router()

specificationsRoutes.post('/', (request, response) => {
  createSpeceficationController.handle(request, response)
})

// specificationsRoutes.get('/', (request, response) => {
//   const specifications = specificationsRepository.list()

//   return response.json(specifications)
// })
