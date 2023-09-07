import { PrimaryColumn, CreateDateColumn, Column, Entity } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('rentals')
export class Rental {
  @PrimaryColumn('uuid')
  id: string

  @Column('text')
  car_id: string

  @Column('text')
  user_id: string

  @CreateDateColumn()
  start_date: Date

  @CreateDateColumn()
  end_date: Date

  @CreateDateColumn()
  expected_return_date: Date

  @Column('numeric')
  total: number

  @CreateDateColumn()
  created_at: Date
  
  @CreateDateColumn()
  updated_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}
