import { FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Head, useForm, usePage, Link } from '@inertiajs/react'
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
import { Badge } from '#components/ui/badge'

export default function AdminPage() {
  const { t } = useTranslation()
  const {
    props: { alert },
  } = usePage()

  const { errors, post, processing, data, setData } = useForm({
    email: '',
    password: '',
    remember: false,
  })

  function handleSubmit(ev: FormEvent) {
    if (processing) return

    ev.preventDefault()
    post(tuyau.$url('auth.login'))
  }

  return (
    <AuthShell>
      <Head>
        <title>{t('auth.login.title')}</title>
        <meta head-key="description" name="description" content={t('auth.login.description')} />
      </Head>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:max-w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">{t('auth.login.connection')}</h1>
          <p className="text-sm text-muted-foreground">{t('auth.login.description')}</p>
        </div>
        <div className={cn('grid gap-6')}>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <form method="POST" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <div className="grid gap-1">
                {!!alert && (
                  <Alert variant="destructive" className="mb-4">
                    <ExclamationTriangleIcon className="h-4 w-4" />
                    <AlertDescription>
                      {t(`alerts.${(alert as { code: string }).code}`)}
                    </AlertDescription>
                  </Alert>
                )}
                <Label htmlFor="email">{t('auth.fields.email')}</Label>
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
                <Label htmlFor="password">{t('auth.fields.password')}</Label>
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
              <Button disabled={processing} className="mt-3">
                {processing && <Loader />}
                {t('auth.signup')}
              </Button>
            </div>
          </form>
        </div>
        <div>
          <p className="mt-10 -mb-10 px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{' '}
            <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </AuthShell>
  )
}
