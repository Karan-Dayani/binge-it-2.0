import { data } from "@/interfaces";
import Carousel from "./(components)/Carousel";
import Ticker from "./(components)/Ticker";
import { getMovies, getShows, getTrending } from "./api/api";

export default async function Home() {
  const trending: data = await getTrending();
  const movies: data = await getMovies(1);
  const shows: data = await getShows(1);

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
