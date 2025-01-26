import User from '#models/user'
import { SendEmail } from '#services/email/send_email'
import { GenerateRandomPassword } from '#services/random/generate_password'
import type { HttpContext } from '@adonisjs/core/http'

export default class ResetPasswordsController {
  constructor(
    private readonly sendEmail: SendEmail = new SendEmail(),
    private readonly randoPassword: GenerateRandomPassword = new GenerateRandomPassword(10)
  ) {}
  async store({ request, response }: HttpContext) {
    const { email } = request.only(['email'])

    const userPassword = this.randoPassword.handle()
    const userExist = await User.query().where('email', email).first()

    if (!userExist) return response.badRequest({ message: 'Email Não Encontrado' })
    userExist.password = userPassword

    await userExist.save()
    this.sendEmail.send({
      to: email,
      subject: 'Nova Senha',
      content: `Nova Senha Solicitada ${userPassword}`,
    })

    return response.ok({ message: 'Nova Password Enviada' })
  }
}
