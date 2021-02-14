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
import { getShowsFromSearch, getShowFromTMDB } from "../utils/tvdbHelper";
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
    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;
    const qb = getConnection()
      .getRepository(Show)
      .createQueryBuilder("s")
      .orderBy('"name"')
      .take(realLimitPlusOne);

    if (cursor) {
      qb.where('"name" > :cursor', { cursor });
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
  async addShow(@Arg("tmdb_id", ()=> Int) tmdb_id: number): Promise<Show | null> {
    const _resultShow = await getShowFromTMDB(tmdb_id) as Show;

    let _show;
    // try {
    //   _show = await Show.create(_resultShow).save();
    // } catch(error) {
    //   console.log('error:', error);
    // }

    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Show)
        .values(_resultShow)
        .returning("*")
        .execute();

      _show = result.raw[0];

      return _show as Show;
    } catch (err) {
      if (err.code === "23505") {
        console.log('Show is already in DB');
        return null;
      }
    }

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

  @Mutation(() => Boolean)
  async deleteShow(@Arg("id") id: number): Promise<boolean> {
    await Show.delete(id);
    return true;
  }
}
