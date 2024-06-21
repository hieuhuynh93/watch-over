import { FormEvent } from 'react'
import { useForm } from '@inertiajs/react'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

import { Label } from '#components/ui/label'
import { Input } from '#components/ui/input'
import { Button } from '#components/ui/button'
import { Loader } from '#components/ui/loader'

import GoogleIcon from '#resources/assets/logo/google.svg'
import { tuyau } from '#resources/core/tuyau'
import { AuthShell } from '#resources/layout/auth_shell'
import { cn } from '#resources/lib/utils'
import { Alert, AlertDescription } from '#components/ui/alert'

export default function LoginPage({}) {
  const { errors, post, processing } = useForm({
    email: '',
    password: '',
    remember: false,
  })

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    post(tuyau.$url('auth.login'))
  }

  return (
    <AuthShell>
      <div className={cn('grid gap-6')}>
        <form action="" method="POST" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              {errors.email && (
                <Alert variant="destructive" className="mb-4">
                  <ExclamationTriangleIcon className="h-4 w-4" />
                  <AlertDescription>{errors.email}</AlertDescription>
                </Alert>
              )}
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={processing}
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
        <Button variant="outline" type="button" disabled={processing}>
          {processing ? (
            <Loader className="mr-2 h-4 w-4" />
          ) : (
            <img src={GoogleIcon} className="mr-2 h-4 w-4" />
          )}
          Google
        </Button>
      </div>
    </AuthShell>
  )
}
