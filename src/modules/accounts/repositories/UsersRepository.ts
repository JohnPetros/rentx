import { ICreateUserDTO } from "../dtos/ICreateUSerDTO"

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>
}