import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  shows: PaginatedShows;
  show?: Maybe<Show>;
  me?: Maybe<User>;
  episode?: Maybe<Episode>;
  episodes: Array<Episode>;
};


export type QueryShowsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryShowArgs = {
  id: Scalars['Int'];
};


export type QueryEpisodeArgs = {
  id: Scalars['Int'];
};


export type QueryEpisodesArgs = {
  id: Scalars['Int'];
};

export type PaginatedShows = {
  __typename?: 'PaginatedShows';
  shows: Array<Show>;
  hasMore: Scalars['Boolean'];
};

export type Show = {
  __typename?: 'Show';
  id: Scalars['Float'];
  backdrop_path: Scalars['String'];
  first_air_date: Scalars['String'];
  tmdb_id: Scalars['Float'];
  in_production: Scalars['Boolean'];
  last_air_date?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  number_of_episodes: Scalars['Float'];
  number_of_seasons: Scalars['Float'];
  overview: Scalars['String'];
  poster_path: Scalars['String'];
  status: Scalars['String'];
  tagline: Scalars['String'];
  vote_average: Scalars['String'];
  vote_count: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type Episode = {
  __typename?: 'Episode';
  id: Scalars['Float'];
  air_date: Scalars['String'];
  episode_number: Scalars['Int'];
  tmdb_id: Scalars['Int'];
  name: Scalars['String'];
  overview: Scalars['String'];
  season_number: Scalars['Float'];
  still_path: Scalars['String'];
  vote_average: Scalars['String'];
  vote_count: Scalars['Int'];
  show_id: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addShow: Show;
  searchShow: SearchResult;
  updateShow: Show;
  deleteShow: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  addEpisodes: Array<Episode>;
  deleteEpisode: Scalars['Boolean'];
};


export type MutationAddShowArgs = {
  tmdb_id: Scalars['Int'];
};


export type MutationSearchShowArgs = {
  title: Scalars['String'];
};


export type MutationUpdateShowArgs = {
  id: Scalars['Float'];
};


export type MutationDeleteShowArgs = {
  id: Scalars['Float'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationLoginArgs = {
  options: UsernamePasswordInput;
};


export type MutationAddEpisodesArgs = {
  tmdb_id: Scalars['Int'];
};


export type MutationDeleteEpisodeArgs = {
  id: Scalars['Float'];
};

export type SearchResult = {
  __typename?: 'SearchResult';
  page: Scalars['Float'];
  results: Array<SearchShow>;
  total_results: Scalars['Float'];
  total_pages: Scalars['Float'];
};

export type SearchShow = {
  __typename?: 'SearchShow';
  backdrop_path?: Maybe<Scalars['String']>;
  first_air_date?: Maybe<Scalars['String']>;
  genre_ids: Array<Scalars['Int']>;
  id: Scalars['Float'];
  name: Scalars['String'];
  origin_country: Array<Scalars['String']>;
  original_language: Scalars['String'];
  original_name: Scalars['String'];
  overview: Scalars['String'];
  popularity: Scalars['Float'];
  poster_path?: Maybe<Scalars['String']>;
  vote_average: Scalars['Float'];
  vote_count: Scalars['Float'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UsernamePasswordInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username'>
);

export type AddEpisodesMutationVariables = Exact<{
  tmdb_id: Scalars['Int'];
}>;


export type AddEpisodesMutation = (
  { __typename?: 'Mutation' }
  & { addEpisodes: Array<(
    { __typename?: 'Episode' }
    & Pick<Episode, 'id' | 'air_date' | 'episode_number' | 'tmdb_id' | 'name' | 'overview' | 'season_number' | 'still_path' | 'vote_average' | 'vote_count'>
  )> }
);

export type AddShowMutationVariables = Exact<{
  tmdb_id: Scalars['Int'];
}>;


export type AddShowMutation = (
  { __typename?: 'Mutation' }
  & { addShow: (
    { __typename?: 'Show' }
    & Pick<Show, 'id' | 'number_of_seasons'>
  ) }
);

export type LoginMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & RegularUserFragment
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & RegularUserFragment
    )> }
  ) }
);

export type SearchShowMutationVariables = Exact<{
  title: Scalars['String'];
}>;


export type SearchShowMutation = (
  { __typename?: 'Mutation' }
  & { searchShow: (
    { __typename?: 'SearchResult' }
    & Pick<SearchResult, 'page' | 'total_results' | 'total_pages'>
    & { results: Array<(
      { __typename?: 'SearchShow' }
      & Pick<SearchShow, 'backdrop_path' | 'first_air_date' | 'genre_ids' | 'id' | 'name' | 'origin_country' | 'original_language' | 'original_name' | 'overview' | 'popularity' | 'poster_path' | 'vote_average' | 'vote_count'>
    )> }
  ) }
);

