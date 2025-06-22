export type item = {
  id: number;
  backdrop_path?: string;
  poster_path?: string;
  title?: string;
  name?: string;
  overview?: string;
  release_date?: string;
  first_air_date?: string;
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
