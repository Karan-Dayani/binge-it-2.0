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

export async function getPopularMovies(page: number) {
  const url = `https://api.themoviedb.org/3/movie/popular?page=${page}`;
  try {
    const res = await fetch(url, options);
    const data = res.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getPopularShows(page: number) {
  const url = `https://api.themoviedb.org/3/tv/popular?page=${page}`;
  try {
    const res = await fetch(url, options);
    const data = res.json();
    return data;
  } catch (error) {
    throw error;
  }
}