export type EpisodesQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type EpisodesQuery = (
  { __typename?: 'Query' }
  & { episodes: Array<(
    { __typename?: 'Episode' }
    & Pick<Episode, 'id' | 'air_date' | 'episode_number' | 'tmdb_id' | 'name' | 'overview' | 'season_number' | 'still_path' | 'vote_average' | 'vote_count' | 'show_id'>
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type ShowQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ShowQuery = (
  { __typename?: 'Query' }
  & { show?: Maybe<(
    { __typename?: 'Show' }
    & Pick<Show, 'id' | 'backdrop_path' | 'first_air_date' | 'tmdb_id' | 'in_production' | 'last_air_date' | 'name' | 'number_of_episodes' | 'number_of_seasons' | 'overview' | 'poster_path' | 'status' | 'tagline' | 'vote_average' | 'vote_count'>
  )> }
);

export type ShowsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type ShowsQuery = (
  { __typename?: 'Query' }
  & { shows: (
    { __typename?: 'PaginatedShows' }
    & Pick<PaginatedShows, 'hasMore'>
    & { shows: Array<(
      { __typename?: 'Show' }
      & Pick<Show, 'id' | 'backdrop_path' | 'first_air_date' | 'tmdb_id' | 'in_production' | 'last_air_date' | 'name' | 'number_of_episodes' | 'number_of_seasons' | 'overview' | 'poster_path' | 'status' | 'tagline' | 'vote_average' | 'vote_count'>
    )> }
  ) }
);

export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
}
    `;
export const AddEpisodesDocument = gql`
    mutation AddEpisodes($tmdb_id: Int!) {
  addEpisodes(tmdb_id: $tmdb_id) {
    id
    air_date
    episode_number
    tmdb_id
    name
    overview
    season_number
    still_path
    vote_average
    vote_count
  }
}
    `;

export function useAddEpisodesMutation() {
  return Urql.useMutation<AddEpisodesMutation, AddEpisodesMutationVariables>(AddEpisodesDocument);
};
export const AddShowDocument = gql`
    mutation AddShow($tmdb_id: Int!) {
  addShow(tmdb_id: $tmdb_id) {
    id
    number_of_seasons
  }
}
    `;

export function useAddShowMutation() {
  return Urql.useMutation<AddShowMutation, AddShowMutationVariables>(AddShowDocument);
};
export const LoginDocument = gql`
    mutation Login($options: UsernamePasswordInput!) {
  login(options: $options) {
    errors {
      field
      message
    }
    user {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!) {
  register(options: {username: $username, password: $password}) {
    errors {
      field
      message
    }
    user {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const SearchShowDocument = gql`
    mutation SearchShow($title: String!) {
  searchShow(title: $title) {
    results {
      backdrop_path
      first_air_date
      genre_ids
      id
      name
      origin_country
      original_language
      original_name
      overview
      popularity
      poster_path
      vote_average
      vote_count
    }
    page
    total_results
    total_pages
  }
}
    `;

export function useSearchShowMutation() {
  return Urql.useMutation<SearchShowMutation, SearchShowMutationVariables>(SearchShowDocument);
};
export const EpisodesDocument = gql`
    query Episodes($id: Int!) {
  episodes(id: $id) {
    id
    air_date
    episode_number
    tmdb_id
    name
    overview
    season_number
    still_path
    vote_average
    vote_count
    show_id
  }
}
    `;

export function useEpisodesQuery(options: Omit<Urql.UseQueryArgs<EpisodesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<EpisodesQuery>({ query: EpisodesDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const ShowDocument = gql`
    query Show($id: Int!) {
  show(id: $id) {
    id
    backdrop_path
    first_air_date
    tmdb_id
    in_production
    last_air_date
    name
    number_of_episodes
    number_of_seasons
    overview
    poster_path
    status
    tagline
    vote_average
    vote_count
  }
}
    `;

export function useShowQuery(options: Omit<Urql.UseQueryArgs<ShowQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ShowQuery>({ query: ShowDocument, ...options });
};
export const ShowsDocument = gql`
    query Shows($limit: Int!, $cursor: String) {
  shows(cursor: $cursor, limit: $limit) {
    hasMore
    shows {
      id
      backdrop_path
      first_air_date
      tmdb_id
      in_production
      last_air_date
      name
      number_of_episodes
      number_of_seasons
      overview
      poster_path
      status
      tagline
      vote_average
      vote_count
    }
  }
}
    `;

export function useShowsQuery(options: Omit<Urql.UseQueryArgs<ShowsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ShowsQuery>({ query: ShowsDocument, ...options });
};