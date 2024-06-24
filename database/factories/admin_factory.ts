import factory from '@adonisjs/lucid/factories'

import Admin from '#src/admin/models/admin'

export const AdminFactory = factory
  .define(Admin, async () => {
    return {
      email: 'admin@admin.com',
      password: 'adminadmin',
    }
  })
  .build()
