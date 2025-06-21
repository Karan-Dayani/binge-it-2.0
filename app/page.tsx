import Carousel from "./(components)/Carousel";
import Ticker from "./(components)/Ticker";
import { getPopularMovies, getPopularShows, getTrending } from "./api/api";

export default async function Home() {
  const trending = await getTrending();
  const movies = await getPopularMovies(1);
  const shows = await getPopularShows(1);

  return (
    <div className="pb-10">
      <Carousel data={trending.results} />
      <h1 className="text-accent-primary text-2xl px-10 py-5">Movies</h1>
      <Ticker items={movies.results} name="movies" />
      <h1 className="text-accent-primary text-2xl px-10 py-5">Shows</h1>
      <Ticker items={shows.results} name="tvShows" />
    </div>
  );
}
