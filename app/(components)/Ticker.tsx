"use client";
import React, { useRef, useState, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { item } from "@/interfaces";

export default function Ticker({
  items,
  name,
  more = true,
}: {
  items: item[];
  name?: string;
  more?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });
  const [isDragging, setIsDragging] = useState(false);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;

    if (container && content) {
      const containerWidth = container.offsetWidth;
      const contentWidth = content.scrollWidth;
      const dragLimit = contentWidth - containerWidth;
      setConstraints({ left: -dragLimit, right: 0 });
    }
  }, [items]);

  const handleClick = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault(); // Cancel navigation if dragging
    }
  };

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
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setTimeout(() => setIsDragging(false), 50)} // small delay
      >
        {items.map((item, i) => (
          <div key={i} className="w-[150px] flex-shrink-0">
            <Link
              href={`/details/${name || item.media_type}/${item.id}`}
              onClick={handleClick}
              draggable={false}
            >
              <Image
                src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                alt={item.title || "poster"}
                width={500}
                height={750}
                draggable={false}
                className="w-full h-auto shadow-md object-cover hover:scale-110 transition-transform duration-200 ease-in-out"
              />
            </Link>
          </div>
        ))}
        {more && (
          <Link
            href={`/${name}`}
            className="bg-accent-primary min-w-[150px] text-black flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-200 ease-in-out"
          >
            See More...
          </Link>
        )}
      </motion.div>
    </div>
  );
}
