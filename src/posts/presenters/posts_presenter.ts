import { Post } from '../models/post'

import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

export class PostsPresenter {
  toJson(posts: ModelPaginatorContract<Post>) {
    const meta = posts.getMeta()

    return {
      meta: {
        total: meta.total,
        perPage: meta.perPage,
        currentPage: meta.currentPage,
        lastPage: meta.lastPage,
        firstPage: meta.firstPage,
        firstPageUrl: meta.firstPageUrl,
        lastPageUrl: meta.lastPageUrl,
        nextPageUrl: meta.nextPageUrl,
        previousPageUrl: meta.previousPageUrl,
      },
      data: posts.all().map((post) => ({
        id: post.id,
        title: post.title,
        content: post.content,
        slug: post.slug,
        user: post.user,
        timeAgo: post.createdAt.toRelative(),
        createdAt: post.createdAt.toISO(),
        updatedAt: post.updatedAt.toISO(),
      })),
    }
  }
}
