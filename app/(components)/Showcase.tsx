"use client";

import React, { useState } from "react";
import Image from "next/image";
import { data } from "@/interfaces";
import { motion } from "framer-motion";
import { IoBookmarksOutline } from "react-icons/io5";
import Link from "next/link";

const Showcase = ({ data, location }: { data: data; location: string }) => {
  const fallbackSrc = "/fallback.jpeg";
  const [fallbackMap, setFallbackMap] = useState<Record<number, boolean>>({});

  const handleError = (id: number) => {
    setFallbackMap((prev) => ({ ...prev, [id]: true }));
  };

  const handleAddToList = (id: number) => {
    console.log("Add to list:", id);
    // You can enhance this with toast/success indicator
  };

  return (
    <div className="py-6">
      <div className="flex flex-wrap justify-center gap-8">
        {data.results.map((item, i) => {
          const showFallback = fallbackMap[item.id];
          const title = item.title || item.name;
          const secondaryText =
            item.release_date?.split("-").reverse().join("/") ||
            item.first_air_date?.split("-").reverse().join("/") ||
            item.known_for_department ||
            "Unknown Date";
          const isMedia =
            location === "search"
              ? item.media_type === "movie" || item.media_type === "tv"
              : true;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  delay: i * 0.05,
                  duration: 0.4,
                  ease: "easeOut",
                },
              }}
              whileHover={{ scale: 1.05 }}
              className="relative bg-gray-900 text-white overflow-hidden shadow-md w-[140px] sm:w-[160px] md:w-[180px] hover:shadow-xl transition duration-300"
            >
              <Link href={`/details/${item.media_type || location}/${item.id}`}>
                {/* Poster */}
                <div className="relative w-full aspect-[2/3]">
                  <Image
                    src={
                      showFallback
                        ? fallbackSrc
                        : `https://image.tmdb.org/t/p/original/${
                            item.poster_path || item.profile_path
                          }`
                    }
                    alt={(item.title as string) || (item.name as string)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 45vw, 180px"
                    onError={() => handleError(item.id)}
                  />
                </div>

                {/* Content */}
                <div className="p-2 sm:p-3">
                  <h2 className="text-xs sm:text-sm text-text-primary font-semibold leading-tight truncate">
                    {title}
                  </h2>
                  {secondaryText}
                </div>

                {/* Add Button (only if it's a movie or TV) */}
                {isMedia && (
                  <button
                    onClick={() => handleAddToList(item.id)}
                    className="absolute bottom-0 right-0 p-2 bg-accent-primary text-white hover:bg-accent-primary-hover transition"
                    aria-label="Add to list"
                  >
                    <IoBookmarksOutline className="size-4 stroke-3" />
                  </button>
                )}
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Showcase;
