import User from '#models/user'
import { authValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class AuthsController {
  async store({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(authValidator)

    const user = await User.query()
      .preload('role', (role) => {
        role.where('is_actived', true).preload('permission', (permission) => {
          permission.where('is_active', true)
        })
      })
      .where('email', email)
      .first()
    if (!user) return response.abort({ message: 'Email or Senha Invalida' })

    await hash.verify(user.password, password)
    const userFound = await User.verifyCredentials(email, password)

    if (!userFound) return response.abort({ message: 'Email or Senha Invalida' })
    const token = await User.accessTokens.create(userFound)

    return response.status(200).send({ message: 'Login Feito Com Sucesso', data: { token, user } })
  }
  async logout({ response, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const token = auth.user?.currentAccessToken.identifier
    if (!token) {
      return response.badRequest({ message: 'Token Não Encontrado' })
    }
    await User.acessTokens.delete(user, token)
    return response.ok({ message: 'Logged out' })
  }
}
