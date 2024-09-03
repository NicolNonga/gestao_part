import Role from '#models/role'
import { CreatePermissionValidator, permissionCustomMessage } from '#validators/permission'
import type { HttpContext } from '@adonisjs/core/http'

export default class RolesController {
  async index({ request, response }: HttpContext) {
    const page = request.input('page')
    const perPage = request.input('perPage')

    const data = await Role.query()
      .preload('permission', (permission) => {
        permission.where('is_active', true)
      })
      .paginate(page | 1, perPage | 10)

    return response.ok(data)
  }

  async dropDownList({ response }: HttpContext) {
    const data = await Role.query().where('is_actived', true)
    return response.ok({ data })
  }

  async store({ request, response }: HttpContext) {
    const { name, description } = await request.validateUsing(CreatePermissionValidator, {
      messagesProvider: permissionCustomMessage,
    })

    try {
      await Role.create({
        slug: `${name.replace(/\s+/g, '_')}role`,
        name,
        description: description ? description : undefined,
      })
    } catch (error) {
      return response.badRequest({ message: 'Falha ao cadastra permissao', data: error })
    }
  }
  async enable({ response, params }: HttpContext) {
    const { roleId } = params

    try {
      const role = await Role.findBy('id', roleId)
      if (!role) return response.badRequest({ message: 'Perfil Não Encontrado' })
      role.is_actived = true
      await role.save()
      return response.status(200).send({ messge: 'Perfil desativado' })
    } catch (error) {
      return response.badRequest({ message: 'Falha ao desativar perfil' })
    }
  }
  async desable({ response, params }: HttpContext) {
    const { roleId } = params

    try {
      const role = await Role.findBy('id', roleId)
      if (!role) return response.badRequest({ message: 'Perfil Não Encontrado' })
      role.is_actived = false
      await role.save()
      return response.status(200).send({ messge: 'Perfil desativado' })
    } catch (error) {
      return response.badRequest({ message: 'Falha ao desativar perfil' })
    }
  }
}
