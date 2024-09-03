import VehicleType from '#models/vehicle_type'
import type { HttpContext } from '@adonisjs/core/http'

export default class VehicleTypeDropdownsController {
  async index({ response }: HttpContext) {
    const data = await VehicleType.query().select('id', 'type').orderBy('created_at', 'desc')
    return response.ok({ data })
  }
}
