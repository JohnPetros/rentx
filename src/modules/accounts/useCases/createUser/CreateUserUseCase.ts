import { inject, injectable } from 'tsyringe'

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUSerDTO'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'

import { hash } from 'bcrypt'
import { AppError } from '@errors/AppError'

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {

    const userAlreadyExist = await this.usersRepository.findByEmail(email)

    if (userAlreadyExist) {
      throw new AppError("User already exists")
    }

    const passwordHash = await hash(password, 8)

    await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      driver_license,
    })
  }
}
