import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../repositories/UsersRepository'
import { ICreateUserDTO } from '../dtos/ICreateUSerDTO'

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    username,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    await this.usersRepository.create({
      name,
      username,
      email,
      password,
      driver_license,
    })
  }
}
