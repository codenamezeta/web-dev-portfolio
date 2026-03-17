'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import {
  contactFormSchema,
  CONTACT_INTENT_OPTIONS,
  type ContactFormValues,
} from '@/lib/validations/contact'
import { submitContactForm, type ContactFormState } from '@/app/actions/contact'
import { cn } from '@/lib/utils'
import { useEffect, startTransition } from 'react'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      disabled={pending}
      size="lg"
      className="min-h-11 min-w-[140px]"
      aria-busy={pending}
    >
      {pending ? (
        <>
          <Loader2
            className="animate-spin"
            data-icon="inline-start"
            aria-hidden
          />
          Sending…
        </>
      ) : (
        'Send message'
      )}
    </Button>
  )
}

export function ContactForm() {
  const [state, formAction] = useActionState<ContactFormState | null, FormData>(
    submitContactForm,
    null
  )

  const {
    register,
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      intent: undefined,
      message: '',
    },
  })

  useEffect(() => {
    if (state?.success === true) {
      reset()
    }
  }, [state?.success, reset])

  useEffect(() => {
    if (state?.success === false && state.errors) {
      for (const [field, messages] of Object.entries(state.errors)) {
        if (messages?.[0]) {
          setError(field as keyof ContactFormValues, {
            type: 'server',
            message: messages[0],
          })
        }
      }
    }
  }, [state, setError])

  const onSubmit = (data: ContactFormValues) => {
    const formData = new FormData()
    formData.set('name', data.name)
    formData.set('email', data.email)
    formData.set('intent', data.intent ?? 'Just saying hello!')
    formData.set('message', data.message)
    startTransition(() => {
      formAction(formData)
    })
  }

  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit(onSubmit)(e)
      }}
      className="flex flex-col gap-5"
      noValidate
    >
      {state?.message && (
        <div
          role="alert"
          className={cn(
            'rounded-lg border px-3 py-2.5 text-sm',
            state.success
              ? 'border-primary/30 bg-primary/10 text-foreground'
              : 'border-destructive/30 bg-destructive/10 text-destructive'
          )}
        >
          {state.message}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-name">Name</Label>
        <Input
          id="contact-name"
          type="text"
          placeholder="Your name"
          autoComplete="name"
          aria-invalid={!!errors.name}
          {...register('name')}
        />
        {errors.name && (
          <p className="text-sm text-destructive" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-email">Email</Label>
        <Input
          id="contact-email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          aria-invalid={!!errors.email}
          {...register('email')}
        />
        {errors.email && (
          <p className="text-sm text-destructive" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-intent">Intent</Label>
        <Controller
          name="intent"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value ?? ''}
              onValueChange={field.onChange}
              required
            >
              <SelectTrigger
                id="contact-intent"
                className="w-full"
                aria-invalid={!!errors.intent}
              >
                <SelectValue placeholder="Select an option…" />
              </SelectTrigger>
              <SelectContent>
                {CONTACT_INTENT_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.intent && (
          <p className="text-sm text-destructive" role="alert">
            {errors.intent.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          placeholder="Tell me about your project or just say hi…"
          rows={5}
          aria-invalid={!!errors.message}
          {...register('message')}
        />
        {errors.message && (
          <p className="text-sm text-destructive" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      <SubmitButton />
    </form>
  )
}
