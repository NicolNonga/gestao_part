import PaymentMethod from '#models/payment_method'
import type { HttpContext } from '@adonisjs/core/http'

export default class PaymentMethoStoresController {
  async store({ request, response }: HttpContext) {
    const { description } = request.only(['description'])

    try {
      if (!description) return response.badRequest({ message: 'descricao obrigatorio' })
      PaymentMethod.create({
        description,
      })
      return response.status(200).send({ message: ' Criado Com Sucesso' })
    } catch (error) {
      return response.badRequest({ message: ' Falha ao criar' })
    }
  }
}
