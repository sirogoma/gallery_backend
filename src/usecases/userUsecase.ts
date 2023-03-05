import 'reflect-metadata'
import { User } from '../entity/userEntity'
import { AppDataSource } from '../data-source'
import { FindManyOptions } from 'typeorm'
import { Service } from 'typedi'

@Service()
export class UserUsecase {
  public async getUsers(options?: FindManyOptions): Promise<User[]> {
    const users: User[] = await AppDataSource.manager.find(User, options)
    return users
  }

  public async getUserOne(options?: FindManyOptions): Promise<User | undefined> {
    const result = await AppDataSource.manager.findOne(User, options)
    return result
  }
}
