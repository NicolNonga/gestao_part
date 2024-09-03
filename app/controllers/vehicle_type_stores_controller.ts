import VehicleType from '#models/vehicle_type'
import { CreateVehicleType } from '#validators/vehicle_type_create'
import type { HttpContext } from '@adonisjs/core/http'

export default class VehicleTypeStoresController {
  async store({ request, response, auth }: HttpContext) {
    const userId = auth.user?.id
    const vehicletypePayload = await request.validateUsing(CreateVehicleType)

    try {
      await VehicleType.create({
        description: vehicletypePayload.description ? vehicletypePayload.description : undefined,
        type: vehicletypePayload.type,
        userId: userId,
      })
      return response.status(200).send({ message: 'Criado Com Sucesso' })
    } catch (error) {
      return response.badRequest({ message: 'Falha ao  criar tipo de veiculo' })
    }
  }
}
