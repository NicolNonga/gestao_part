import Supplier from '#models/supplier'
import { CreateSupplierValidator } from '#validators/create_supplier'
import type { HttpContext } from '@adonisjs/core/http'

export default class SupplierStoresController {
  async store({ request, response }: HttpContext) {
    const supplierPayload = await request.validateUsing(CreateSupplierValidator)
    try {
      await Supplier.create({
        name: supplierPayload.name,
        email: supplierPayload.email,
        address: supplierPayload.address ? supplierPayload.address : undefined,
      })
      return response.status(200).send({ message: 'Fornecedor Criado Com Sucesso' })
    } catch (error) {
      return response.badRequest({ message: 'Falha ao Cadastra Fornecedor' })
    }
  }
}
