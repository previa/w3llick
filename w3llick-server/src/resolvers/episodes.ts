import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Episode } from "../entities/Episode";
import { getShowEpisodes } from "../utils/tvdbHelper";
import { Show } from "../entities/Show";

@Resolver()
export class EpisodeResolver {
  @Query(() => Episode, { nullable: true })
  episode(@Arg("id", () => Int) id: number): Promise<Episode | undefined> {
    return Episode.findOne(id);
  }

  @Query(() => [Episode])
  async episodes(
    @Arg("id", () => Int) id: number
  ): Promise<Episode[] | null> {
    const _ep = await Episode.find({show_id: id});

    return _ep as Episode[];
  }

  @Mutation(() => [Episode])
  async addEpisodes(
    @Arg("tmdb_id", () => Int) tmdb_id: number,
  ): Promise<Episode[] | null> {
    const _show = await Show.findOne({tmdb_id});
    const _episodes = await getShowEpisodes(_show!.id, _show!.tmdb_id, _show!.number_of_seasons) as Episode[];
  
    await Episode.save(_episodes);

    return await Episode.find({show_id: _show!.id});
  }

  @Mutation(() => Boolean)
  async deleteEpisode(@Arg("id") id: number): Promise<boolean> {
    await Episode.delete(id);
    return true;
  }
}
