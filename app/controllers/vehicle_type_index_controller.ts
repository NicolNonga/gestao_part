import VehicleType from '#models/vehicle_type'
import type { HttpContext } from '@adonisjs/core/http'

export default class VehicleTypeIndexController {
  async index({ request, response }: HttpContext) {
    const page = request.input('page')
    const perPage = request.input('perPage')

    const data = await VehicleType.query()
      .orderBy('created_at', 'desc')
      .preload('user')
      .paginate(page | 1, perPage | 10)

    return response.ok(data)
  }
}
