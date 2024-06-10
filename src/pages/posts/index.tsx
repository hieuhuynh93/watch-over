import type { InferPageProps } from '@adonisjs/inertia/types'
import { Link } from '@inertiajs/react'

import PostsController from '#controllers/posts_controller'

export default function PostIndex(props: InferPageProps<PostsController, 'index'>) {
  const { posts } = props

  console.log('posts', posts)
  return (
    <>
      <h1>Posts</h1>
      <ul>
        {posts.data.map((post) => (
          <li key={post.id}>
            {post.title} - {post.user?.fullName}
            <Link href={`/posts/${post.id}`}>Lien</Link>
          </li>
        ))}
      </ul>
    </>
  )
}
