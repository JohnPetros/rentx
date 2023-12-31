import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory'
import { CreateRentalUseCase } from './CreateRentalUseCase'

import { AppError } from '@shared/errors/AppError'
import { DateProvider } from '@shared/providers/dateProvider/implementations/DateProvider'

let rentalsRepositoryInMemory = null
let dateProvider = null
let createRentalUseCase = null
let currentAfter24Hours = null

describe('Create Rental', () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    dateProvider = new DateProvider()
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dateProvider
    )

    currentAfter24Hours = dateProvider.getCurrentDayAfter24Hors()
  })

  it('should be able to create a new rental', async () => {
    const createdRental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: '12345',
      expected_return_date: currentAfter24Hours,
    })

    expect(createdRental).toHaveProperty('user_id', createdRental.user_id)
    expect(createdRental).toHaveProperty('car_id', createdRental.car_id)
    expect(createdRental).toHaveProperty(
      'expected_return_date',
      createdRental.expected_return_date
    )
  })

  it('should not be able to create a new rental when already exists an open one for the same user', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '424242',
        car_id: '54321',
        expected_return_date: currentAfter24Hours,
      })
      await createRentalUseCase.execute({
        user_id: '424242',
        car_id: '654321',
        expected_return_date: currentAfter24Hours,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new rental when already exists an open one for the same car', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '123456',
        car_id: '424242',
        expected_return_date: currentAfter24Hours,
      })
      await createRentalUseCase.execute({
        user_id: '654321',
        car_id: '424242',
        expected_return_date: currentAfter24Hours,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new rental whit a invalid expected return date', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '123456',
        car_id: '424242',
        expected_return_date: dateProvider.getCurrentDate(),
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
