/* eslint-disable @typescript-eslint/naming-convention */
import Vehicle from '#models/vehicle'
import { createVehicleValidator } from '#validators/create_vehicle'
import type { HttpContext } from '@adonisjs/core/http'

export default class VehicleStoresController {
  async store({ request, response, auth }: HttpContext) {
    const userId = auth.user?.id
    const { brand, vehicle_type_id, year, model } =
      await request.validateUsing(createVehicleValidator)

    try {
      await Vehicle.create({
        userId,
        brand,
        year,
        model,
        vehicleTypeId: vehicle_type_id,
      })
      return response.status(200).send({ message: 'Veiculo Criado' })
    } catch (error) {
      return response.badRequest({ message: 'Falha ao Cadastrar veiculo', error })
    }
  }
}
