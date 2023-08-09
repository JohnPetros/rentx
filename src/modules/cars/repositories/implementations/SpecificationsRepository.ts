import { Specification } from '../../entities/Specification'
import {
  ICreateServiceDTO,
  ISpecificationsRepository,
} from '../ISpecificationsRepository'

export class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[]

  constructor() {
    this.specifications = []
  }

  findByName(name: string): Specification {
    const specification = this.specifications.find(
      (specification) => specification.name === name
    )
    return specification
  }

  create({ name, description }: ICreateServiceDTO): void {
    const specification = new Specification()

    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    })

    this.specifications.push(specification)
  }
}