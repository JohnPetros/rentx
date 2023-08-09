import { Request, Response } from 'express'
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase'

export class CreateSpeceficationController {
  constructor(private createCategoryUseCase: CreateSpecificationUseCase) {}

  handle(request: Request, response: Response) {
    const { name, description } = request.body

    this.createCategoryUseCase.execute({ name, description })

    return response.status(201).send()
  }
}
