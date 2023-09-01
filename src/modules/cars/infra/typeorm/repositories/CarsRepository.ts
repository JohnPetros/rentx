import { ICrateCarDTO } from '@modules/cars/dtos/ICreateCarsDTO'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { ICarsRepository } from '../../../repositories/ICarsRepository'
import { Repository } from 'typeorm'
import { AppDataSource } from '@shared/infra/typeorm'

export class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>

  constructor() {
    this.repository = AppDataSource.getRepository(Car)
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    brand,
    fine_amount,
    category_id,
  }: ICrateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      daily_rate,
      license_plate,
      brand,
      fine_amount,
      category_id,
    })

    await this.repository.save(car)

    return car
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return await this.repository.findOne({ where: { license_plate } })
  }

  async findAllAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    const carsQuery = await this.repository
      .createQueryBuilder('c')
      .where('is_available = :is_available', { is_available: true })

    if (brand) {
      carsQuery.andWhere('c.brand = :brand', { brand })
    }    
    
    if (category_id) {
      carsQuery.andWhere('c.category_id = :category_id', { category_id })
    }

    if (name) {
      carsQuery.andWhere('c.name = :name', { name })
    }

    return await carsQuery.getMany()
  }
}
