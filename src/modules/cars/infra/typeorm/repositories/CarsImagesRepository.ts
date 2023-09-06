import { Repository } from 'typeorm'
import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository'
import { CarImage } from '../entities/CarImage'
import { AppDataSource } from '@shared/infra/typeorm'

export class CarsImagesRepository implements ICarsImagesRepository {
  private repository: Repository<CarImage>

  constructor() {
    this.repository = AppDataSource.getRepository(CarImage)
  }

  async create(car_id: string, image_name: string): Promise<CarImage> {
    const carImage = this.repository.create({
      car_id,
      image_name,
    })

    console.log(carImage);
    
    await this.repository.save(carImage)

    return carImage
  }
}
