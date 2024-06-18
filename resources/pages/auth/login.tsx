import { FormEvent } from 'react'
import { Link, useForm, usePage, useRemember } from '@inertiajs/react'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

import { Label } from '#components/ui/label'
import { Button, buttonVariants } from '#components/ui/button'
import { Loader } from '#components/ui/loader'

import { Input } from '#containers/ui/input'

import GoogleIcon from '#resources/assets/logo/google.svg'
import { tuyau } from '#resources/core/tuyau'
import { AuthShell } from '#resources/layout/auth_shell'
import { cn } from '#resources/lib/utils'
import { Alert, AlertDescription } from '#components/ui/alert'

export default function LoginPage() {
  const { t } = useRemember
  const {
    props: { alert },
  } = usePage()
  // const { alert: { message: string }, ...rest } = props

  const { errors, post, processing, data, setData } = useForm({
    email: '',
    password: '',
    remember: false,
  })

  function handleSubmit(ev: FormEvent) {
    ev.preventDefault()

    if (processing) return
    post(tuyau.$url('auth.login'))
  }

  return (
    <AuthShell>
      <div className={cn('grid gap-6')}>
        <form method="POST" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              {!!alert && (
                <Alert variant="destructive" className="mb-4">
                  <ExclamationTriangleIcon className="h-4 w-4" />
                  <AlertDescription>{t((alert as { code: string }).code)}</AlertDescription>
                </Alert>
              )}
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={processing}
                {...{ data, setData, errors }}
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="password">Password</Label>
              <Input
                name="password"
                placeholder="********"
                type="password"
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect="off"
                disabled={processing}
                {...{ data, setData, errors }}
              />
            </div>
            <Button disabled={processing}>
              {processing && <Loader />}
              Sign In with Email
            </Button>
          </div>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        <a
          href="/google/redirect"
          disabled={processing}
          className={cn(buttonVariants({ variant: 'outline' }))}
        >
          {processing ? (
            <Loader className="mr-2 h-4 w-4" />
          ) : (
            <>
              <img src={GoogleIcon} className="mr-2 h-4 w-4" />
              Google
            </>
          )}
        </a>
        <div className="dropdown" x-show="open">
          <form method="POST" action="{{ route('language.update', [locale]) }}">
            <button type="submit">
              {/* {{ t(`messages.languages.${locale}`) }} ({{ locale }}) */}
            </button>
          </form>
        </div>
      </div>
    </AuthShell>
  )
}
