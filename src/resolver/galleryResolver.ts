import { Arg, Ctx, FieldResolver, Int, Mutation, Query, Resolver, Root } from 'type-graphql'
import { Gallery } from '../entity/galleryEntity'
import { GalleryUsecase } from '../usecases/galleryUsecase'
import { Container, Service } from 'typedi'
import { WorkToGalleryUsecase } from '../usecases/workToGalleryUsecase'
import { Work } from '../entity/workEntity'

@Service()
@Resolver(() => Gallery)
export class GalleryResolver {
  constructor(private galleryUsecase: GalleryUsecase, private workToGalleryUsecase: WorkToGalleryUsecase) {
    this.galleryUsecase = Container.get(GalleryUsecase)
    this.workToGalleryUsecase = Container.get(WorkToGalleryUsecase)
  }

  @Query(() => [Gallery])
  async galleries(
    @Arg('id', { nullable: true }) id?: number,
    @Arg('user_id', { nullable: true }) userId?: number,
    @Arg('name', { nullable: true }) name?: string,
    @Arg('theme', { nullable: true }) theme?: number,
    @Arg('is_active', { nullable: true }) isActive?: boolean
  ) {
    return await this.galleryUsecase.getGalleries(id, userId, name, theme, isActive)
  }

  /**
   * ギャラリーに紐付く作品
   */
  @FieldResolver(() => [Work])
  async works(@Root() gallery: Gallery) {
    return await this.workToGalleryUsecase.getWorksByGalleryId(gallery.id)
  }

  /**
   * ギャラリー追加
   */
  @Mutation(() => Gallery)
  async addGallery(@Arg('userId') userId: number, @Arg('name') galleryName: string) {
    return await this.galleryUsecase.addGallery(userId, galleryName)
  }
}
