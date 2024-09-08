import InventoryMoviment from '#models/inventory_moviment'
import Stock from '#models/stock'
import { createStockValidator } from '#validators/stock_create'
import type { HttpContext } from '@adonisjs/core/http'

export default class StockStoresController {
  async store({ request, response }: HttpContext): Promise<any> {
    const stockPayload = await request.validateUsing(createStockValidator)

    try {
      // first we should see if there as part in the system already
      const partInStock = await Stock.query()
        .where('partId', stockPayload.partId)
        .where('supplieId', stockPayload.supplieId)
        .first()
      if (partInStock) {
        partInStock.quantity = partInStock.quantity + stockPayload.quantity
        await partInStock.save()
        await InventoryMoviment.create({
          stockId: partInStock.id,
          moviment_type: 'IN',
          quantity: stockPayload.quantity,
          supplieId: stockPayload.supplieId,
        })
        return response.status(200).send({ message: 'Stock Actualizado Com Sucesso' })
      }
      const stock = await Stock.create(stockPayload)
      await InventoryMoviment.create({
        stockId: stock.id,
        moviment_type: 'IN',
        quantity: stockPayload.quantity,
        supplieId: stockPayload.supplieId,
      })
      return response.status(200).send({ message: 'Stock Criado com Sucesso' })
    } catch (error) {
      return response.badRequest({ message: 'falha oa criar stock' })
    }
  }
}
