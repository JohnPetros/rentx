import { DataSource } from 'typeorm'
import { Seeder, SeederFactoryManager, runSeeder } from 'typeorm-extension'
import { AdminSeeder } from './AdminSeeder'

export class MainSeeder implements Seeder {
  track?: boolean
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    await runSeeder(dataSource, AdminSeeder)
  }
}
