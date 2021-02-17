import fetch from "node-fetch";
import { SearchResult } from "../entities/SearchResult";
import { Show } from "../entities/Show";
import { Episode } from "src/entities/Episode";

export async function getShowsFromSearch(show: string, tmdb_key: string): Promise<SearchResult> {
  const shows = await fetch(
    "https://api.themoviedb.org/3/search/tv?api_key=" +
    tmdb_key +
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

export async function getShowEpisodes(
  id: number,
  tmdb_id: number,
  seasons: number,
  tmdb_key: string
): Promise<Episode[] | null> {
  let episodes = [] as Episode[];

  for (let i = 1; i < seasons + 1; i++) {
    let e = await fetch(
      "https://api.themoviedb.org/3/tv/" +
        tmdb_id +
        "/season/" +
        i +
        "?api_key=" +
        tmdb_key +
        "&language=en-US",
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      return res.json();
    });
    
    e.episodes.forEach((ep: Episode) => {
      episodes.push(ep);
    })
  }

  episodes.forEach((ep: any) => {
    delete ep.crew;
    delete ep.guest_stars;
    delete ep.production_code;
    ep.tmdb_id = ep.id;
    ep.show_id = id;
    delete ep.id;
  });

  return episodes as Episode[];
}

export async function getShowFromTMDB(id: number, tmdb_key: string): Promise<Show | null> {
  let show = await fetch(
    "https://api.themoviedb.org/3/tv/" +
      id +
      "?api_key=" +
      tmdb_key +
      "&language=en-US",
    {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((res) => {
    return res.json();
  });

  // These are not in our shows
  delete show.created_by;
  delete show.episode_run_time;
  delete show.genres;
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
