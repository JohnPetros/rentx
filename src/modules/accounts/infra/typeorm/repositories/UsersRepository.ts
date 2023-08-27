import { Repository } from 'typeorm'
import { AppDataSource } from '@shared/infra/typeorm'

import { ICreateUserDTO } from '../../../dtos/ICreateUSerDTO'
import { IUsersRepository } from '../../../repositories/IUsersRepository'
import { User } from '../entities/User'

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
    id,
    avatar,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
      driver_license,
      id,
      avatar,
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
