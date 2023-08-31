import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm'
import { v4 as uuid } from 'uuid'
import { Category } from './Category'

@Entity('cars')
export class Car {
  @PrimaryColumn('uuid')
  id: string

  @Column('text')
  name: string

  @Column('text')
  description: string

  @Column('integer')
  daily_rate: number

  @Column('text')
  license_plate: string

  @Column('boolean')
  is_available: boolean

  @Column('text')
  brand: string

  @Column('integer')
  fine_amount: number

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category

  @Column('text')
  category_id: string

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuid()
      this.is_available = true
    }
  }
}
