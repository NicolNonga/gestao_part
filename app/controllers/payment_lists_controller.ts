import Payment from '#models/payment'
import type { HttpContext } from '@adonisjs/core/http'

export default class PaymentListsController {
  async index({ request, response }: HttpContext) {
    const page = request.input('page') | 1
    const perPage = request.input('perPage') | 10

    const data = await Payment.query()
      .orderBy('created_at', 'desc')
      .preload('client')
      .preload('part')
      .preload('paymentMethod')
      .paginate(page, perPage)
    return response.ok(data)
  }
}
