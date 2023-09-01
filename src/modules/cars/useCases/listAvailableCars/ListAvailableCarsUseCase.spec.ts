import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase'
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'

let listAvailableCarsUseCase: ListAvailableCarsUseCase = null
let carsRepositoryInMemory: CarsRepositoryInMemory = null

describe('List Available Cars Use Case', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)
  })

  it('should be able to list all available cars', async () => {
    const availableCar = await carsRepositoryInMemory.create({
      name: 'Available car name test',
      license_plate: 'AAA-9999',
      description: 'Car description test',
      daily_rate: 100,
      brand: 'Car brand test',
      fine_amount: 50,
      category_id: 'Car category id test',
    })

    const availableCars = await listAvailableCarsUseCase.execute({})

    expect(availableCars).toEqual([availableCar])
  })

  it('should be able to list all available cars by brand', async () => {
    const availableCar = await carsRepositoryInMemory.create({
      name: 'Available car name test',
      license_plate: 'AAA-9999',
      description: 'Car description test',
      daily_rate: 100,
      brand: 'Car brand test',
      fine_amount: 50,
      category_id: 'Car category id test',
    })

    const availableCars = await listAvailableCarsUseCase.execute({
      brand: 'Car brand test',
    })

    expect(availableCars).toEqual([availableCar])
  })

  it('should be able to list all available cars by name', async () => {
    const availableCar = await carsRepositoryInMemory.create({
      name: 'Available car name test',
      license_plate: 'AAA-9999',
      description: 'Car description test',
      daily_rate: 100,
      brand: 'Car brand test',
      fine_amount: 50,
      category_id: 'Car category id test',
    })

    const availableCars = await listAvailableCarsUseCase.execute({
      brand: 'Available car name test',
    })

    expect(availableCars).toEqual([availableCar])
  })

  it('should be able to list all available cars by category', async () => {
    const availableCar = await carsRepositoryInMemory.create({
      name: 'Available car name test',
      license_plate: 'AAA-9999',
      description: 'Car description test',
      daily_rate: 100,
      brand: 'Car brand test',
      fine_amount: 50,
      category_id: 'Car category id test',
    })

    const availableCars = await listAvailableCarsUseCase.execute({
      brand: 'Car category id test',
    })

    expect(availableCars).toEqual([availableCar])
  })
})
