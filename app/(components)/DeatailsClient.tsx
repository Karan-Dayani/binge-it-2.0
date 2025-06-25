"use client";

import Image from "next/image";
import { cast_crew, credits, item } from "@/interfaces";
import { IoStar } from "react-icons/io5";
import { useState } from "react";
import Link from "next/link";
import Ticker from "./Ticker";

export default function DetailCardClient({
  data,
  mediaType,
  credits,
  recomendations,
}: {
  data: item;
  mediaType: string;
  credits?: credits;
  recomendations?: item[];
}) {
  const isPerson = mediaType === "person";

  const title = data.title || data.name;
  const poster = data.poster_path || data.profile_path;
  const backdrop = data.backdrop_path;
  const genres = data.genres?.map((g) => g.name).join(", ");
  const releaseDate =
    data.release_date ||
    data.first_air_date ||
    data.birthday ||
    data.place_of_birth;
  const vote = data.vote_average?.toFixed(1);

  const [descExpanded, setDescExpanded] = useState(false);
  const fullText = data.overview || data.biography;
  const maxLength = 200;

  const isLong = (fullText?.length ?? 0) > maxLength;
  const displayText = !isLong
    ? fullText
    : descExpanded
    ? fullText
    : (fullText ?? "").slice(0, maxLength) + "...";

  const director = credits?.crew?.find((person) => person.job === "Director");

  // Filter cast for person details's known for section
  const filtered = credits?.cast
    .filter((item) => {
      const char = item.character?.toLowerCase() || "";
      const isSelf = char.includes("self");
      const isEmptyChar = char.trim() === "";
      const isTalkShow =
        item.media_type === "tv" &&
        (item.name || "").toLowerCase().includes("talk");
      const isShortRole =
        item.episode_count !== undefined && item.episode_count <= 1;
      return !isSelf && !isEmptyChar && !isTalkShow && !isShortRole;
    })
    .sort((a, b) => {
      // Prefer higher vote count first, then popularity
      const aVote = a.vote_count ?? 0;
      const bVote = b.vote_count ?? 0;
      if (bVote !== aVote) return bVote - aVote;
      const aPop = a.popularity ?? 0;
      const bPop = b.popularity ?? 0;
      return bPop - aPop;
    });
  const uniqueMap = new Map<string, cast_crew>();
  // Avoid duplicates by media_type + title
  if (filtered) {
    for (const item of filtered) {
      const key = `${item.media_type}_${item.title || item.name}`;
      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, item);
      }
    }
  }
  const top = Array.from(uniqueMap.values()).slice(0, 7);

  //   return (
  //     <div className="px-4 py-8 max-w-6xl mx-auto">
  //       <motion.div
  //         initial={{ opacity: 0, y: 30 }}
  //         animate={{ opacity: 1, y: 0 }}
  //         transition={{ duration: 0.6, ease: "easeOut" }}
  //         className="grid md:grid-cols-2 gap-8"
  //       >
  //         {/* Image */}
  //         <div className="relative w-full aspect-[2/3] md:max-w-[360px] mx-auto">
  //           <Image
  //             src={`https://image.tmdb.org/t/p/original${poster}`}
  //             alt={title as string}
  //             fill
  //             className="object-cover shadow-lg"
  //             sizes="(max-width: 768px) 100vw, 360px"
  //             priority
  //           />
  //         </div>

  //         {/* Info */}
  //         <div className="flex flex-col justify-between">
  //           <div>
  //             <h1 className="text-2xl sm:text-3xl font-bold text-white">
  //               {title}
  //             </h1>

  //             {data.tagline && (
  //               <p className="text-accent-primary italic mt-2 text-base">
  //                 &quot;{data.tagline}&quot;
  //               </p>
  //             )}

  //             {genres && (
  //               <p className="mt-4 text-sm text-text-secondary">
  //                 <strong>Genres:</strong> {genres}
  //               </p>
  //             )}

  //             {releaseDate && (
  //               <p className="text-sm text-text-secondary mt-1">
  //                 <strong>{isPerson ? "Born" : "Release Date"}:</strong>{" "}
  //                 {releaseDate.split("-").reverse().join("/")}
  //               </p>
  //             )}

  //             {data.runtime && (
  //               <p className="text-sm text-text-secondary mt-1">
  //                 <strong>Runtime:</strong> {data.runtime} mins
  //               </p>
  //             )}

  //             {!isPerson && (
  //               <div className="flex items-center gap-2 mt-4">
  //                 <IoStar className="text-yellow-400 text-xl" />
  //                 <span className="text-white font-medium text-lg">{vote}</span>
  //                 <span className="text-sm text-text-secondary">/ 10</span>
  //               </div>
  //             )}

  //             {data.place_of_birth && isPerson && (
  //               <p className="mt-2 text-sm text-text-secondary">
  //                 <strong>Place of Birth:</strong> {data.place_of_birth}
  //               </p>
  //             )}
  //           </div>

  //           {data.homepage && (
  //             <a
  //               href={data.homepage}
  //               target="_blank"
  //               rel="noopener noreferrer"
  //               className="inline-block mt-6 text-accent-primary hover:underline text-sm"
  //             >
  //               Visit Official Site
  //             </a>
  //           )}
  //         </div>
  //       </motion.div>

  //       {/* Backdrop for person → skip; for media → show below on mobile */}
  //       {!isPerson && backdrop && (
  //         <div className="mt-10 md:hidden relative aspect-video w-full max-w-4xl mx-auto">
  //           <Image
  //             src={`https://image.tmdb.org/t/p/original${backdrop}`}
  //             alt="Backdrop"
  //             fill
  //             className="object-cover rounded shadow-lg"
  //             sizes="100vw"
  //           />
  //         </div>
  //       )}
  //     </div>
  //   );
  return (
    <>
      <div className="md:hidden w-full flex justify-center">
        <Image
          src={`https://image.tmdb.org/t/p/original${
            isPerson ? poster : backdrop
          }`}
          alt={title as string}
          width={360}
          height={540}
          className={`object-cover shadow-lg h-auto ${
            isPerson ? "w-64 mt-10" : "w-full"
          }`}
          priority
        />
      </div>
      <div className="w-full flex items-center md:gap-10 p-5 md:p-10">
        <div className="w-full md:w-[70%] text-center md:text-left">
          <div className="mb-4">
            <h1 className="font-bold text-[5vw] tracking-tight">{title}</h1>
            <p className="text-lg text-accent-primary">{data.tagline}</p>
            {mediaType === "movie" && director && (
              <p className="text-sm text-text-secondary">
                Directed by <span className="font-medium">{director.name}</span>
              </p>
            )}
            {mediaType === "tv" &&
              Array.isArray(data.created_by) &&
              data.created_by.length > 0 && (
                <p className="text-sm text-text-secondary">
                  Created By :{" "}
                  {data.created_by.map((person) => person.name).join(", ")}
                </p>
              )}
          </div>
          <div>
            <p>
              {releaseDate
                ? new Date(releaseDate).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "N/A"}
            </p>
            <p>{genres}</p>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-2">
            {!isPerson && (
              <>
                <IoStar className="size-5 fill-yellow-300" /> {vote}
              </>
            )}
          </div>
          <div className="mt-4 leading-relaxed text-justify">
            {displayText}
            {isLong && (
              <button
                onClick={() => setDescExpanded(!descExpanded)}
                className="ml-2 text-accent-primary hover:underline"
              >
                {descExpanded ? "less" : "more"}
              </button>
            )}
          </div>
        </div>
        <div className="md:w-[30%]">
          <div className="hidden md:block max-w-[360px] ">
            <Image
              src={`https://image.tmdb.org/t/p/original${poster}`}
              alt={title as string}
              width={360}
              height={540}
              className="object-cover shadow-lg w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>
      {!isPerson && (credits?.cast?.length ?? 0) > 0 && (
        <section className="my-16 px-4 sm:px-6 lg:px-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Cast</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-h-96 md:max-h-none overflow-y-auto md:overflow-y-visible">
            {credits?.cast.slice(0, 12).map((actor) => (
              <Link
                href={`/details/person/${actor.id}`}
                key={actor.id}
                className="flex items-center bg-card hover:bg-header overflow-hidden transition-colors duration-300 shadow-md"
              >
                <div className="relative flex-shrink-0 w-28 h-40 overflow-hidden no-scrollbar">
                  <Image
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/original${actor.profile_path}`
                        : "/fallback.jpeg"
                    }
                    alt={actor.name as string}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="px-4 py-3 text-white">
                  <p className="text-base font-semibold truncate">
                    {actor.name}
                  </p>
                  <p className="text-sm text-gray-400 truncate">
                    {actor.character || "Unknown"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
      {!isPerson && recomendations && (
        <section className="my-16 px-4 sm:px-6 lg:px-12">
          <h2 className="text-2xl font-semibold text-white mb-6">
            More like this
          </h2>
          <Ticker items={recomendations} name={mediaType} more={false} />
        </section>
      )}
      {isPerson && credits?.cast && (
        <section className="my-16 px-4 sm:px-6 lg:px-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Known For</h2>
          <Ticker items={top} more={false} />
        </section>
      )}
    </>
  );
}
