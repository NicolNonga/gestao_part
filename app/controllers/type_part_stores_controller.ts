import TypePart from '#models/type_part'
import { CreateTypeParts } from '#validators/create_type_part'
import type { HttpContext } from '@adonisjs/core/http'

export default class TypePartStoresController {
  async store({ request, response, auth }: HttpContext) {
    const userId = auth.user?.id
    const typePartPayload = await request.validateUsing(CreateTypeParts)

    try {
      await TypePart.create({
        description: typePartPayload.description ? typePartPayload.description : undefined,
        type: typePartPayload.type,
        userId: userId,
      })
      return response.status(200).send({ message: 'Criado Com Sucesso' })
    } catch (error) {
      return response.badRequest({ message: 'Falha ao  criar tipo de peça' })
    }
  }
}
