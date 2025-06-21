"use client";
import React, { useRef, useState, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { item } from "@/interfaces";

export default function Ticker({
  items,
  name,
}: {
  items: item[];
  name?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });

  useLayoutEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;

    if (container && content) {
      const containerWidth = container.offsetWidth;
      const contentWidth = content.scrollWidth;

      const dragLimit = contentWidth - containerWidth;
      setConstraints({
        left: -dragLimit,
        right: 0,
      });
    }
  }, [items]);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden md:overflow-visible bg-background text-white select-none"
    >
      <motion.div
        ref={contentRef}
        drag="x"
        dragConstraints={constraints}
        dragElastic={0.1}
        className="flex gap-5 px-10 whitespace-nowrap cursor-grab active:cursor-grabbing transform-gpu"
      >
        {items.map((item, i) => (
          <Image
            key={i}
            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            alt={item.title || "poster"}
            width={500}
            height={500}
            draggable={false}
            className="w-[150px] h-auto shadow-md object-cover hover:scale-110 transition-transform duration-200 ease-in-out"
          />
        ))}
        <Link
          href={`/${name}`}
          className="bg-accent-primary min-w-[150px] text-black flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-200 ease-in-out"
        >
          See More...
        </Link>
      </motion.div>
    </div>
  );
}
