import { Repository } from 'typeorm'
import { AppDataSource } from 'database'

import { ICreateUserDTO } from '../../dtos/ICreateUSerDTO'
import { IUsersRepository } from '../UsersRepository'
import { User } from '../../entities/User'

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = AppDataSource.getRepository(User)
  }

  async create({
    name,
    username,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      username,
      email,
      password,
      driver_license,
    })

    this.repository.save(user)
  }
}
