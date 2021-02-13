// export async function updateShowWithTVDB(show: Show): Promise<Show> {
//   const json = (await fetch(
//     "http://www.omdbapi.com/?t=Atlanta&y=2016&plot=full&apikey=" + OMDB_KEY,
//     {
//       method: "get",
//       headers: { "Content-Type": "application/json" },
//     }
//   ).then((res) => {
//     return res.json();
//   })) as OMDBShow;

import fetch from "node-fetch";
import { SearchResult } from "src/entities/SearchResult";
import { TMDB_KEY } from "../keys";

//   show.language = json.Language;
//   show.plot = json.Plot;
//   show.imdbID = json.imdbID;
//   show.totalSeasons = parseInt(json.totalSeasons);

//   return show;
// }

// export async function getSeasonWithTVDB(
//   show: Show,
//   season: number
// ): Promise<Episode[] | null> {
//   const seasons = await fetch(
//     "http://www.omdbapi.com/?t=Atlanta&y=2016&season=" +
//       season +
//       "&apikey=" +
//       OMDB_KEY,
//     { method: "get", headers: { "Content-Type": "application/json" } }
//   ).then((res) => {
//     return res.json();
//   });

//   if (typeof seasons === "undefined") {
//     return null;
//   }

//   let _seasons = [] as Episode[];

//   seasons.Episodes.forEach((e: OMDBEpisode) => {
//     let eps = new Episode();

//     eps.title = e.Title.toString();
//     eps.episode = parseInt(e.Episode.toString());
//     eps.season = season;
//     eps.imdbID = e.imdbID.toString();
//     eps.imdbRating = e.imdbRating.toString();
//     eps.showID = show.id;
//     eps.releaseDate = e.Released.toString();

//     _seasons.push(eps);
//   });

//   return _seasons;
// }

export async function getShowsFromSearch(show: string): Promise<SearchResult> {
  const shows = await fetch(
    "https://api.themoviedb.org/3/search/tv?api_key=" +
      TMDB_KEY +
      "&language=en-US&page=1&query=" +
      show +
      "&include_adult=false",
    {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((res) => {
    return res.json();
  });

  return shows as SearchResult;
}
