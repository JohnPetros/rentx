import { inject, injectable } from 'tsyringe'

import { IUsersRepository } from '../../repositories/IUsersRepository'

import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { AppError } from '../../../../shared/errors/AppError'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    email: string
    password: string
  }
  token: string
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Email or password incorrect')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect')
    }

    const token = sign({}, '3f388a638143f3b6aa1e36a4bf8cd17c', {
      subject: user.id,
      expiresIn: '1d',
    })

    return {
      user,
      token,
    }
  }
}
