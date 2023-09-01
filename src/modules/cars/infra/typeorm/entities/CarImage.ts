import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('cars_image')
export class CarImage {
  @PrimaryColumn('uuid')
  id?: string

  @Column('text')
  image_name: string

  @Column('uuid')
  car_id: string

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}
