import { Entity, Column, ManyToOne, JoinColumn, ManyToMany, OneToMany } from 'typeorm'
import { ObjectType, Field, Int } from 'type-graphql'
import { EntityBase } from './entityBase'
import { User } from './userEntity'
import { WorkToGallery } from './workToGalleryEntity'
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
  @Column({
    default: null
  })
  caption: string

  @Field(() => Boolean, { nullable: false })
  @Column({
    default: true
  })
  is_active: boolean

  //-----------------

  @ManyToOne(() => User, (user) => user.gallaries)
  @JoinColumn({ name: 'user_id' })
  user: User

  @ManyToMany(() => WorkToGallery, (workTogallery) => workTogallery.work_id)
  @JoinColumn({ name: 'id' })
  joinGallaries: WorkToGallery[]

  @Field(() => [WorkPage], { nullable: true })
  @OneToMany(() => WorkPage, (workPage) => workPage.work)
  @JoinColumn({ name: 'id' })
  workPages: WorkPage[] | null

  @OneToMany(() => TagToWork, (tagToWork) => tagToWork.work_id)
  @JoinColumn({ name: 'id' })
  tagToWorks: TagToWork[]
}
