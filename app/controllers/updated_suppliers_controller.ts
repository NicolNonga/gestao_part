import Supplier from '#models/supplier'
import type { HttpContext } from '@adonisjs/core/http'

export default class UpdatedSuppliersController {
  async update({ request, response, params }: HttpContext) {
    const { name, email, address, phoneNumber } = request.only([
      'name',
      'email',
      'address',
      'phoneNumber',
    ])
    const { supplierId } = params

    try {
      const supplierExist = await Supplier.query()
        .where('name', name)
        .where('email', email)
        .whereNot('id', supplierId)
        .first()
      if (supplierExist) return response.badRequest({ message: 'Fornecendo Já existe' })
      await Supplier.query().where('id', supplierId).update({
        name,
        email,
        address,
        phoneNumber,
      })
      return response.status(200).send({ message: 'fornecedor Actualizado' })
    } catch (error) {
      return response.badRequest({ message: 'falha ao actualizar' })
    }
  }
}
