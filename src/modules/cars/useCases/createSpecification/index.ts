import { SpecificationsRepository } from '@modules/cars/repositories/implementations/SpecificationsRepository'
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase'
import { CreateSpeceficationController } from './CreateSpeceficationController'

const specificationsRepository = new SpecificationsRepository()
const createSpecificationUseCase = new CreateSpecificationUseCase(
  specificationsRepository
)
export const createSpeceficationController = new CreateSpeceficationController(
  createSpecificationUseCase
)
