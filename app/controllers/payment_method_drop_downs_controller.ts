import PaymentMethod from '#models/payment_method'
import type { HttpContext } from '@adonisjs/core/http'

export default class PaymentMethodDropDownsController {

   async index({response}: HttpContext){
     const data = await PaymentMethod.query().select('id','description').orderBy('created_at', 'desc')
     return response.ok({data})
   }
}