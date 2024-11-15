import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class DashboardController {
  async index({ response }: HttpContext) {
    const clientes = await db.from('clients').count('* as total')
    const users = await db.from('users').count('* as total')
    const parts = await db.from('parts').count('* as total')
    const vehicles = await db.from('vehicles').count('* as total')

    const data = {
      total_clientes: clientes[0].total,
      total_users: users[0].total,
      total_parts: parts[0].total,
      total_vehicles: vehicles[0].total,
    }
    return response.ok({ data })
  }
}
