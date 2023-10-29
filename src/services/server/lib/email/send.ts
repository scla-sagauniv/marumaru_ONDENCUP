import nodemailer from 'nodemailer'

export default async function sendEmail({
  tos,
  subject,
  body,
}: {
  tos: string[]
  subject: string
  body: string
}) {
  const mail = process.env.MAIL_ADDRESS
  const pass = process.env.MAIL_PASSWORD

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: mail,
      pass: pass,
    },
  })

  const info = await transporter.sendMail({
    from: mail,
    to: tos,
    subject: subject,
    html: body,
  })

  console.log('Message sent: %s', info.response)
  console.log('finish')
}
