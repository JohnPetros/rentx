import { Repository } from 'typeorm'
import { Rental } from '../entities/Rental'
import { AppDataSource } from '@shared/infra/typeorm'

import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRental'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'

export class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>

  constructor() {
    this.repository = AppDataSource.getRepository(Rental)
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return await this.repository.findOne({ where: { car_id } })
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return await this.repository.findOne({ where: { user_id } })
  }

  async create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const createdRental = this.repository.create({
      car_id,
      user_id,
      expected_return_date,
    })

    await this.repository.save(createdRental)

    return createdRental
  }
}
