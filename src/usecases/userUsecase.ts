import 'reflect-metadata'
import { User } from '../entity/userEntity'
import { AppDataSource } from '../data-source'
import { FindManyOptions } from 'typeorm'
import { Service } from 'typedi'

@Service()
export class UserUsecase {
  /**
   * ユーザー一覧取得
   */
  public async getUsers(id: number, login_id: string, name: string): Promise<User[]> {
    const options: FindManyOptions<any> = {
      where: {
        id: id,
        login_id: login_id,
        name: name
      },
      relations: {
        gallaries: true
      }
    }

    const users: User[] = await AppDataSource.manager.find(User, options)
    return users
  }

  /**
   * ユーザー１件取得
   */
  public async getUserOne(login_id: string, password: string): Promise<User | undefined> {
    const options: FindManyOptions<any> = {
      where: {
        login_id: login_id,
        password: password
      }
    }

    const result = await AppDataSource.manager.findOne(User, options)
    return result
  }

  /**
   * ユーザー追加
   */
  public async userSignup(login_id: string, password: string, name: string): Promise<number> {
    const userRepository = AppDataSource.getRepository(User)
    const newUser = new User()
    newUser.login_id = login_id
    newUser.password = password
    newUser.name = name
    const result = await userRepository.save(newUser)
    return result.id
  }
}
