import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";

@ObjectType()
@Entity()
export class Show extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field({nullable: true})
  @Column({nullable: true})
  backdrop_path: string;

  @Field()
  @Column()
  first_air_date: string;

  @Field()
  @Column({unique: true})
  tmdb_id: number;

  @Field()
  @Column()
  in_production: boolean;

  @Field({nullable: true})
  @Column({nullable: true})
  last_air_date: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  number_of_episodes: number;

  @Field()
  @Column()
  number_of_seasons: number;

  @Field()
  @Column()
  overview: string;

  @Field()
  @Column()
  poster_path: string;

  @Field()
  @Column()
  status: string;

  @Field()
  @Column()
  tagline: string;

  @Field()
  @Column()
  vote_average: string;

  @Field()
  @Column()
  vote_count: number;

}
