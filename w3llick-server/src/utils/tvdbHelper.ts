import fetch from "node-fetch";
import { SearchResult } from "../entities/SearchResult";
import { TMDB_KEY } from "../keys";
import { Show } from "../entities/Show";

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

export async function getShowFromTMDB(id: number): Promise<Show | null> {
  let show = await fetch(
    "https://api.themoviedb.org/3/tv/" +
      id +
      "?api_key=" +
      TMDB_KEY +
      "&language=en-US",
      {
        method: "get",
        headers: {
          "Content-Type": "application/json"
        }
      }
  ).then((res) => {
    return res.json();
  });

  // These are not in our shows
  delete show.created_by;
  delete show.episode_run_time;
  delete show.genres;
  delete show.seasons;
  delete show.production_companies;
  delete show.production_countries;
  delete show.spoken_languages;
  delete show.type;
  delete show.original_name;
  delete show.original_language;
  delete show.networks;
  delete show.next_episode_to_air;
  delete show.last_episode_to_air;
  delete show.last_air_date;
  delete show.languages;
  delete show.hompage;
  delete show.origin_country;
  
  show.tmdb_id = show.id;
  delete show.id;
  return show as Show;
}
