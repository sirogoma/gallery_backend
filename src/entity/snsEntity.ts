import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import { ObjectType, Field, Int } from 'type-graphql'
import { EntityBase } from './entityBase'

@Entity('snss')
@ObjectType()
export class Sns extends EntityBase {
  @Field(() => String, { nullable: false })
  @Column()
  name: string

  @Field(() => Boolean, { nullable: false })
  @Column()
  is_active: boolean
}
