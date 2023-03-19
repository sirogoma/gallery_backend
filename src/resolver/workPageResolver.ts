import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql'
import { WorkPage } from '../entity/workPageEntity'
import { WorkPageUsecase } from '../usecases/workPageUsecase'
import { Container, Service } from 'typedi'

@Service()
@Resolver(() => WorkPage)
export class WorkPageResolver {
  constructor(private workPageUsecase: WorkPageUsecase) {
    this.workPageUsecase = Container.get(WorkPageUsecase)
  }

  /**
   * 作品ページ追加
   */
  @Mutation(() => Int)
  async addWorkPage(@Arg('work_id') workId: number, @Arg('image_url') imageUrl: string, @Arg('sort') sort: number) {
    const result = await this.workPageUsecase.addWorkPage(workId, imageUrl, sort)
    return result.id
  }
}
