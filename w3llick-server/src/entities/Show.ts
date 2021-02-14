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

  @Field()
  @Column({nullable: true})
  backdrop_path: string;

  @Field()
  @Column({nullable: true})
  first_air_date: string;

  @Field()
  @Column({nullable: true, unique: true})
  tmdb_id: number;

  @Field()
  @Column({nullable: true})
  in_production: boolean;

  @Field({nullable: true})
  @Column({nullable: true})
  last_air_date: string;

  @Field()
  @Column({nullable: true})
  name: string;

  @Field()
  @Column({nullable: true})
  number_of_episodes: number;

  @Field()
  @Column({nullable: true})
  number_of_seasons: number;

  @Field()
  @Column({nullable: true})
  overview: string;

  @Field()
  @Column({nullable: true})
  poster_path: string;

  @Field()
  @Column({nullable: true})
  status: string;

  @Field()
  @Column({nullable: true})
  tagline: string;

  @Field()
  @Column({nullable: true})
  vote_average: string;

  @Field()
  @Column({nullable: true})
  vote_count: number;

}
