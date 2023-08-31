import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { CreateCarUseCase } from './CreateCarUseCase'
import { AppError } from '@shared/errors/AppError'

let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('Create Car Use Case', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
  })

  it('should be able to create a new car', async () => {
    const createdCar = await createCarUseCase.execute({
      name: 'Name Mock',
      description: 'Description Mock',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      brand: 'Brand Mock',
      fine_amount: 60,
      category_id: 'uuid mock',
    })

    expect(createdCar).toHaveProperty('id')
  })

  it('should be able to create a car with a license plate that already exists', async () => {
    expect(async () => {
      await createCarUseCase.execute({
        license_plate: 'ABC-1234',
        name: 'Name 1 Mock',
        description: 'Description Mock',
        daily_rate: 100,
        brand: 'Brand Mock',
        fine_amount: 60,
        category_id: 'uuid mock',
      })

      await createCarUseCase.execute({
        license_plate: 'ABC-1234',
        name: 'Name 2 Mock',
        description: 'Description Mock',
        daily_rate: 100,
        brand: 'Brand Mock',
        fine_amount: 60,
        category_id: 'uuid mock',
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to create a car that is available by default', async () => {
    const createdCar = await createCarUseCase.execute({
      name: 'Name Mock',
      description: 'Description Mock',
      daily_rate: 100,
      license_plate: 'ABCD-1234',
      brand: 'Brand Mock',
      fine_amount: 60,
      category_id: 'uuid mock',
    })

    expect(createdCar.is_available).toBe(true)
  })
})
