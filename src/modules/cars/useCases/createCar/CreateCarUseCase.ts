import { inject, injectable } from 'tsyringe'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
  name: string
  description: string
  daily_rate: number
  license_plate: string
  brand: string
  fine_amount: number
  category_id: string
}

@injectable()
export class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    name,
    description,
    daily_rate,
    license_plate,
    brand,
    fine_amount,
    category_id,
  }: IRequest): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(
      license_plate
    )

    if (carAlreadyExists) {
      throw new AppError('Car already exists!')
    }

    return await this.carsRepository.create({
      name,
      description,
      daily_rate,
      license_plate,
      brand,
      fine_amount,
      category_id,
    })
  }
}
