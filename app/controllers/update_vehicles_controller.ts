import Vehicle from '#models/vehicle'
import type { HttpContext } from '@adonisjs/core/http'

export default class UpdateVehiclesController {
  async update({ request, response, params }: HttpContext) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { brand, vehicle_type_id, year, model } = request.only([
      'brand',
      'vehicle_type_id',
      'year',
      'model',
    ])
    const { vehicleId } = params
    try {
      await Vehicle.query().where('id', vehicleId).update({
        brand,
        year,
        model,
        vehicle_type_id,
      })
      return response.status(200).send({ message: 'Veiculoa Actualizado' })
    } catch (error) {
      return response.badRequest({ message: 'falha ao actualizar' })
    }
  }
}
