import { v4 as uuid } from 'uuid'

export class Car {
  id: string

  name: string

  description: string

  daily_rate: number

  license_plate: string

  is_available: boolean

  brand: string

  fine_amount: number

  category_id: string

  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuid()
      this.is_available = true
      this.created_at = new Date()
    }
  }
}
