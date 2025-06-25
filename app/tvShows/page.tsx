import { getGenres, getShows } from "../api/api";
import { data, genre } from "@/interfaces";
import Showcase from "../(components)/Showcase";
import Pagination from "../(components)/Pagination";
import GenreDropdown from "../(components)/GenreDropdown";

export default async function TvShows({
  searchParams,
}: {
  searchParams: { page?: string; genres?: string };
}) {
  const page = parseInt(searchParams?.page ?? "1", 10);
  const genre = searchParams?.genres;
  const data: data = await getShows(page, genre);
  const genres: { genres: genre[] } = await getGenres("tv");

  return (
    <div className="px-4 sm:px-10 pt-6 pb-10">
      <div className="flex flex-wrap items-center justify-between gap-4 px-6">
        <h1 className="text-3xl font-bold text-accent-primary">Shows</h1>
        <GenreDropdown genres={genres.genres} />
      </div>

      <Showcase data={data} location="tv" />
      <Pagination CurrPage={page} />
    </div>
  );
}
