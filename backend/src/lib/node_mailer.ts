import nodemailer from "nodemailer"

export async function sendTestEmail() {

  const testAccount =
    await nodemailer.createTestAccount()

  const transporter =
    nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,

      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    })

  const info =
    await transporter.sendMail({
      from: '"SAMP" <sanarielsen.dev@gmail.com>',
      to: "samuelcarneiro223@gmail.com",

      subject: "Teste",

      text: "Funcionando"
    })

  console.log(
    nodemailer.getTestMessageUrl(info)
  )
}