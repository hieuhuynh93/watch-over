import Post from '#models/post'

export class PostPresenter {
  toJson(post: Post) {
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      slug: post.slug,
      user: {
        id: post.user.id,
        fullNname: post.user.fullName,
      },
      timeAgo: post.createdAt.toRelative(),
      createdAt: post.createdAt.toISO(),
      updatedAt: post.updatedAt.toISO(),
    }
  }
}
