import { Entity, Column, OneToMany, JoinColumn } from 'typeorm'
import { ObjectType, Field, InputType } from 'type-graphql'
import { EntityBase } from './entityBase'
import { Gallery } from './galleryEntity'
import { UserSnsId } from './userSnsIdEntity'
import { type } from 'os'

@Entity('users')
@ObjectType()
@InputType()
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
  @Column({
    type: 'varchar',
    length: 255,
    default: null
  })
  profile: string | null

  @Field(() => [Gallery], { nullable: true })
  // OneToMany第二引数は、gallery側から見た取得方法
  // 両方でeager:trueにすると、N+1で無限ループになる
  @OneToMany(() => Gallery, (gallaries) => gallaries.user, { nullable: true })
  @JoinColumn({ name: 'id' }) // gallariesテーブルの何がキーとして入ってくるのか
  gallaries: Gallery[] | null

  @Field(() => [UserSnsId], { nullable: true })
  snsIds: UserSnsId[] | null
}
