import type { ReactNode } from 'react'

interface LoginShellProps {
  title: string
  children: ReactNode
}

export function LoginShell({ title, children }: LoginShellProps) {
  return (
    <>
      <h1>{title}</h1>
      <main>{children}</main>
    </>
  )
}
