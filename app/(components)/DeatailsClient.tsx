"use client";

import Image from "next/image";
import { cast_crew, credits, item, trailer } from "@/interfaces";
import { IoStar } from "react-icons/io5";
import { useState } from "react";
import Link from "next/link";
import Ticker from "./Ticker";

export default function DetailCardClient({
  data,
  mediaType,
  credits,
  recomendations,
  trailer,
}: {
  data: item;
  mediaType: string;
  credits?: credits;
  recomendations?: item[];
  trailer?: trailer[];
}) {
  const isPerson = mediaType === "person";

  const [trailerOpen, setTrailerOpen] = useState(false);
  const officialTrailer: trailer = (trailer ?? []).filter(
    (t) => t.name === "Official Trailer"
  )[0];

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
      const aVote = a.vote_count ?? 0;
      const bVote = b.vote_count ?? 0;
      if (bVote !== aVote) return bVote - aVote;
      const aPop = a.popularity ?? 0;
      const bPop = b.popularity ?? 0;
      return bPop - aPop;
    });
  const uniqueMap = new Map<string, cast_crew>();
  if (filtered) {
    for (const item of filtered) {
      const key = `${item.media_type}_${item.title || item.name}`;
      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, item);
      }
    }
  }
  const top = Array.from(uniqueMap.values()).slice(0, 7);

  return (
    <>
      {/* Mobile Image */}
      <div
        className={`md:hidden w-full flex justify-center ${
          !isPerson ? "cursor-pointer relative" : ""
        }`}
        onClick={() => {
          if (!isPerson) setTrailerOpen(true);
        }}
      >
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

        {!isPerson && officialTrailer && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-14 h-14 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        )}
      </div>

      <div className="w-full flex items-center md:gap-10 p-5 md:p-10">
        {/* Information */}
        <div className="w-full md:w-[70%] text-center md:text-left">
          <div className="mb-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
              {/* Title */}
              <h1 className="text-white font-extrabold text-[8vw] md:text-[5vw] leading-tight tracking-tight">
                {title}
              </h1>

              {/* Add Button */}
              {!isPerson && (
                <button className="mt-2 md:mt-0 px-5 py-2 text-sm md:text-base font-medium bg-accent-primary text-black hover:bg-accent-primary-hover cursor-pointer">
                  <span className="text-xl">+</span> Add to List
                </button>
              )}
            </div>

            <p className="text-md md:text-lg text-accent-primary">
              {data.tagline}
            </p>
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

        {/* Desktop Image */}
        <div className="md:w-[30%]">
          <div
            className={`hidden md:block max-w-[360px] ${
              !isPerson && officialTrailer ? "cursor-pointer group" : ""
            }`}
            onClick={() => {
              if (!isPerson) setTrailerOpen(true);
            }}
          >
            <div className="relative w-full h-auto">
              <Image
                src={`https://image.tmdb.org/t/p/original${poster}`}
                alt={title as string}
                width={360}
                height={540}
                className="object-cover shadow-lg w-full h-auto"
                priority
              />

              {!isPerson && officialTrailer && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-14 h-14 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      {!isPerson && (credits?.cast?.length ?? 0) > 0 && (
        <section className="my-16 px-4 sm:px-6 lg:px-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Cast</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-h-96 md:max-h-none overflow-y-auto md:overflow-y-visible">
            {credits?.cast.slice(0, 12).map((actor, i) => (
              <Link
                href={`/details/person/${actor.id}`}
                key={i}
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

      {/* More recomendations section */}
      {!isPerson && (recomendations?.length ?? 0) > 0 && (
        <section className="my-16 px-4 sm:px-6 lg:px-12">
          <h2 className="text-2xl font-semibold text-white mb-6">
            More like this
          </h2>
          <Ticker items={recomendations!} name={mediaType} more={false} />
        </section>
      )}

      {/* Person known for section */}
      {isPerson && (credits?.cast?.length ?? 0) > 0 && (
        <section className="my-16 px-4 sm:px-6 lg:px-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Known For</h2>
          <Ticker items={top} more={false} />
        </section>
      )}

      {/* Trailer Ifreame */}
      {officialTrailer && trailerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-auto no-doc-scroll"
          onClick={() => setTrailerOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl aspect-video rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${officialTrailer.key}?autoplay=1`}
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Official Trailer"
              className="w-full h-full"
            ></iframe>

            {/* <button
              onClick={() => setTrailerOpen(false)}
              className="absolute top-2 right-2 bg-black bg-opacity-60 hover:bg-opacity-90 p-2 rounded-full text-white text-lg transition"
            >
              ✕
            </button> */}
          </div>
        </div>
      )}
    </>
  );
}
