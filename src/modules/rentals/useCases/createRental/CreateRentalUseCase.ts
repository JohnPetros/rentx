import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'
import { AppError } from '@shared/errors/AppError'

dayjs.extend(utc)

interface IRequest {
  user_id: string
  car_id: string
  expected_return_date: Date
}

export class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) {}

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const rentalMinHours = 24

    const isCarUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    )

    if (isCarUnavailable) {
      throw new AppError('This car is unavailable')
    }

    const openRental = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    )

    if (openRental) {
      throw new AppError('Already exists a rental for this user')
    }

    const expectedReturnDateFormat = dayjs(expected_return_date)
      .utc()
      .local()
      .format()

    const currentDate = dayjs().utc().local().format()

    const diff = dayjs(expectedReturnDateFormat).diff(currentDate, 'hours')

    if (diff < rentalMinHours) {
      throw new AppError('Invalid expected return date')
    }

    const createdRental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    })

    return createdRental
  }
}