import Vehicle from '#models/vehicle'
import type { HttpContext } from '@adonisjs/core/http'

export default class VehicleIndexController {
  async index({ request, response }: HttpContext) {
    const page = request.input('page')
    const perPage = request.input('perPage')

    const data = await Vehicle.query()
      .orderBy('created_at', 'desc')
      .preload('user')
      .preload('vehicleType')
      .preload('parts')
      .paginate(page | 1, perPage | 10)

    return response.ok(data)
  }
}
