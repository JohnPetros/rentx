import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('users')
export class User {
  @PrimaryColumn('uuid')
  id?: string

  @Column('text')
  name: string

  @Column('text')
  email: string

  @Column('text')
  password: string

  @Column('text')
  driver_license: string

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

