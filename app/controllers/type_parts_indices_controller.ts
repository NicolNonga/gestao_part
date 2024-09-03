import type { HttpContext } from '@adonisjs/core/http'
import TypePart from '#models/type_part'

export default class TypePartsIndicesController {
  async index({ request, response }: HttpContext) {
    const page = request.input('page')
    const perPage = request.input('perPage')

    const data = await TypePart.query()
      .orderBy('created_at', 'desc')
      .preload('user')
      .paginate(page | 1, perPage | 10)

    return response.ok(data)
  }
}
