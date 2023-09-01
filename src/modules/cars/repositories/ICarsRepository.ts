import { ICrateCarDTO } from '../dtos/ICreateCarsDTO'
import { Car } from '../infra/typeorm/entities/Car'

export interface ICarsRepository {
  create(data: ICrateCarDTO): Promise<Car>
  findByLicensePlate(license_plate: string): Promise<Car>
  findAllAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]>
}
