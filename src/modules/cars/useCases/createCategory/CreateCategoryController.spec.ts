import request from 'supertest'

import { v4 as uuid } from 'uuid'
import { hash } from 'bcrypt'

import { app } from '@shared/infra/http/app'
import { AppDataSource } from '@shared/infra/typeorm'

describe('Create Category Controller', () => {
  beforeAll(async () => {
    await AppDataSource.initialize()
    await AppDataSource.runMigrations()

    const id = uuid()
    const password = await hash('admin', 8)

    AppDataSource.query(
      `INSERT INTO users (id, name, email, password, is_admin, created_at, driver_license)
        VALUES ('${id}', 'admin', 'admin@rentx.com.br', ${password}, true, 'now()', 'XXXXXX')`
    )
  })

  afterAll(async () => {
    await AppDataSource.dropDatabase()
    await AppDataSource.destroy()
  })

  it('should be to create a new category', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin',
    })

    console.log(responseToken.body)

    const response = await request(app).post('/categories').send({
      name: 'Category Supertest',
      description: 'Category Supertest',
    })

    expect(response.status).toBe(201)
  })
})
