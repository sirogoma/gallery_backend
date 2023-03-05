import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm'
import { ObjectType, Field, Int } from 'type-graphql'
import { EntityBase } from './entityBase'
import { Gallary } from './gallaryEntity'
import { Work } from './workEntity'

@Entity('works_to_gallaries')
@ObjectType()
export class WorkToGallary extends EntityBase {
  @Field(() => Int, { nullable: false })
  @Column()
  gallary_id: number

  @Field(() => Int, { nullable: false })
  @Column()
  work_id: number

  @Field(() => Int, { nullable: false })
  @Column()
  sort: number

  //-----------------

  @ManyToOne(() => Gallary, (gallary) => gallary.id)
  @JoinColumn({ name: 'gallary_id' })
  gallaries: Gallary[]

  @ManyToOne(() => Work, (work) => work.id)
  @JoinColumn({ name: 'work_id' })
  works: Work[]
}
