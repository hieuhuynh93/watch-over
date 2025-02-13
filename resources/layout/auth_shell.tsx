import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, usePage } from '@inertiajs/react'

import { buttonVariants } from '#components/ui/button'

import { cn } from '#resources/lib/utils'
import Logo from '#resources/assets/brand.svg?react'
import { LanguageSwitch } from '#containers/language_switch'

interface AuthShellProps {
  children: ReactNode
}

export function AuthShell({ children }: AuthShellProps) {
  const { url } = usePage()
  const { t } = useTranslation()

  return (
    <>
      <aside className="md:hidden">
        {/* <img
          src="https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg"
          width={1280}
          height={843}
          alt="Authentication"
          className="block"
        /> */}
      </aside>
      <section className="container relative hidden min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="flex gap-4 absolute right-4 top-4 md:right-8 md:top-8">
          <LanguageSwitch />
          {url === '/login' && (
            <Link href="/signup" className={cn(buttonVariants({ variant: 'ghost' }))}>
              {t('auth.register.title')}
            </Link>
          )}
          {url === '/signup' && (
            <Link href="/login" className={cn(buttonVariants({ variant: 'ghost' }))}>
              {t('auth.login.title')}
            </Link>
          )}
        </div>
        <aside className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <nav className="relative z-20">
            <Link href="/" className="flex items-center text-lg font-medium">
              <Logo className="w-10 h-10 min-w-10 mr-2" />
              WatchOver Comments
            </Link>
          </nav>
          <footer className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and helped me deliver
                stunning designs to my clients faster than ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </footer>
        </aside>
        <article className="lg:p-8">{children}</article>
      </section>
    </>
  )
}
