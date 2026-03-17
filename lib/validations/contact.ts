import { z } from 'zod'

export const CONTACT_INTENT_OPTIONS = [
  'Employment Opportunity',
  'Freelance / Contract Work',
  'Consulting / Advisory Services',
  'Just saying hello!',
  'Other',
] as const

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, "Well howdy there! 🤠 My name is Michael, what's yours?")
    .max(
      120,
      "Whoa there! That's a long name. Name must be 120 characters or fewer. Maybe you have a nickname? 😅",
    )
    .regex(
      /^[a-zA-Z\s]+$/,
      'Sorry, but this name makes it difficult for me to respond to you. 😕 Please, for now, your name can only contain letters and spaces—no numbers or symbols.',
    ),
  email: z
    .string()
    .min(
      1,
      'I know, I know... but I need your email address to respond to you! 😅',
    )
    .email('Please enter a valid email address'),
  intent: z
    .enum(CONTACT_INTENT_OPTIONS)
    .default('Just saying hello!')
    .optional(),
  message: z
    .string()
    .min(1, 'Some sort of message or inquiry is required, silly! 😁')
    .max(5000, 'Message must be 5000 characters or fewer.'),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>
