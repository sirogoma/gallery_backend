import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'
import { ObjectType, Field, Int } from 'type-graphql'

/** エンティティ基底クラス */

@Entity()
@ObjectType()
export class EntityBase {
  @Field(() => Int, { nullable: false })
  @PrimaryGeneratedColumn()
  id: number

  @Field(() => Int, { nullable: true })
  @CreateDateColumn({ nullable: true })
  created_at?: number

  @Field(() => Int, { nullable: true })
  @UpdateDateColumn({ nullable: true })
  updated_at?: number

  @Field(() => Int, { nullable: true })
  @DeleteDateColumn({ nullable: true })
  deleted_at?: number
}
