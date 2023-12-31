import { ICreateUserDTO } from '../dtos/ICreateUSerDTO'
import { User } from '../infra/typeorm/entities/User'

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>
  findByEmail(email: string): Promise<User>
  findById(id: string): Promise<User>
}
