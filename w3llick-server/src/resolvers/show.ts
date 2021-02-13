import { Show } from "../entities/Show";
import {
  Arg,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { isAuth } from "../middleware/isAuth";
import { getConnection } from "typeorm";
import { getShowsFromSearch } from "../utils/tvdbHelper";
import { SearchResult } from "../entities/SearchResult";

// @InputType()
// class ShowInput {
//   @Field()
//   title: string;
//   @Field()
//   year: string;
// }

@ObjectType()
class PaginatedShows {
  @Field(() => [Show])
  shows: Show[];
  @Field()
  hasMore: boolean;
}

@Resolver()
export class ShowResolver {
  @Query(() => PaginatedShows)
  async shows(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedShows> {
    const realLimit = Math.min(20, limit);
    const realLimitPlusOne = realLimit + 1;
    const qb = getConnection()
      .getRepository(Show)
      .createQueryBuilder("s")
      .orderBy('"title"')
      .take(realLimitPlusOne);

    if (cursor) {
      qb.where('"title" > :cursor', { cursor });
    }

    const shows = await qb.getMany();

    return {
      shows: shows.slice(0, realLimit),
      hasMore: shows.length === realLimitPlusOne,
    };
  }

  @Query(() => Show, { nullable: true })
  show(@Arg("id", () => Int) id: number): Promise<Show | undefined> {
    return Show.findOne(id);
  }

  @Mutation(() => Show)
  @UseMiddleware(isAuth)
  async addShow(@Arg("title") title: string): Promise<Show | null> {
    console.log(title);
    return null;
  }

  @Mutation(() => SearchResult)
  async searchShow(@Arg("title") title: string): Promise<SearchResult> {
    const _searchResult = await getShowsFromSearch(title);
    return _searchResult;
  }

  @Mutation(() => Show)
  async updateShow(@Arg("id") id: number): Promise<Show | null> {
    let show = await Show.findOne(id);

    if (!show) {
      return null;
    }

    return null;
  }

  @Mutation(() => Show, { nullable: true })
  async updatePoster(
    @Arg("id") id: number,
    @Arg("posterPath", () => String) posterPath: string
  ): Promise<Show | null> {
    const show = await Show.findOne(id);
    if (!show) {
      return null;
    }

    if (typeof posterPath !== "undefined") {
      await Show.update({ id }, { posterPath });
    }

    return show;
  }

  @Mutation(() => Boolean)
  async deleteShow(@Arg("id") id: number): Promise<boolean> {
    await Show.delete(id);
    return true;
  }
}
