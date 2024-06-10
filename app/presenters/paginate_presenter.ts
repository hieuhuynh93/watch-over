import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

export class PaginatePresenter {
  constructor(private paginatePresenter: PaginatePresenter) {}

  toJson(posts: ModelPaginatorContract<any>) {
    return {
      meta: this.paginatePresenter,
    }
  }
}
