import Part from '#models/part'
import type { HttpContext } from '@adonisjs/core/http'

export default class PartDeletesController {
  async delete({ params, response }: HttpContext) {
    const { partId } = params
    const part = await Part.findBy('id', partId)
    if (!part) return response.badRequest({ message: 'Peça Não Encontrada' })
    part.isDeleted = true
    await part.save()
    return response.status(200).send({ message: 'Peça eliminado com sucesso' })
  }
}
