import { AppDataSource } from '../data-source'
import { WorkToGallery } from '../entity/workToGalleryEntity'
import { Service } from 'typedi'
import { FindManyOptions } from 'typeorm'
import { Work } from '../entity/workEntity'

@Service()
export class WorkToGalleryUsecase {
  /**
   * ギャラリーIDから紐付く作品取得
   */
  public async getWorksByGalleryId(galleryId: number): Promise<Work[]> {
    const workToGalleryRepository = AppDataSource.getRepository(WorkToGallery)
    const result: Work[] = await workToGalleryRepository
      .createQueryBuilder()
      .select('work.id,work.user_id,work.name,work.caption,work.is_active')
      .innerJoin('WorkToGallery.works', 'work')
      .where('WorkToGallery.gallery_id = :gallery_id', { gallery_id: galleryId })
      .execute()
    return result
  }

  /**
   * ギャラリーと作品の紐付け
   * @return 新規追加した作品ID
   */
  public async addWorkToGalleryChain(work_id: number, gallery_id: number): Promise<WorkToGallery> {
    const workToGalleryRepository = AppDataSource.getRepository(WorkToGallery)

    /**ギャラリー中での作品並び順 */
    // 同一ギャラリー内でのsortのMAX＋1を返す
    const result = await workToGalleryRepository
      .createQueryBuilder()
      .select('max(sort) + 1 as nextSortNum')
      .where('gallery_id = :gallery_id', { gallery_id: gallery_id })
      .execute()

    let nextSortNum: number = 1
    if (result.length > 0) {
      nextSortNum = result.shift().nextSortNum
    }

    const newWorkToGalleryChain = new WorkToGallery()
    newWorkToGalleryChain.work_id = work_id
    newWorkToGalleryChain.gallery_id = gallery_id
    newWorkToGalleryChain.sort = nextSortNum
    return await workToGalleryRepository.save(newWorkToGalleryChain)
  }
}
