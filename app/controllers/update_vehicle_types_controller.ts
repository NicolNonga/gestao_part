import VehicleType from '#models/vehicle_type'
import type { HttpContext } from '@adonisjs/core/http'

export default class UpdateVehicleTypesController {
  async update({ request, response, params }: HttpContext) {
    const { type, description } = request.only(['type', 'description'])
    const { vehicleTypeId } = params

    try {
      const typeExist = await VehicleType.query()
        .where('type', type)
        .whereNot('id', vehicleTypeId)
        .first()
      if (typeExist) return response.badRequest({ message: 'Tipo Já cadastrado' })
      await VehicleType.query().where('id', vehicleTypeId).update({ type, description })
      return response.status(200).send({ message: 'Tipo Actualizado Com Sucesso' })
    } catch (error) {
      response.badRequest({ message: 'Falha ao Actualizar' })
      console.error(error)
    }
  }
}
