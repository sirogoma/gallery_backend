import { AppDataSource } from '../data-source'
import { FindManyOptions } from 'typeorm'
import { Work } from '../entity/workEntity'
import Container, { Service } from 'typedi'
import { WorkToGalleryUsecase } from '../usecases/workToGalleryUsecase'

@Service()
export class WorkUsecase {
  public async getWorks(user_id: number, name: string, is_active: boolean) {
    const options: FindManyOptions<Work> = {
      where: {
        user_id: user_id,
        name: name,
        is_active: is_active
      },
      relations: {
        workPages: true
      }
    }

    const works: Work[] = await AppDataSource.manager.find(Work, options)
    return works
  }

  /**
   * 作品追加
   */
  public async addWork(user_id: number, name: string, gallery_id: number): Promise<Work> {
    const workRepository = AppDataSource.getRepository(Work)
    const newWork = new Work()
    newWork.user_id = user_id
    newWork.name = name
    const addWorkResult = await workRepository.save(newWork)

    // ギャラリー掲載マスタの更新
    const workToGalleryUsecase = Container.get(WorkToGalleryUsecase)
    await workToGalleryUsecase.addWorkToGalleryChain(addWorkResult.id, gallery_id)

    return addWorkResult
  }
}
