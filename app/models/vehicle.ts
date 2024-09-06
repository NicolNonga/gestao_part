import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import VehicleType from './vehicle_type.js'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Part from './part.js'

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

  @manyToMany(() => Part, {
    pivotTable: 'vehicle_parts',
  })
  declare parts: ManyToMany<typeof Part>
}
