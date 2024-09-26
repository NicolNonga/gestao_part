import Part from '#models/part'
import type { HttpContext } from '@adonisjs/core/http'

export default class AllPartsController {
  async index({ response }: HttpContext) {
    const data = await Part.query()
      .orderBy('created_at', 'desc')
      .where('is_deleted', false)
      .preload('user')
      .preload('typeParts')

      console.log(data)

    return response.ok(data)
  }
}
