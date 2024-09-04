import Part from '#models/part'
import { createPartValidator } from '#validators/part_validator_create'
import type { HttpContext } from '@adonisjs/core/http'
export default class PartUpdatesController {
  async update({ request, response, params }: HttpContext) {
    const { partId } = params
    const partPayload = await request.validateUsing(createPartValidator)

    try {
      const part = await Part.query().where('id', partId).first()
      if (!part) return response.badRequest({ message: 'Peça Não encontrado' })
      part.price = partPayload.price
      part.description = partPayload.description
      part.nome = partPayload.nome
      part.reference = partPayload.reference
      await part.save()
      return response.status(200).send({ message: 'Actulaizado com sucesso' })
    } catch (error) {
      return response.badRequest({ message: 'Falha ao actualizar peças' })
    }
  }
}
