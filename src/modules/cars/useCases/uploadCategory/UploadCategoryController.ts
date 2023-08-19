import { container } from 'tsyringe'
import { UploadCategoryUseCase } from './UploadCategoryUseCase'
import { Request, Response } from 'express'

export class UploadCategoryController {

  async handle(request: Request, response: Response) {
    const { file } = request

    const uploadCategoryUseCase = container.resolve(UploadCategoryUseCase)

    await uploadCategoryUseCase.execute(file)

    return response.status(201).json()
  }
}
