import { injectable, inject } from 'tsyringe'
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository'
import { AppError } from '@errors/AppError'

interface IRequest {
  name: string
  description: string
}

@injectable()
export class CreateSpecificationUseCase {
  constructor(
  @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository) {}

  async execute({ name, description }: IRequest) {
    const specificationAldearyExists = await this.specificationsRepository.findByName(
      name
    )

    if (specificationAldearyExists) {
      throw new AppError('Specification already exists')
    }

    this.specificationsRepository.create({ name, description })
  }
}
