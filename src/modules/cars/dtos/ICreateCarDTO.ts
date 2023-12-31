import { Specification } from "../infra/typeorm/entities/Specification"

export interface ICrateCarDTO {
  name: string
  description: string
  daily_rate: number
  license_plate: string
  brand: string
  fine_amount: number
  category_id: string
  specifications?: Specification[]
  id?: string
}