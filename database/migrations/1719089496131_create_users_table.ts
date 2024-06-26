import { BaseSchema } from '@adonisjs/lucid/schema'
import Roles from '#src/users/enums/roles'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table.enum('role', [Roles.USER, Roles.CREW, Roles.OWNER]).notNullable().defaultTo(Roles.USER)

      table.string('email', 255).notNullable().unique()
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()
      table.boolean('is_email_verified').notNullable().defaultTo(false)

      table.timestamp('created_at')
      table.timestamp('last_connected')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
