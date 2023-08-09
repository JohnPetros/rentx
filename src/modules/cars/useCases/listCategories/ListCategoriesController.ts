import { Request, Response } from 'express'
import { ListCategoriesUseCase } from './ListCategoriesUseCase'

export class ListCategoriesController {
  constructor(private createCategoryUseCase: ListCategoriesUseCase) {}

  async handle(request: Request, response: Response) {
    const allCategories = await this.createCategoryUseCase.execute()

    return response.json(allCategories)
  }
}
