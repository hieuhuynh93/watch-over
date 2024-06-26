import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Profile extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare userId: number

  @column()
  declare pseudo: string

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare avatar: string | null

  @column()
  declare bio: string | null

  @column()
  declare location: string | null

  @column()
  declare website: string | null
}
