import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Episode } from "../entities/Episode";

@Resolver()
export class EpisodeResolver {
  @Query(() => Episode, { nullable: true })
  episode(@Arg("id", () => Int) id: number): Promise<Episode | undefined> {
    return Episode.findOne(id);
  }

  @Query(() => [Episode])
  async episodes(
    @Arg("showID", () => Int) showID: number
  ): Promise<Episode[] | null> {
    return await Episode.find({ showID });
  }

  // @Mutation(() => [Episode])
  // async updateEpisodes(
  //   @Arg("showID", () => Int) showID: number
  // ): Promise<Episode[] | null> {
  //   const _show = await Show.findOne(showID);

  //   if (!_show) {
  //     return null;
  //   }

  //   const nrOfSeasons = _show.totalSeasons;

  //   for (let i = 1; i < nrOfSeasons + 1; i++) {
  //     const _seasons = await getSeasonWithTVDB(_show, i);

  //     console.log(_seasons);

  //     _seasons?.forEach(async (eps: Episode) => {
  //       let ep = await Episode.findOne({ imdbID: eps.imdbID });

  //       if (ep) {
  //         await Episode.update(
  //           {
  //             id: ep.id,
  //           },
  //           {
  //             ...eps,
  //           }
  //         );
  //       } else {
  //         await Episode.create({
  //           ...eps,
  //         }).save();
  //       }
  //     });
  //   }

  //   const _episodes = await Episode.find({ showID });

  //   return _episodes;
  // }

  @Mutation(() => Boolean)
  async deleteEpisode(@Arg("id") id: number): Promise<boolean> {
    await Episode.delete(id);
    return true;
  }
}
