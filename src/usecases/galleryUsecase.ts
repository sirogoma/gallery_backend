import { AppDataSource } from '../data-source'
import { FindManyOptions } from 'typeorm'
import { Gallary } from '../entity/gallaryEntity'
import { Service } from 'typedi'

@Service()
export class GalleryUsecase {
  public async getGallaries(options?: FindManyOptions) {
    const gallaries: Gallary[] = await AppDataSource.manager.find(Gallary, options)
    return gallaries
  }
}
