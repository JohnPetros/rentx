import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { SpecificationsInMemory } from '@modules/cars/repositories/in-memory/SpecificationsInMemory'
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase'
import { CreateCarUseCase } from '../createCar/CreateCarUseCase'
import { AppError } from '@shared/errors/AppError'

let carsRepositoryInMemory: CarsRepositoryInMemory = null
let specificationsInMemory: SpecificationsInMemory = null

let createCarUseCase: CreateCarUseCase = null
let createCarSpecificationUseCase: CreateCarSpecificationUseCase = null

describe('Create Car Specification Use Case', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    specificationsInMemory = new SpecificationsInMemory()

    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsInMemory
    )
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
  })

  it('should not be able to add a new specification to a car that does not exist', async () => {
    expect(async () => {
      const car_id = '123'
      const specifications_ids = ['12345']

      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_ids,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to add a new specification to the car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car name test ',
      description: 'Car description test ',
      daily_rate: 100,
      license_plate: 'ABCD-1234',
      brand: 'Car brand test ',
      fine_amount: 60,
      category_id: 'Car uuid test ',
    })

    const specification = await specificationsInMemory.create({
      name: 'Specification name test',
      description: 'Specification description test',
    })

    const specifications_ids = [specification.id]

    const updatedCar = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_ids,
    })

    expect(updatedCar).toHaveProperty('specifications', updatedCar.specifications)
  })
})
