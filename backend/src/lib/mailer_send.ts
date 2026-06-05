import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import 'dotenv/config'

export const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY!,
})

export async function sendRegisterEmail() {

  const mailerSend = new MailerSend({
    apiKey: process.env.MAILERSEND_DOMAIN!,
  });

  const sentFrom = new Sender("test-eqvygm0xjq5l0p7w.mlsender.net", "SAMP");

  const recipients = [
      new Recipient("sanariesen.dev@gmail.com", "Sanarielsen")
  ];

  const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(sentFrom)
      .setSubject("This is a Subject")
      .setHtml("Greetings from the team, you got this message through MailerSend.")
      .setText("Greetings from the team, you got this message through MailerSend.");

  await mailerSend.email.send(emailParams);
}

