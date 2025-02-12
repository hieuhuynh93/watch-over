import { Head, Link } from '@inertiajs/react'

export default function Home(props: { version: number; user: { name: string } }) {
  console.log(props.user)
  return (
    <>
      <Head title="Homepage" />

      <div className="container">
        <Link href="/login">Login</Link>
        <div className="title">AdonisJS {props.version} x Inertia x React</div>

        <span>
          Learn more about AdonisJS and Inertia.js by visiting the{' '}
          <a href="https://docs.adonisjs.com/guides/inertia">AdonisJS documentation</a>.
        </span>
      </div>
      <p>{props.user ? 'Hello' + props.user.id : 'Not authenticated'}</p>
    </>
  )
}
