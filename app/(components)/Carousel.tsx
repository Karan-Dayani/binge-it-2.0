"use client";
import { item } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useCallback, useRef } from "react";

export default function Carousel({
  data,
  interval = 5000,
}: {
  data: item[];
  interval?: number;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerId = useRef<NodeJS.Timeout | null>(null);

  // Next and Prev handlers
  const next = useCallback(() => {
    setCurrentIndex((currentIndex) => (currentIndex + 1) % data.length);
  }, [data.length]);

  const prev = () => {
    setCurrentIndex(
      (currentIndex) => (currentIndex - 1 + data.length) % data.length
    );
  };

  // Start autoplay
  const start = useCallback(() => {
    if (timerId.current) clearInterval(timerId.current);
    timerId.current = setInterval(next, interval);
  }, [next, interval]);

  // Pause autoplay
  const pause = () => {
    if (timerId.current) {
      clearInterval(timerId.current);
      timerId.current = null;
    }
  };

  // Auto-play on component mount
  useEffect(() => {
    start();

    return () => pause();
  }, [start]);

  return (
    <div
      className="relative w-full h-[400px] md:h-[calc(100vh-64px)] overflow-hidden"
      onMouseEnter={pause}
      onMouseLeave={start}
    >
      {data?.map((movie, idx) => (
        <div
          key={movie?.id}
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
            idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Black overlay */}
          <div className=" absolute inset-0 bg-black/30 md:bg-black/50" />

          {/* Content */}
          <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between h-full px-6 md:px-20 py-10 text-white">
            {/* Poster */}
            <div className="hidden md:flex w-1/3 justify-center">
              <Image
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie?.title || (movie?.name as string)}
                width={300}
                height={450}
                className="shadow-xl/50"
              />
            </div>

            {/* Text Content */}
            <div className="w-full md:w-2/3 space-y-4 text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-extrabold text-accent-primary text-shadow-lg/50">
                {movie?.title || movie?.name}
              </h2>
              <p className="text-lg leading-6 hidden md:block">
                {movie?.overview}
              </p>
              <Link
                href={"#"}
                className="inline-block bg-accent-primary text-black px-6 py-2 font-medium hover:bg-accent-primary-hover transition shadow-lg/50"
              >
                More...
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Prev/next controls */}
      <button
        onClick={prev}
        aria-label="Previous"
        className="absolute z-50 top-0 left-0 h-full px-4 text-4xl text-accent-primary md:bg-black/30 hover:bg-black/50 transition"
      >
        ❮
      </button>
      <button
        onClick={next}
        aria-label="Next"
        className="absolute z-50 top-0 right-0 h-full px-4 text-4xl text-accent-primary md:bg-black/30 hover:bg-black/50 transition"
      >
        ❯
      </button>
    </div>
  );
}
