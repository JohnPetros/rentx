import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUsers1692457584673 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'text',
          },
          {
            name: 'username',
            type: 'text',
            isUnique: true,
          },
          {
            name: 'email',
            type: 'text',
          },
          {
            name: 'password',
            type: 'text',
          },
          {
            name: 'driver_license',
            type: 'text',
          },
          {
            name: 'is_admin',
            type: 'text',
            default: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }
}
