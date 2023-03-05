import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm'
import { ObjectType, Field, Int } from 'type-graphql'
import { EntityBase } from './entityBase'
import { User } from './userEntity'
import { WorkToGallary } from './workToGallaryEntity'

@Entity('galleries')
@ObjectType()
export class Gallary extends EntityBase {
  @Field(() => Int, { nullable: false })
  @Column()
  user_id: number

  @Field(() => String, { nullable: false })
  @Column()
  name: string

  @Field(() => Int, { nullable: false })
  @Column()
  theme_id: number

  @Field(() => Boolean, { nullable: false })
  @Column()
  is_active: boolean

  //-----------------

  @Field(() => User)
  // eager:true ＝　Gallaryを取得する時、Userも一緒に取得する
  @ManyToOne(() => User, (user) => user.id, { nullable: true, eager: true })
  @JoinColumn({ name: 'user_id' }) // 外部キーになるGallariesテーブルのカラム
  user: User | null

  joinWorks: WorkToGallary[]
}
