import { FastifyRequest, FastifyReply } from 'fastify'

import { mailerSend } from '@/lib/mailer_send'
import { EmailParams, Recipient, Sender } from 'mailersend'
import { sendTestEmail } from '@/lib/node_mailer'


export async function sendEmail(request: FastifyRequest, reply: FastifyReply) {

  // const sentFrom =
  //   new Sender(
  //     "sanarielsen.dev@gmail.com",
  //     "SAMP"
  //   )

  // const recipients = [
  //   new Recipient(
  //     "samuelcarneiro223@gmail.com",
  //     "Samuel"
  //   )
  // ]

  // const emailParams =
  //   new EmailParams()
  //     .setFrom(sentFrom)
  //     .setTo(recipients)
  //     .setSubject("Teste")
  //     .setText("Funcionando")

  // await mailerSend.email.send(emailParams)

  // sendTestEmail()

  console.log(process.env.MAILERSEND_DOMAIN!)

  console.log(process.env.MAILERSEND_API_KEY!)

  const sentFrom =
    new Sender(
      process.env.MAILERSEND_DOMAIN!,
      "SAMP"
    )

  const recipients = [
    new Recipient(
      "sanarielsen.dev@gmail.com",
      "Samuel Henrique"
    )
  ]

  const emailParams =
    new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject("Teste")
      .setText("Funcionando.")

  try {

    const response =
      await mailerSend.email.send(emailParams)

    console.log(response)

  } catch (error) {
    console.log(error)
  }
}