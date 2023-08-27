import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'
import { ICreateUserDTO } from '../../dtos/ICreateUSerDTO'
import { CreateUserUseCase } from '../createUser/CreateUserUseCase'
import { AppError } from '../../../../shared/errors/AppError'

describe('Authenticate User Use Case', () => {
  let usersRepositoryInMemory: UsersRepositoryInMemory
  let authenticateUserUseCase: AuthenticateUserUseCase
  let createUserCase: CreateUserUseCase

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    )
    createUserCase = new CreateUserUseCase(usersRepositoryInMemory)
  })

  it('should be able to authenticate a user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '000456',
      name: 'User Test',
      email: 'user@test.gmail.com',
      password: '1234',
    }

    await createUserCase.execute(user)

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    })

    expect(result).toHaveProperty('token')
  })

  it('should not be able to authenticate a user that does not exist', () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'false@email.com',
        password: '1234',
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate a user with a incorrect password', () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: '000456',
        name: 'User Test',
        email: 'user@test.gmail.com',
        password: '1234',
      }

      await createUserCase.execute(user)

      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'incorrect password',
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
