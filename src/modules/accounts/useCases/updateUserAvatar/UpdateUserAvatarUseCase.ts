import { IUsersRepository } from '../../repositories/IUsersRepository'
import { inject, injectable } from 'tsyringe'

import { File } from '@utils/File'

interface IRequest {
  user_id: string
  avatar_file: string
}

@injectable()
export class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id)

    if (user.avatar) {
      const file = new File()

      await file.delete(`./tmp/avatar/${user.avatar}`)
    }

    user.avatar = avatar_file

    await this.usersRepository.create(user)
  }
}
