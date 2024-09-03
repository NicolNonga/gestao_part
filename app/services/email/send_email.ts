import env from '#start/env'
import NodeMailer from 'nodemailer'
// eslint-disable-next-line @typescript-eslint/naming-convention
interface emailInterface {
  to: string
  subject: string
  content: string
}

export class SendEmail {
  private TRASPORTER = NodeMailer.createTransport({
    host: env.get('HOST_EMAIL'),
    port: env.get('PORT_EMAIL'),
    secure: false,
    auth: {
      user: env.get('USER_EMAIL'),
      pass: env.get('PASSWORD_EMAIL'),
    },
  })

  async send(emailProps: emailInterface) {
    console.log(env.get('PASSWORD_EMAIL'))

    try {
      this.TRASPORTER.sendMail({
        from: env.get('USER_EMAIL'),
        to: emailProps.to,
        subject: emailProps.subject,
        text: emailProps.content,
      })
    } catch (error) {
      console.log('falha', error)
    }
  }
}
