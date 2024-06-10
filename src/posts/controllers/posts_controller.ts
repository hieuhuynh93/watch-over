import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

import Post from '#models/post'
import { PostsPresenter } from '#presenters/posts_presenter'

export default class PostsController {
  @inject()
  async index({ inertia, request }: HttpContext, presenter: PostsPresenter) {
    const page = request.input('page', 1)
    const posts = await Post.query().preload('user').paginate(page, 10)

    return inertia.render('posts/index', { posts: presenter.toJson(posts) })
  }

  @inject()
  async show({ inertia, params }: HttpContext, presenter: PostsPresenter) {
    const post = await Post.query().preload('user').where('id', params.id).firstOrFail()
    // const post = await Post.findOrFail(params.id)

    return inertia.render('posts/show', { post: presenter.toJson(post) })
  }
}
