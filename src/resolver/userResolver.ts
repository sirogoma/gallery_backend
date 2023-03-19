import 'reflect-metadata'
import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql'
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
    const result = await this.userUsecase.getUsers(id, login_id, name)
    return result
  }

  /**ユーザー登録 */
  @Mutation(() => Int)
  async userSignup(@Arg('login_id') login_id: string, @Arg('password') password: string, @Arg('name') name: string) {
    return await this.userUsecase.userSignup(login_id, password, name)
  }

  /**ログイン認証 */
  @Query(() => Boolean)
  async tryLoginAuth(
    @Arg('login_id', { nullable: false }) login_id: string,
    @Arg('password', { nullable: false }) password: string
  ) {
    const result = await this.userUsecase.getUserOne(login_id, password)

    return result ? true : false
  }
}
