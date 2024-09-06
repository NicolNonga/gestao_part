import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class VehiclePart extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare vehicleId: number
  @column()
  declare partId: number
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
