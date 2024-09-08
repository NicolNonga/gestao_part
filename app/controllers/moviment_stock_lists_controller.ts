import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class MovimentStockListsController {
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 10)

    const data = await db
      .from('parts as p')
      .innerJoin('stocks as s', 'p.id', 's.part_id')
      .leftJoin('inventory_moviments as im', 's.id', 'im.stock_id')
      .select([
        'p.nome',
        db.raw(`
        IFNULL(
          SUM(CASE
            WHEN im.moviment_type IN ('IN') THEN im.quantity
            WHEN im.moviment_type IN ('OUT') THEN -im.quantity
            ELSE 0
          END), 0
        ) AS CurrentStock
      `),
      ])
      .groupBy('p.id', 'p.nome')
      .orderBy('p.nome', 'asc')
      .paginate(page, perPage)

    return response.ok(data)
  }
}
