const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
  },
};

export async function getTrending() {
  const url = `https://api.themoviedb.org/3/trending/all/day`;
  try {
    const res = await fetch(url, options);
    const data = res.json();
    return data;
  } catch (error) {
    throw error;
  }
}

// export async function getPopularMovies(page: number) {
//   const url = `https://api.themoviedb.org/3/movie/popular?page=${page}`;
//   try {
//     const res = await fetch(url, options);
//     const data = res.json();
//     return data;
//   } catch (error) {
//     throw error;
//   }
// }

// export async function getPopularShows(page: number) {
//   const url = `https://api.themoviedb.org/3/tv/popular?page=${page}`;
//   try {
//     const res = await fetch(url, options);
//     const data = res.json();
//     return data;
//   } catch (error) {
//     throw error;
//   }
// }

export async function getMovies(page: number, genres?: string) {
  let url = "";
  if (genres) {
    url = `https://api.themoviedb.org/3/discover/movie?page=${page}&with_genres=${genres}`;
  } else {
    url = `https://api.themoviedb.org/3/discover/movie?page=${page}`;
  }
  try {
    const res = await fetch(url, options);
    const data = res.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getShows(page: number, genres?: string) {
  let url = "";
  if (genres) {
    url = `https://api.themoviedb.org/3/discover/tv?page=${page}&with_genres=${genres}`;
  } else {
    url = `https://api.themoviedb.org/3/discover/tv?page=${page}`;
  }
  try {
    const res = await fetch(url, options);
    const data = res.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getGenres(type: string) {
  let url = ``;
  if (type === "movies") {
    url = `https://api.themoviedb.org/3/genre/movie/list`;
  } else if (type === "tv") {
    url = `https://api.themoviedb.org/3/genre/tv/list`;
  }
  try {
    const res = await fetch(url, options);
    const data = res.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getSearchResults(query: string) {
  const url = `https://api.themoviedb.org/3/search/multi?query=${query}`;
  try {
    const res = await fetch(url, options);
    const data = res.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getMovieDetails(id: string) {
  const url = `https://api.themoviedb.org/3/movie/${id}`;
  try {
    const res = await fetch(url, options);
    const data = res.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getTvDetails(id: string) {
  const url = `https://api.themoviedb.org/3/tv/${id}`;
  try {
    const res = await fetch(url, options);
    const data = res.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getPersonDetails(id: string) {
  const url = `https://api.themoviedb.org/3/person/${id}`;
  try {
    const res = await fetch(url, options);
    const data = res.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getMovieCredits(id: string) {
  const url = `https://api.themoviedb.org/3/movie/${id}/credits`;
  try {
    const res = await fetch(url, options);
    const data = res.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getTvCredits(id: string) {
  const url = `https://api.themoviedb.org/3/tv/${id}/credits`;
  try {
    const res = await fetch(url, options);
    const data = res.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getMovieRecommendations(id: string) {
  const url = `https://api.themoviedb.org/3/movie/${id}/recommendations`;
  try {
    const res = await fetch(url, options);
    const data = res.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getTvRecommendations(id: string) {
  const url = `https://api.themoviedb.org/3/tv/${id}/recommendations`;
  try {
    const res = await fetch(url, options);
    const data = res.json();
    return data;
  } catch (error) {
    throw error;
  }
}
export async function getPersonCredits(id: string) {
  const url = `https://api.themoviedb.org/3/person/${id}/combined_credits`;
  try {
    const res = await fetch(url, options);
    const data = res.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getMovieTrailer(id: string) {
  const url = `https://api.themoviedb.org/3/movie/${id}/videos`;
  try {
    const res = await fetch(url, options);
    const data = res.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getTvTrailer(id: string) {
  const url = `https://api.themoviedb.org/3/tv/${id}/videos`;
  try {
    const res = await fetch(url, options);
    const data = res.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getTvSeason(id: string, season: number) {
  const url = `https://api.themoviedb.org/3/tv/${id}/season/${season}`;
  try {
    const res = await fetch(url, options);
    const data = res.json();
    return data;
  } catch (error) {
    throw error;
  }
}
