import { ObjectType, Field } from "type-graphql";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { Show } from "./Show";

@ObjectType()
@Entity()
export class Episode extends BaseEntity {
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
  releaseDate: string;

  @Field()
  @Column()
  season!: number;

  @Field()
  @Column()
  episode!: number;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  imdbRating: string;

  @Field()
  @Column({ unique: true })
  imdbID!: string;

  @Field()
  @Column()
  showID: number;
}
