import { FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Head, useForm, usePage, Link } from '@inertiajs/react'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

import { Label } from '#components/ui/label'
import { Button } from '#components/ui/button'
import { Loader } from '#components/ui/loader'

import { Input } from '#containers/ui/input'

import { tuyau } from '#resources/core/tuyau'
import { AuthShell } from '#resources/layout/auth_shell'
import { cn } from '#resources/lib/utils'
import { Alert, AlertDescription } from '#components/ui/alert'

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
    console.log('ev', ev, data)

    ev.preventDefault()
    post(tuyau.$url('login.admin.post'))
  }

  return (
    <>
      <Head>
        <title>{t('auth.login.title')}</title>
        <meta head-key="description" name="description" content={t('auth.login.description')} />
      </Head>
      <div className="mx-auto flex w-full min-h-screen flex-col justify-center space-y-6 sm:max-w-[350px]">
        <h1 className="text-2xl text-center font-semibold tracking-tight">
          {t('auth.login.connection')}
        </h1>
        <div className={cn('grid gap-6')}>
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
                {t('auth.login.title')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
