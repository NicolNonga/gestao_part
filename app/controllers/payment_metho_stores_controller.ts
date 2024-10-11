import PaymentMethod from '#models/payment_method'
import type { HttpContext } from '@adonisjs/core/http'

export default class PaymentMethoStoresController {
  async store({ request, response, auth }: HttpContext) {
    const { description } = request.only(['description'])
    const userId = auth.user?.id

    try {
      if (!description) return response.badRequest({ message: 'descricao obrigatorio' })
      PaymentMethod.create({
        description,
        userId: userId,
      })
      return response.status(200).send({ message: ' Criado Com Sucesso' })
    } catch (error) {
      return response.badRequest({ message: ' Falha ao criar' })
    }
  }
}
