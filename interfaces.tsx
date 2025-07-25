export type item = {
  id: number;
  backdrop_path?: string;
  poster_path?: string;
  title?: string;
  name?: string;
  overview?: string;
  release_date?: string;
  first_air_date?: string;
  profile_path?: string;
  known_for_department?: string;
  media_type?: string;
  biography?: string;
  genres?: genre[];
  runtime?: number;
  number_of_seasons?: number;
  status?: string;
  vote_average?: number;
  tagline?: string;
  birthday?: string;
  homepage?: string;
  place_of_birth?: string;
  created_by?: cast_crew[];
};

export type genre = {
  id: number;
  name: string;
};

export type data = {
  page: number;
  results: item[];
  total_pages: number;
  total_results: number;
};

export type cast_crew = {
  id: number;
  adult?: boolean;
  cast_id?: number;
  character?: string;
  credit_id?: string;
  gender?: number;
  known_for_department?: string;
  name?: string;
  title?: string;
  order?: number;
  original_name?: string;
  popularity?: number;
  profile_path?: string;
  department?: string;
  job?: string;
  media_type?: string;
  episode_count?: number;
  original_language?: string;
  vote_count?: number;
};

export type credits = {
  id: number;
  cast: cast_crew[];
  crew: cast_crew[];
};

export type trailer = {
  id: string;
  iso_639_1?: string;
  iso_3166_1?: string;
  name?: string;
  key?: string;
  site?: string;
  size?: number;
  type?: string;
  official?: boolean;
  published_at?: string;
};

export type episodes = {
  id: number;
  air_date: string;
  episode_number: number;
  episode_type: string;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
  crew: cast_crew[];
  guest_starts: cast_crew[];
};

export type season = {
  id: number;
  air_date: string;
  episodes: episodes[];
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
};
