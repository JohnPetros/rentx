import { SpecificationsRepository } from '@modules/cars/repositories/implementations/SpecificationsRepository'

interface IRequest {
  name: string
  description: string
}

export class CreateSpecificationUseCase {
  constructor(private specificationsRepository: SpecificationsRepository) {}

  execute({ name, description }: IRequest) {
    const categoryAldearyExists = this.specificationsRepository.findByName(name)

    if (categoryAldearyExists) {
      throw new Error('Category already exists')
    }

    this.specificationsRepository.create({ name, description })
  }
}
