import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateRentalUseCase } from './CreateRentalUseCase'

export class CreateRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { car_id, expected_return_date } = request.body
    const { user } = request

    const createRentalUseCase = container.resolve(CreateRentalUseCase)

   const createdRental = await createRentalUseCase.execute({
      user_id: user.id,
      car_id,
      expected_return_date,
    })

    return response.status(201).json(createdRental)
  }
}
