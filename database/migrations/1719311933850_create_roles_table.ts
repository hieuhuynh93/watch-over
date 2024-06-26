import { BaseSchema } from '@adonisjs/lucid/schema'
import Roles, { RolesText } from '#src/users/enums/roles'

export default class extends BaseSchema {
  protected tableName = 'roles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 50).notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    this.defer(async (db) => {
      await db.table(this.tableName).multiInsert([
        {
          id: Roles.USER,
          name: RolesText[Roles.USER],
        },
        {
          id: Roles.CREW,
          name: RolesText[Roles.CREW],
        },
        {
          id: Roles.OWNER,
          name: RolesText[Roles.OWNER],
        },
      ])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
