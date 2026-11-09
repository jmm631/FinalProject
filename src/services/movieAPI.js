
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

// Search movies from OMDb API
export async function searchMovies(search, page = 1) {
  if (!API_KEY) {
    throw new Error("OMDb API key is missing. Check your .env.local file.");
  }

  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(search)}&type=movie&page=${page}`
  );

  if (!response.ok) {
    throw new Error("Failed to connect to the movie server.");
  }

  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error || "No movies found.");
  }

  return {
    movies: data.Search || [],
    totalResults: Number(data.totalResults) || 0,
  };
}

// Get complete movie information
export async function getMovieDetails(imdbID) {
  if (!API_KEY) {
    throw new Error("OMDb API key is missing. Check your .env.local file.");
  }

  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&i=${encodeURIComponent(imdbID)}&plot=full`
  );

  if (!response.ok) {
    throw new Error("Failed to load movie details.");
  }

  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error || "Movie details not found.");
  }

  return data;
}
