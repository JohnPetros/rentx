import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  user_id: string
  car_id: string
  expected_return_date: Date
}

@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}

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

    const currentDate = this.dateProvider.getCurrentDate()

    const diffHours = this.dateProvider.compareHours(
      currentDate,
      expected_return_date
    )

    if (diffHours < rentalMinHours) {
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
