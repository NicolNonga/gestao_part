import Stock from '#models/stock'
import type { HttpContext } from '@adonisjs/core/http'

export default class StockIndexController {
  async index({ request, response }: HttpContext) {
    const page = request.input('page') | 1
    const perPage = request.input('perPage') | 10

    const data = await Stock.query()
      .orderBy('created_at', 'desc')
      .preload('part')
      .preload('supplier')
      .paginate(page, perPage)

    return response.ok(data)
  }
}
