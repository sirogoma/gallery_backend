import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm'
import { ObjectType, Field, Int } from 'type-graphql'
import { EntityBase } from './entityBase'
import { Gallery } from './galleryEntity'
import { Work } from './workEntity'

@Entity('works_to_galleries')
@ObjectType()
export class WorkToGallery extends EntityBase {
  @Field(() => Int, { nullable: false })
  @Column()
  gallery_id: number

  @Field(() => Int, { nullable: false })
  @Column()
  work_id: number

  @Field(() => Int, { nullable: false })
  @Column({
    default: 1
  })
  sort: number

  //-----------------

  @ManyToOne(() => Gallery, (gallery) => gallery.id)
  @JoinColumn({ name: 'gallery_id' })
  gallaries: Gallery[]

  @ManyToOne(() => Work, (work) => work.id)
  @JoinColumn({ name: 'work_id' })
  works: Work[]
}
