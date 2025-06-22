"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { genre } from "@/interfaces";

export default function GenreDropdown({ genres }: { genres: genre[] }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const handleSelect = (genreId: number | null) => {
    setSelected(genreId);
    setOpen(false);
    window.location.href = genreId ? `?page=1&genres=${genreId}` : `?page=1`;
  };

  // Set initial selected genre from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const genreFromURL = params.get("genres");
    setSelected(genreFromURL ? parseInt(genreFromURL) : null);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative w-full sm:w-64 text-white">
      {/* Trigger Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full bg-gray-800 px-4 py-2 border border-gray-700 flex justify-between items-center text-sm hover:bg-gray-700 transition"
      >
        {genres.find((g) => g.id === selected)?.name || "🎬 Select Genre"}
        <svg
          className={`w-4 h-4 ml-2 transform transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {open && (
          <motion.ul
            className="absolute z-50 mt-2 w-full bg-gray-900 border border-gray-700 shadow-lg text-sm max-h-60 overflow-auto no-scrollbar"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <li
              onClick={() => handleSelect(null)}
              className={`px-4 py-2 cursor-pointer hover:bg-accent-primary-hover transition ${
                selected === null ? "bg-accent-primary-active" : ""
              }`}
            >
              All Genres
            </li>
            {genres.map((genre) => (
              <li
                key={genre.id}
                onClick={() => handleSelect(genre.id)}
                className={`px-4 py-2 cursor-pointer hover:bg-accent-primary-hover transition ${
                  selected === genre.id ? "bg-accent-primary-active" : ""
                }`}
              >
                {genre.name}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
