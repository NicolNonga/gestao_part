import type { HttpContext } from '@adonisjs/core/http'
import TypePart from '#models/type_part'
export default class TypePartDropdownsController {
  async index({ response }: HttpContext) {
    const data = await TypePart.query().select('id', 'type').orderBy('created_at', 'desc')
    return response.ok({ data })
  }
}
