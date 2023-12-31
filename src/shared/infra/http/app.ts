import 'express-async-errors'
import express, { NextFunction, Request, Response } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerConfig from '../../../swagger.json'

import 'reflect-metadata'
import '../typeorm'
import '../../container'

import { router } from './routes'
import { AppError } from '@shared/errors/AppError'

export const app = express()

app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig))

app.use(router)

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    console.error(error.message)

    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        message: error.message,
      })
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${error.message}`,
    })
  }
)

