import Part from '#models/part'
import type { HttpContext } from '@adonisjs/core/http'

export default class PartFindOnesController {
  async findOne({ response, params }: HttpContext) {
    const { partId } = params
    const data = await Part.query()
      .orderBy('created_at', 'desc')
      .where('is_deleted', 0)
      .where('id', partId)
      .preload('typeParts')
      .preload('user')

    return response.ok({ data })
  }
}
