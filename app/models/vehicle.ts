import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import VehicleType from './vehicle_type.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Vehicle extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare brand: string
  @column()
  declare model: string
  @column()
  declare year: string
  @column()
  declare vehicleTypeId: number
  @column()
  declare userId: number
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => VehicleType)
  declare vehicleType: BelongsTo<typeof VehicleType>
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
