import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class PaymentMethod extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare description: string
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column()
  declare userId: number

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
