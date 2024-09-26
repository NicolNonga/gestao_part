import TypePart from '#models/type_part'
import type { HttpContext } from '@adonisjs/core/http'

export default class UpdateTypePartsController {
  async update({ request, response, params }: HttpContext) {
    const { type, description } = request.only(['type', 'description'])
    console.log(type, description)
    const { typeId } = params

    try {
      const typeExist = await TypePart.query().where('type', type).whereNot('id', typeId).first()
      if (typeExist) return response.badRequest({ message: 'Tipo Já cadastrado' })
      await TypePart.query().where('id', typeId).update({ type, description })
      return response.status(200).send({ message: 'Tipo Actualizado Com Sucesso' })
    } catch (error) {
      response.badRequest({ message: 'Falha ao Actualizar' })
      console.error(error)
    }
  }
}
