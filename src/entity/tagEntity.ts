import { Entity, Column, OneToMany, JoinColumn } from 'typeorm'
import { ObjectType, Field, Int } from 'type-graphql'
import { EntityBase } from './entityBase'
import { TagToWork } from './tagToWorkEntity'

@Entity('tags')
@ObjectType()
export class Tag extends EntityBase {
  @Field(() => Int, { nullable: false })
  @Column()
  gallary_id: number

  @Field(() => String, { nullable: false })
  @Column()
  name: string

  //-----------------

  @OneToMany(() => TagToWork, (tagToWork) => tagToWork.id)
  @JoinColumn({ name: 'id' })
  tagToWorks: TagToWork[]
}
