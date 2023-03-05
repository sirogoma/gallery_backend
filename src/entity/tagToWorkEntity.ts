import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm'
import { ObjectType, Field, Int } from 'type-graphql'
import { EntityBase } from './entityBase'
import { Tag } from './tagEntity'
import { Gallary } from './gallaryEntity'

@Entity('tags_to_works')
@ObjectType()
export class TagToWork extends EntityBase {
  @Field(() => Int, { nullable: false })
  @Column()
  gallary_id: number

  @Field(() => Int, { nullable: false })
  @Column()
  work_id: number

  @Field(() => Int, { nullable: false })
  @Column()
  tag_id: number

  //-----------------

  @ManyToOne(() => Gallary, (gallary) => gallary.id)
  @JoinColumn({ name: 'gallary_id' })
  gallary: Gallary

  @ManyToOne(() => Tag, (tag) => tag.id)
  @JoinColumn({ name: 'tag_id' })
  tag: Tag
}
