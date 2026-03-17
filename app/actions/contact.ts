'use server'

import { Resend } from 'resend'
import {
  contactFormSchema,
  type ContactFormValues,
} from '@/lib/validations/contact'

export type ContactFormState =
  | { success: true; message: string }
  | {
      success: false
      message: string
      errors?: Partial<Record<keyof ContactFormValues, string[]>>
    }

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? 'Portfolio <onboarding@resend.dev>'
const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? 'michael@a2zeta.com'

export async function submitContactForm(
  _prevState: ContactFormState | null,
  formData: FormData,
): Promise<ContactFormState> {
  const raw = {
    name: formData.get('name'),
    email: formData.get('email'),
    intent: formData.get('intent'),
    message: formData.get('message'),
  }

  const parsed = contactFormSchema.safeParse(raw)

  if (!parsed.success) {
    const errors: Partial<Record<keyof ContactFormValues, string[]>> = {}
    for (const issue of parsed.error.issues) {
      const path = issue.path[0] as keyof ContactFormValues
      if (!errors[path]) errors[path] = []
      errors[path].push(issue.message)
    }
    return {
      success: false,
      message: 'Please fix the errors below and try again.',
      errors,
    }
  }

  const { name, email, intent, message } = parsed.data

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set')
    return {
      success: false,
      message: 'Email service is not configured. Please try again later.',
    }
  }

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [TO_EMAIL],
    replyTo: email,
    subject: `${intent} – from ${name}`,
    html: `
      <h2>New message from ${name} on your portfolio website!</h2>
      <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
      <p><strong>Intent:</strong> ${intent}</p>
      <h3>Message</h3>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
  })

  if (error) {
    console.error(
      '[Contact form] Resend error:',
      JSON.stringify(error, null, 2),
    )
    return {
      success: false,
      message:
        process.env.NODE_ENV === 'development' && error?.message
          ? `Send failed: ${error.message} (check server logs for details)`
          : '😰 Oh no! It seems I\'ve failed to send your message. So sorry about that! Please try to use my direct email address instead: <a href="mailto:michael@a2zeta.com">michael@a2zeta.com</a>',
    }
  }

  return {
    success: true,
    message: "Thanks so much for reaching out! I'll get back to you soon. 😁",
  }
}
