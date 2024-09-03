import User from '#models/user'
import { SendEmail } from '#services/email/send_email'
import { GenerateRandomPassword } from '#services/random/generate_password'
import { ChangePasswordValidator } from '#validators/change_password'
import { CreateUserValidator, userValidationMessage } from '#validators/create_user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  constructor(
    private readonly randoPassword: GenerateRandomPassword = new GenerateRandomPassword(10),
    private readonly sendEmail: SendEmail = new SendEmail()
  ) {}

  async index({ request, response }: HttpContext) {
    const page = request.input('page')
    const perPage = request.input('perPage')

    const data = await User.query()
      .orderBy('created_at', 'desc')
      .preload('role', (role) => {
        role.preload('permission', (permission) => {
          permission.where('is_active', true)
        })
      })
      .paginate(page | 1, perPage | 10)
    return response.ok(data)
  }

  async store({ request, response }: HttpContext) {
    const userValidation = await request.validateUsing(CreateUserValidator, {
      messagesProvider: userValidationMessage,
    })
    const userPassowrd = this.randoPassword.handle()

    try {
      await User.create({
        ...userValidation,
        phone_number: Number(userValidation.phone_number),
        password: userPassowrd,
      })
      this.sendEmail.send({
        to: userValidation.email,
        subject: 'Password Do Sistema',
        content: `Crendicias para acesso ao sistema de peças ${userPassowrd}`,
      })
      return response.status(200).send({ message: 'Utilizador Criado' })
    } catch (error) {
      return response.badRequest({ message: 'Falha ao cadastrar user', data: error })
    }
  }

  async update({ request, response, params }: HttpContext) {
    const { userId } = params
    const userPayload = await request.validateUsing(CreateUserValidator, {
      messagesProvider: userValidationMessage,
    })
    const user = await User.findBy('id', userId)
    if (!user) return response.badRequest({ message: 'Utilizador Não Encontrado' })
    user.fullName = userPayload.fullName
    user.phone_number = Number(userPayload.phone_number)
    user.email = userPayload.email
    user.roleId = userPayload.roleId

    await user.save()
    return response.ok({ message: 'Utilizadore Actualizado' })
  }

  async changePassword({ request, response, auth }: HttpContext) {
    const { email, newPassword } = await request.validateUsing(ChangePasswordValidator)
    const currentUser = auth.getUserOrFail()
    const token = auth.user?.currentAccessToken.identifier

    if (!token) {
      return response.badRequest({ message: 'token not found' })
    }

    const user = await User.findBy('email', email)
    if (!user) {
      return response.badRequest({ message: 'utilizador não encontrado' })
    }
    user.password = newPassword
    user.first_acess = false

    await user.save()
    await User.accessTokens.delete(currentUser, token)
    return response.status(200).send({ message: 'Palavra-pass Actualizada' })
  }

  async desable({ response, params }: HttpContext) {
    const { userId } = params
    try {
      const user = await User.findBy('id', userId)
      if (!user) return response.badRequest({ message: 'Usuario não encontrado' })
      user.is_active = false
      await user.save()
      return response.status(200).send({ message: 'Usuario desativao' })
    } catch (error) {
      return response.badRequest({ message: 'Falha ao desativar ' })
    }
  }

  async enable({ response, params }: HttpContext) {
    const { userId } = params
    try {
      const user = await User.findBy('id', userId)
      if (!user) return response.badRequest({ message: 'Usuario não encontrado' })
      user.is_active = true
      await user.save()
      return response.status(200).send({ message: 'Uusario Activado' })
    } catch (error) {
      return response.badRequest({ message: 'Falha ao  activar usuario ' })
    }
  }
  async setNewPassword({ response, params }: HttpContext) {
    const { userId } = params
    try {
      const user = await User.findBy('id', userId)
      if (!user) return response.badRequest({ message: 'Usuario nao encontrado' })
      const newPassword = this.randoPassword.handle()
      user.password = newPassword
      await user.save()
      this.sendEmail.send({
        to: user.email,
        content: `A sua palavra-pass vou redefinida para ${newPassword}`,
        subject: 'Palavra-pass redefinida',
      })
      return response.status(200).send({ message: 'Senha redefinida' })
    } catch (error) {
      return response.badRequest({ message: 'falha ao redefinar a senha' })
    }
  }
}
