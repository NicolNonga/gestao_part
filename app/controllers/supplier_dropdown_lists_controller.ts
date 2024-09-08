import type { HttpContext } from '@adonisjs/core/http'
import Supplier from '#models/supplier'
export default class SupplierDropdownListsController {
  async dropdown({ response }: HttpContext) {
    const data = await Supplier.query().where('is_actived', true).select('name', 'id')
    return response.ok({ data })
  }
}
