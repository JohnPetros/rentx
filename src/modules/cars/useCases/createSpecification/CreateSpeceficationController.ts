import { inject, injectable } from 'tsyringe'

import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase'

export class CreateSpeceficationController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body

    const createCategoryUseCase = container.resolve(CreateSpecificationUseCase)

    await createCategoryUseCase.execute({ name, description })

    return response.status(201).send()
  }
}
