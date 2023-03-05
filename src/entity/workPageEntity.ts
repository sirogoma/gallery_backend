import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm'
import { ObjectType, Field, Int } from 'type-graphql'
import { EntityBase } from './entityBase'
import { Work } from './workEntity'

@Entity('work_pages')
@ObjectType()
export class WorkPage extends EntityBase {
  @Field(() => Int, { nullable: false })
  @Column()
  work_id: number

  @Field(() => Int, { nullable: false })
  @Column()
  sort: string

  @Field(() => String, { nullable: true })
  @Column()
  image_url: string

  //-----------------

  @ManyToOne(() => Work, (work) => work.id)
  @JoinColumn({ name: 'work_id' })
  work: Work
}
