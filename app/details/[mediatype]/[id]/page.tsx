import DetailsClient from "@/app/(components)/DeatailsClient";
import {
  getMovieCredits,
  getMovieDetails,
  getMovieRecommendations,
  getPersonCredits,
  getPersonDetails,
  getTvCredits,
  getTvDetails,
  getTvRecommendations,
} from "@/app/api/api";
import { credits, item } from "@/interfaces";

export default async function DetailsPage({
  params,
}: {
  params: { mediatype: string; id: string };
}) {
  let data: item | undefined = undefined;
  let credits: credits | undefined = undefined;
  let recomendations: { results: item[] } | undefined = undefined;

  if (params.mediatype === "movie") {
    data = await getMovieDetails(params.id);
    credits = await getMovieCredits(params.id);
    recomendations = await getMovieRecommendations(params.id);
  } else if (params.mediatype === "tv") {
    data = await getTvDetails(params.id);
    credits = await getTvCredits(params.id);
    recomendations = await getTvRecommendations(params.id);
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
    />
  );
}
