import { UploadCategoryUseCase } from './UploadCategoryUseCase'
import { Request, Response } from 'express'

export class UploadCategoryController {
  constructor(private uploadCategoryUseCase: UploadCategoryUseCase) {}

  handle(request: Request, response: Response) {
    const { file } = request

    this.uploadCategoryUseCase.execute(file)

    return response.json()
  }
}
