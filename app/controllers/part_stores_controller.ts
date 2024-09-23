import Part from '#models/part'
import { createPartValidator } from '#validators/part_validator_create'
import type { HttpContext } from '@adonisjs/core/http'
import { cuid } from '@adonisjs/core/helpers'
import app from '@adonisjs/core/services/app'

export default class PartStoresController {
  async store({ request, response, auth }: HttpContext) {
    const userId = auth.user?.id
    const partPayload = await request.validateUsing(createPartValidator)
    const file = request.file('file', { extnames: ['jpg', 'png', 'jpeg'] })
    console.log(file)
    const fileName = `${cuid()}.${file?.extname}`

    try {
      await file?.move(app.makePath('storage/updloads'), {
        name: fileName,
      })
      await Part.create({
        userId,
        nome: partPayload.nome,
        reference: partPayload.reference,
        typePartId: partPayload.type_part_id,
        description: partPayload.description,
        price: partPayload.price,
        fileName,
      })

      return response.status(200).send({ message: 'Cadastrado' })
    } catch (error) {
        console.error(error)
      return response.badRequest({ message: 'Falha ao cadastra peça' })
    }
  }
}
