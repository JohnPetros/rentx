import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { DataSource } from 'typeorm'

import { v4 as uuid } from 'uuid'
import { hash } from 'bcrypt'
import { User } from '../../../../modules/accounts/infra/typeorm/entities/User'

export class AdminSeeder implements Seeder {
  track?: boolean
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    const usersRepository = dataSource.getRepository(User)

    const id = uuid()
    const password = await hash('admin', 8)

    const adminData = {
      id,
      name: 'admin',
      email: 'admin@rentx.com.br',
      password,
      is_admin: true,
      driver_license: '645321',
    }

    const newAdmin = usersRepository.create(adminData)
    await usersRepository.save(newAdmin)
  }
}
