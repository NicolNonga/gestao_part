import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Supplier from './supplier.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Part from './part.js'

export default class Stock extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare partId: number
  @column()
  declare supplieId: number
  @column()
  declare quantity: number
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Supplier, {
    foreignKey: 'supplieId',
  })
  declare supplier: BelongsTo<typeof Supplier>
  @belongsTo(() => Part)
  declare part: BelongsTo<typeof Part>
}
