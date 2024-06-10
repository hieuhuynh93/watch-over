import { LoginShell } from '#resources/components/auth/login_shell'

export default function LoginPage() {
  return (
    <LoginShell title="Login">
      <form action="" method="POST">
        <label htmlFor="email">Email</label>
        <input type="text" name="email" placeholder="Email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" placeholder="Password" />
        <input type="submit" value="Login" />
      </form>
    </LoginShell>
  )
}
