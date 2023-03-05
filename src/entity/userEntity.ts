import { Entity, Column, OneToMany, JoinColumn, JoinTable, RelationId } from 'typeorm'
import { ObjectType, Field } from 'type-graphql'
import { EntityBase } from './entityBase'
import { Gallary } from './gallaryEntity'
import { UserSnsId } from './userSnsIdEntity'

@Entity('users')
@ObjectType()
export class User extends EntityBase {
  @Field(() => String, { nullable: false })
  @Column()
  login_id: string

  @Field(() => String, { nullable: false })
  @Column()
  password: string

  @Field(() => String, { nullable: false })
  @Column()
  name: string

  @Field(() => String, { nullable: true })
  @Column()
  profile?: string

  @Field(() => [Gallary] || null)
  // OneToMany第二引数は、Gallary側から見た取得方法
  // 両方でeager:trueにすると、N+1で無限ループになる
  @OneToMany(() => Gallary, (gallaries) => gallaries.user, { nullable: true })
  @JoinColumn({ name: 'id' }) // gallariesテーブルの何がキーとして入ってくるのか
  gallaries: Gallary[] | null

  @Field(() => [UserSnsId], { nullable: true })
  snsIds: UserSnsId[] | null
}
