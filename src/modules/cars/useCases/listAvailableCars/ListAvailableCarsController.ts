import { Request, Response } from 'express'
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase'
import { container } from 'tsyringe'

export class ListAvailableCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { brand, category_id, name } = request.query

    const listAvailableCarsUseCase = container.resolve(ListAvailableCarsUseCase)

    const availableCars = await listAvailableCarsUseCase.execute({
      brand: brand ? String(brand) : null,
      category_id: category_id ? String(category_id) : null,
      name: name ? String(name) : null,
    })

    return response.json(availableCars)
  }
}
