import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm'
import { ObjectType, Field, Int } from 'type-graphql'
import { EntityBase } from './entityBase'
import { User } from './userEntity'
import { Sns } from './snsEntity'

@Entity('user_sns_ids')
@ObjectType()
export class UserSnsId extends EntityBase {
  @Field(() => String, { nullable: false })
  @Column()
  user_id: string

  @Field(() => String, { nullable: false })
  @Column()
  use_sns_id: string

  @Field(() => String, { nullable: false })
  @Column()
  sns_user_id: string

  @ManyToOne(() => User, (user) => user.snsIds)
  @JoinColumn({ name: 'user_id' })
  user: User

  @ManyToOne(() => Sns, (sns) => sns.id)
  @JoinColumn({ name: 'id' })
  snss: Sns[]
}
