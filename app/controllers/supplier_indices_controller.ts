import Supplier from '#models/supplier'
import type { HttpContext } from '@adonisjs/core/http'

export default class SupplierIndexController {
  async index({ request, response }: HttpContext) {
    const page = request.input('page') | 1
    const perPage = request.input('perPage') | 10

    const data = await Supplier.query().orderBy('created_at', 'desc').paginate(page, perPage)
    return response.ok(data)
  }
}
