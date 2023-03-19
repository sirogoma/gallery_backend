import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm'
import { ObjectType, Field, Int } from 'type-graphql'
import { EntityBase } from './entityBase'
import { Tag } from './tagEntity'
import { Gallery } from './galleryEntity'

@Entity('tags_to_works')
@ObjectType()
export class TagToWork extends EntityBase {
  @Field(() => Int, { nullable: false })
  @Column()
  gallery_id: number

  @Field(() => Int, { nullable: false })
  @Column()
  work_id: number

  @Field(() => Int, { nullable: false })
  @Column()
  tag_id: number

  //-----------------

  @ManyToOne(() => Gallery, (gallery) => gallery.id)
  @JoinColumn({ name: 'gallery_id' })
  gallery: Gallery

  @ManyToOne(() => Tag, (tag) => tag.id)
  @JoinColumn({ name: 'tag_id' })
  tag: Tag
}
