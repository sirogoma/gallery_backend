import { AppDataSource } from '../data-source'
import { FindManyOptions, MoreThan, MoreThanOrEqual } from 'typeorm'
import { WorkPage } from '../entity/workPageEntity'
import { Service } from 'typedi'

@Service()
export class WorkPageUsecase {
  /**
   * 作品ページ取得
   */
  public async getWorkPages(work_id: number): Promise<WorkPage[]> {
    const options: FindManyOptions<any> = {
      where: {
        work_id: work_id
      },
      relations: {
        work: true
      }
    }

    const works: WorkPage[] = await AppDataSource.manager.find(WorkPage, options)
    return works
  }

  /**
   * 作品ページ追加
   * @return 新規追加した作品ID
   */
  public async addWorkPage(work_id: number, image_url: string, sort: number): Promise<WorkPage> {
    const workPageRepository = AppDataSource.getRepository(WorkPage)
    const updateWorkPages = await workPageRepository.find({
      where: {
        sort: MoreThanOrEqual(sort)
      }
    })
    if (updateWorkPages.length > 0) {
      updateWorkPages.map((record) => {
        record.sort = record.sort + 1
      })
      await workPageRepository.save(updateWorkPages)
    }

    const newWorkPage = new WorkPage()
    newWorkPage.work_id = work_id
    newWorkPage.sort = sort
    newWorkPage.image_url = image_url
    return await workPageRepository.save(newWorkPage)
  }
}
