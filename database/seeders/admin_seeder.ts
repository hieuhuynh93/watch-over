import Admin from '#src/admin/models/admin'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Admin.create({
      email: 'admin@admin.com',
      password: 'adminadmin',
    })
  }
}
