import { Entity, Column, ManyToOne, JoinColumn, ManyToMany, OneToMany } from 'typeorm'
import { ObjectType, Field, Int } from 'type-graphql'
import { EntityBase } from './entityBase'
import { User } from './userEntity'
import { WorkToGallary } from './workToGallaryEntity'
import { WorkPage } from './workPageEntity'
import { TagToWork } from './tagToWorkEntity'

@Entity('works')
@ObjectType()
export class Work extends EntityBase {
  @Field(() => Int, { nullable: false })
  @Column()
  user_id: number

  @Field(() => String, { nullable: false })
  @Column()
  name: string

  @Field(() => String, { nullable: true })
  @Column()
  caption: string

  @Field(() => Boolean, { nullable: false })
  @Column()
  is_active: boolean

  //-----------------

  @ManyToOne(() => User, (user) => user.gallaries)
  @JoinColumn({ name: 'user_id' })
  user: User

  @ManyToMany(() => WorkToGallary, (workToGallary) => workToGallary.work_id)
  @JoinColumn({ name: 'id' })
  joinGallaries: WorkToGallary[]

  @OneToMany(() => WorkPage, (workPage) => workPage.id)
  @JoinColumn({ name: 'id' })
  workPages: WorkPage[]

  @OneToMany(() => TagToWork, (tagToWork) => tagToWork.work_id)
  @JoinColumn({ name: 'id' })
  tagToWorks: TagToWork[]
}
