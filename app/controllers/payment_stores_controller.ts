 import Payment from '#models/payment'
import { paymentValidator } from '#validators/payment_store'
import type { HttpContext } from '@adonisjs/core/http'

export default class PaymentStoresController {
  
   async store({request, response, auth}: HttpContext){
    const paymentPayload = await request.validateUsing(paymentValidator)

    try {
       await Payment.create({
        clientId: paymentPayload.client_id,
        partId: paymentPayload.part_id,
        paymentMethodId: paymentPayload.payment_method_id,
        amount : paymentPayload.amount
       })
       return response.status(200).send({message: "Pagamento Feito"})
    } catch (error) {
      return response.badRequest({message:  'Falha ao Cadastrar Pagamento', error})
      
    }
   }
}