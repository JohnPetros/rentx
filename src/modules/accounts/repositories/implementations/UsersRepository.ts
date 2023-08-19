import { Repository } from 'typeorm'
import { AppDataSource } from 'database'

import { ICreateUserDTO } from '../../dtos/ICreateUSerDTO'
import { IUsersRepository } from '../IUsersRepository'
import { User } from '../../entities/User'

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = AppDataSource.getRepository(User)
  }

  async create({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
      driver_license,
    })

    this.repository.save(user)
  }

  async findByEmail(email: string): Promise<User> {
    return await this.repository.findOne({ where: { email } })
  }

  async findById(id: string): Promise<User> {
    return await this.repository.findOne({ where: { id } })
  }
}
