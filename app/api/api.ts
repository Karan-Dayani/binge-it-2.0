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
