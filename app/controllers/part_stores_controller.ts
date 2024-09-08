import Part from '#models/part'
import { createPartValidator } from '#validators/part_validator_create'
import type { HttpContext } from '@adonisjs/core/http'

export default class PartStoresController {
  async store({ request, response, auth }: HttpContext) {
    const userId = auth.user?.id
    const partPayload = await request.validateUsing(createPartValidator)

    try {
      await Part.create({
        userId,
        nome: partPayload.nome,
        reference: partPayload.reference,
        typePartId: partPayload.type_part_id,
        description: partPayload.description,
        price: partPayload.price,
      })

      return response.status(200).send({ message: 'Cadastrado' })
    } catch (error) {
      return response.badRequest({ message: 'Falha ao cadastra peça' })
    }
  }
}
