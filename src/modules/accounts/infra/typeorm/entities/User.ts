import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('users')
export class User {
  @PrimaryColumn({ type: 'uuid' })
  id?: string

  @Column({ type: 'text', unique: true })
  name: string

  @Column({ type: 'text', unique: true })
  email: string

  @Column({ type: 'text' })
  password: string

  @Column({ type: 'text' })
  driver_license: string

  @Column({ type: 'text' })
  avatar: string

  @Column({ type: 'text', default: false })
  is_admin: boolean

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuid()
      this.is_admin = false
    }
  }
}
