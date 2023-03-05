import { Arg, Query, Resolver } from 'type-graphql'
import { Gallary } from '../entity/gallaryEntity'
import { GalleryUsecase } from '../usecases/galleryUsecase'
import { Container, Service } from 'typedi'

@Service()
@Resolver(() => Gallary)
export class GallaryResolver {
  constructor(private galleryUsecase: GalleryUsecase) {
    this.galleryUsecase = Container.get(GalleryUsecase)
  }

  @Query(() => [Gallary])
  async gallaries(
    @Arg('id', { nullable: true }) id?: number,
    @Arg('name', { nullable: true }) name?: string,
    @Arg('theme', { nullable: true }) theme?: number,
    @Arg('is_active', { nullable: true }) is_active?: boolean
  ) {
    return await this.galleryUsecase.getGallaries({
      where: {
        id: id,
        name: name,
        theme: theme,
        is_active: is_active
      },
      relations: {
        user: true
      }
    })
  }
}
