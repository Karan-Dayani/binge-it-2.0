import React from "react";
import SearchInput from "../(components)/SearchInput";
import { getSearchResults } from "../api/api";
import { data } from "@/interfaces";
import Showcase from "../(components)/Showcase";

export default async function Search({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  const query = searchParams?.query;
  const result: data = query && (await getSearchResults(query));
  console.log(result?.results);
  return (
    <div className="px-4 sm:px-10 pt-6 pb-10">
      <SearchInput />
      {result ? (
        result.results?.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            No results found for &quot;
            <span className="text-white">{query}</span>&quot;
          </div>
        ) : (
          <Showcase data={result} />
        )
      ) : (
        <div className="text-center text-gray-500 mt-10">
          Looking for something? Try searching for movies, shows or actors.
        </div>
      )}
    </div>
  );
}
