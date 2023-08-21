import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import { AppError } from '@errors/AppError'
import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository'

export async function ensureAuthentication(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('Token missing', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub: userId } = verify(token, '3f388a638143f3b6aa1e36a4bf8cd17c')

    const usersRepository = new UsersRepository()
    const user = usersRepository.findById(String(userId))

    if (!user) {
      throw new AppError('User does not exist', 401)
    }

    request.user = {
      id: String(userId)
    }

    next()
  } catch (error) {
    console.error(error)
    throw new AppError('Ivalid token', 401)
  }
}
