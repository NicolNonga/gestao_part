import Permission from '#models/permission'
import { CreatePermissionValidator, permissionCustomMessage } from '#validators/permission'
import type { HttpContext } from '@adonisjs/core/http'

export default class PermissionsController {
  async index({ request, response }: HttpContext) {
    const page = request.input('page')
    const perPage = request.input('perPage')

    const data = await Permission.query()
      .orderBy('createdAt', 'desc')
      .paginate(page | 1, perPage | 10)

    return response.ok(data)
  }
  async store({ request, response }: HttpContext) {
    const { name, description } = await request.validateUsing(CreatePermissionValidator, {
      messagesProvider: permissionCustomMessage,
    })

    try {
      await Permission.create({
        slug: `${name.replace(/\s+/g, '_')}_permission`,
        name,
        description: description ? description : undefined,
      })

      return response.status(200).send({ message: 'Permissoa Criado com sucesso' })
    } catch (error) {
      return response.badRequest({ message: 'Falha ao cadastra permissao', data: error })
    }
  }

  async desable({ response, params }: HttpContext) {
    const { permissionId } = params
    try {
      const permission = await Permission.findByOrFail('id', permissionId)
      permission.is_active = false
      await permission.save()
      return response.status(200).send({ message: 'Permissoa Desativada' })
    } catch (error) {
      return response.badRequest({ message: 'Permissao nao encontrada', data: error })
    }
  }

  async enable({ response, params }: HttpContext) {
    const { permissionId } = params

    try {
      const permission = await Permission.findBy('id', permissionId)
      if (!permission) return response.badRequest({ message: 'Permissao não encontrado' })
      permission.is_active = true
      await permission.save()
    } catch (error) {}
  }
}
