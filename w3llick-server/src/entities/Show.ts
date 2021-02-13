import { Field, Int, ObjectType } from "type-graphql";
import {
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BaseEntity,
} from "typeorm";

@ObjectType()
@Entity()
export class Show extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();

  @Field()
  @Column()
  year!: string;

  @Field()
  @Column()
  title!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  posterPath: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  plot: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  language: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  imdbID: string;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  totalSeasons: number;
}
