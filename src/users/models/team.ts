import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'

import User from '#src/users/models/user'

export default class Team extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare logo: string

  @column()
  declare channel: string

  @column()
  declare token: string

  @column()
  declare refreshToken: string

  @column()
  declare expiresIn: number

  @column()
  declare expiresAt: DateTime

  @column()
  declare ownerId: number

  @belongsTo(() => User)
  declare owner: BelongsTo<typeof User>

  @manyToMany(() => User)
  declare members: ManyToMany<typeof User>
}
