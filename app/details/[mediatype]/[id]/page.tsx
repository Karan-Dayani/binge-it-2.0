import DetailsClient from "@/app/(components)/DeatailsClient";
import {
  getMovieCredits,
  getMovieDetails,
  getMovieRecommendations,
  getMovieTrailer,
  getPersonCredits,
  getPersonDetails,
  getTvCredits,
  getTvDetails,
  getTvRecommendations,
  getTvSeason,
  getTvTrailer,
} from "@/app/api/api";
import { credits, item, trailer } from "@/interfaces";

export default async function DetailsPage({
  params,
  searchParams,
}: {
  params: { mediatype: string; id: string };
  searchParams: { season?: string };
}) {
  let data: item | undefined = undefined;
  let credits: credits | undefined = undefined;
  let recomendations: { results: item[] } | undefined = undefined;
  let trailer: { id: string; results: trailer[] } | undefined = undefined;
  let season: undefined = undefined;
  const seasonNumber = (await searchParams.season) || "1";

  if (params.mediatype === "movie") {
    data = await getMovieDetails(params.id);
    credits = await getMovieCredits(params.id);
    recomendations = await getMovieRecommendations(params.id);
    trailer = await getMovieTrailer(params.id);
  } else if (params.mediatype === "tv") {
    data = await getTvDetails(params.id);
    credits = await getTvCredits(params.id);
    recomendations = await getTvRecommendations(params.id);
    trailer = await getTvTrailer(params.id);
    season = await getTvSeason(params.id, Number(seasonNumber));
  } else if (params.mediatype === "person") {
    data = await getPersonDetails(params.id);
    credits = await getPersonCredits(params.id);
  }

  if (!data) return <div>Not found</div>;

  return (
    <DetailsClient
      data={data}
      mediaType={params.mediatype}
      credits={credits}
      recomendations={recomendations?.results}
      trailer={trailer?.results}
      season={season}
    />
  );
}
