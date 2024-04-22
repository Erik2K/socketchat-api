import { Resend } from 'resend';

const { RESEND_API_KEY, RESEND_SENDER } = process.env
const resend = new Resend(RESEND_API_KEY)

export const sendMail = async (to, subject, html) => {
  resend.emails.send({
    from: RESEND_SENDER,
    to,
    subject,
    html
  })
}
