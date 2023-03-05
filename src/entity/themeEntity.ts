import { Entity, Column } from 'typeorm'
import { ObjectType, Field, Int } from 'type-graphql'
import { EntityBase } from './entityBase'

@Entity('themes')
@ObjectType()
export class Theme extends EntityBase {
  @Field(() => String, { nullable: false })
  @Column()
  name: string

  @Field(() => Boolean, { nullable: false })
  @Column()
  is_active: boolean // テーブルのデータ型はtinyint
}
