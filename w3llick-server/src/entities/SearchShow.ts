import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class SearchShow {
  @Field(() => String || null, { nullable: true })
  backdrop_path?: string | null;

  @Field({ nullable: true })
  first_air_date?: string;

  @Field(() => [Int])
  genre_ids?: number[];

  @Field()
  id?: number;

  @Field()
  name?: string;

  @Field(() => [String])
  origin_country?: string[];

  @Field()
  original_language?: string;

  @Field()
  original_name?: string;

  @Field()
  overview?: string;

  @Field()
  popularity?: number;

  @Field(() => String || null, { nullable: true })
  poster_path?: string | null;

  @Field()
  vote_average?: number;

  @Field()
  vote_count?: number;
}
