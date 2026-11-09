
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

function MovieCard({ movie }) {
  const { toggleFavorite, isFavorite } = useFavorites();

  const favorite = isFavorite(movie.imdbID);

  const poster =
    movie.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : "https://placehold.co/300x450/202020/ffffff?text=No+Poster";

  return (
    <div className="movie-card">

      {/* Movie Poster */}
      <Link to={`/movie/${movie.imdbID}`} className="movie-poster-link">
        <img
          src={poster}
          alt={`${movie.Title} poster`}
          className="movie-poster"
          loading="lazy"
        />
      </Link>

      {/* Favorite Button */}
      <button
        className={`favorite-btn ${favorite ? "favorited" : ""}`}
        onClick={() => toggleFavorite(movie)}
        aria-label={
          favorite ? "Remove from favorites" : "Add to favorites"
        }
        title={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "♥" : "♡"}
      </button>

      {/* Movie Information */}
      <div className="movie-info">
        <Link
          to={`/movie/${movie.imdbID}`}
          className="movie-title"
        >
          {movie.Title}
        </Link>

        <p className="movie-year">{movie.Year}</p>
      </div>

    </div>
  );
}

export default MovieCard;
