import type { HttpContext } from '@adonisjs/core/http'
import Part from '#models/part'
export default class PartIndexController {
  async index({ request, response }: HttpContext) {
    const page = request.input('page')
    const perPage = request.input('perPage')
    const data = await Part.query()
      .orderBy('created_at', 'desc')
      .where('is_deleted', false)
      .preload('user')
      .preload('typeParts')
      .paginate(page | 1, perPage | 10)

    return response.ok(data)
  }
}
