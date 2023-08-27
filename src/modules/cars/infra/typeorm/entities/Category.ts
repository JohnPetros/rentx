import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('categories')
export class Category {
  @PrimaryColumn('uuid')
  id?: string

  @Column('text')
  name: string

  @Column('text')
  description: string

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}
