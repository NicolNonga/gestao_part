 import PaymentMethod from '#models/payment_method'
import type { HttpContext } from '@adonisjs/core/http'

export default class PaymentMethodListsController {
    async index({request, response}: HttpContext){
      const page = request.input('page')
      const perPage = request.input('perPage')

      const data = await PaymentMethod.query()
      .orderBy('created_at', 'desc')
      .paginate(page | 1, perPage | 10)

      return response.ok(data)
    }
}