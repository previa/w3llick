import { Field, ObjectType } from "type-graphql";
import { SearchShow } from "./SearchShow";

@ObjectType()
export class SearchResult {
  @Field()
  page?: number;
  @Field(() => [SearchShow])
  results?: SearchShow[];
  @Field()
  total_results: number;
  @Field()
  total_pages: number;
}
