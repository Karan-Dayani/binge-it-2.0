"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchInput() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery.trim()) {
      params.set("query", searchQuery.trim());
    } else {
      params.delete("query");
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex justify-center w-full px-4 mt-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        className="flex w-full max-w-xl items-center bg-[#1e1e1e] border border-gray-700 overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-accent-primary transition-all duration-200"
      >
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search movies, shows..."
          className="flex-grow px-5 py-3 bg-transparent text-white placeholder-gray-500 text-sm sm:text-base focus:outline-none"
        />
        <button
          type="submit"
          className="bg-accent-primary hover:bg-accent-primary-hover text-sm sm:text-base text-white px-5 py-3 font-medium transition"
        >
          Search
        </button>
      </form>
    </div>
  );
}
