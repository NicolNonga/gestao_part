import Part from '#models/part'
import VehiclePart from '#models/vehicle_part'
import { CreateVehiclePart } from '#validators/create_vehicle_part'
import type { HttpContext } from '@adonisjs/core/http'

export default class VehiclePartStoresController {
  async store({ response, request }: HttpContext) {
    const { parts, vehicleId } = await request.validateUsing(CreateVehiclePart)
    let totalParts = 0
    try {
      for (const partId of parts) {
        const partFound = await Part.findBy('id', partId)
        if (partFound) {
          totalParts += 1
          await VehiclePart.create({
            vehicleId,
            partId: partId,
          })
        }
      }
      if (totalParts === 0) {
        return response.status(200).send({ message: 'Nenhuma pecas encontrada' })
      }
      return response.status(200).send({ message: 'peça adicionado' })
    } catch (error) {
      return response.badRequest({ message: 'Falha ao adicionar peç' })
    }
  }
}
