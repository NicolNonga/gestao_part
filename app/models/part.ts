import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import TypePart from './type_part.js'

export default class Part extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column()
  declare description: string
  @column()
  declare reference: string
  @column()
  declare price: number

  @column()
  declare typePartId: number
  @column()
  declare userId: number

  @column()
  declare isDeleted?: boolean

  @column()
  declare fileName: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => TypePart)
  declare typeParts: BelongsTo<typeof TypePart>
}
