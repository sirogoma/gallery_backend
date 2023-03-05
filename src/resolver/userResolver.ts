import 'reflect-metadata'
import { Arg, Query, Resolver } from 'type-graphql'
import { User } from '../entity/userEntity'
import { UserUsecase } from '../usecases/userUsecase'
import { Service, Container } from 'typedi'

@Service()
@Resolver(() => User)
export class UserResolver {
  constructor(private userUsecase: UserUsecase) {
    this.userUsecase = Container.get(UserUsecase)
  }

  @Query(() => [User])
  async users(
    @Arg('id') id?: number,
    @Arg('login_id', { nullable: true }) login_id?: string,
    @Arg('name', { nullable: true }) name?: string
  ) {
    const result = await this.userUsecase.getUsers({
      where: {
        id: id,
        login_id: login_id,
        name: name
      },
      relations: {
        gallaries: true
      }
    })
    return result
  }

  /**ログイン認証 */
  @Query(() => Boolean)
  async tryLoginAuth(
    @Arg('login_id', { nullable: false }) login_id: string,
    @Arg('password', { nullable: false }) password: string
  ) {
    const result = await this.userUsecase.getUserOne({
      where: {
        login_id: login_id,
        password: password
      }
    })

    return result ? true : false
  }
}
