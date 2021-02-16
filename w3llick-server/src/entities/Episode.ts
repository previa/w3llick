import { ObjectType, Field, Int } from "type-graphql";
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@ObjectType()
@Entity()
export class Episode extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field({ nullable: true })
  @Column()
  air_date: string;

  @Field(() => Int)
  @Column()
  episode_number: number;

  @Field(() => Int)
  @Column({ unique: true })
  tmdb_id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  overview: string;

  @Field()
  @Column()
  season_number: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  still_path: string;

  @Field()
  @Column()
  vote_average: string;

  @Field(() => Int)
  @Column()
  vote_count: number;

  @Field(() => Int)
  @Column()
  show_id: number;
}
