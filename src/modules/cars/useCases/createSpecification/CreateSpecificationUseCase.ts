import { injectable, inject } from 'tsyringe'
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository'

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
    const categoryAldearyExists = this.specificationsRepository.findByName(name)

    if (categoryAldearyExists) {
      throw new Error('Category already exists')
    }

    this.specificationsRepository.create({ name, description })
  }
}
