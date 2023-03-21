import { AppDataSource } from '../data-source'
import { FindManyOptions } from 'typeorm'
import { Gallery } from '../entity/galleryEntity'
import { Service } from 'typedi'

@Service()
export class GalleryUsecase {
  public async getGalleries(id?: number, user_id?: number, name?: string, theme_id?: number, is_active?: boolean) {
    const options: FindManyOptions<Gallery> = {
      where: {
        id: id,
        user_id: user_id,
        name: name,
        theme_id: theme_id,
        is_active: is_active
      },
      relations: {
        user: true
      }
    }

    const gallaries: Gallery[] = await AppDataSource.manager.find(Gallery, options)
    return gallaries
  }

  /**
   * gallery追加
   * @return 新規追加したギャラリーID
   */
  public async addGallery(user_id: number, name: string): Promise<Gallery> {
    const userRepository = AppDataSource.getRepository(Gallery)
    const newGallery = new Gallery()
    newGallery.user_id = user_id
    newGallery.name = name
    const result = await userRepository.save(newGallery)
    return result
  }
}
