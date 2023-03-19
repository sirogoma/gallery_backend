import { Arg, FieldResolver, ID, Mutation, Query, Resolver, Root } from 'type-graphql'
import { Work } from '../entity/workEntity'
import { WorkUsecase } from '../usecases/workUsecase'
import { Container, Service } from 'typedi'
import { WorkPage } from '../entity/workPageEntity'
import { WorkPageUsecase } from '../usecases/workPageUsecase'

@Service()
@Resolver(() => Work)
export class WorkResolver {
  constructor(private workUsecase: WorkUsecase, private workPageUsecase: WorkPageUsecase) {
    this.workUsecase = Container.get(WorkUsecase)
    this.workPageUsecase = Container.get(WorkPageUsecase)
  }

  @Query(() => [Work])
  async works(
    @Arg('user_id', { nullable: true }) userId?: number,
    @Arg('name', { nullable: true }) name?: string,
    @Arg('is_active', { nullable: true }) isActive?: boolean
  ) {
    return await this.workUsecase.getWorks(userId, name, isActive)
  }

  /**
   * 作品追加
   */
  @Mutation(() => ID)
  async addWork(
    @Arg('userId') userId: number,
    @Arg('gallery_id') galleryId: number,
    @Arg('name') workName: string
  ): Promise<number> {
    // 作品追加して、ギャラリー掲載マスタ更新
    const addWork = await this.workUsecase.addWork(userId, workName, galleryId)
    return addWork.id
  }
}
