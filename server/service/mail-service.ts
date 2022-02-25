import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
class MailService {
  private _transporter: nodemailer.Transporter
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    } as SMTPTransport.Options)
  }
  async sendActivationMail(to: string, link: string) {
    await this._transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Activation your email on the Nike Store`,
      html: `
        <div>
          <h2>Thanks for joining the Nike community.</h2>
          <p>You’ve just joined a worldwide team of athletes united by one goal: to push the limits of their potential. Now it’s your turn.</p>
          <span>To activate your email follow the <a href='${link}'>link</a></span>
        </div>
      `,
    })
  }
}

export default new MailService()
