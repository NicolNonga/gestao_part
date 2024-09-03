import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Log extends BaseModel {
  @column({ isPrimary: true })
  declare id: number


  @column()
  declare user : string
  @column()
  declare app_nome: string
  @column()
  declare started: DateTime

  @column()
  declare ended: DateTime

  @column()
  declare stay_open_during : number

  @column ()
  declare mac_adress:string

  @column()
  declare ip: string


}