import Client from '#models/client'
import { CreateClientValidator, validationMessage } from '#validators/client'
import type { HttpContext } from '@adonisjs/core/http'

export default class StoreClientesController {
  async store({ request, response, auth }: HttpContext) {
    const userId = auth.user?.id
    const clientPayload = await request.validateUsing(CreateClientValidator, {
      messagesProvider: validationMessage,
    })

    try {
      await Client.create({
        name: clientPayload.name,
        email: clientPayload.email,
        address: clientPayload.address,
        phone_number: clientPayload.phoneNumber,
        userId: userId,
      })
      return response.status(200).send({ message: 'Cliente Criado' })
    } catch (error) {
      console.log(error)
      return response.badRequest({ message: 'falha ao criar cliente', error })
    }
  }
}
