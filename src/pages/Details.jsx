
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieDetails } from "../services/movieAPI";
import { useFavorites } from "../context/FavoritesContext";
import Loading from "../components/Loading";

function Details() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { toggleFavorite, isFavorite } = useFavorites();

  // Fetch complete movie information
  useEffect(() => {
    let ignore = false;

    async function loadDetails() {
      setLoading(true);
      setError("");

      try {
        const data = await getMovieDetails(id);

        if (!ignore) {
          setMovie(data);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || "Unable to load movie details.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadDetails();

    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error || !movie) {
    return (
      <main className="details-page">
        <div className="error-message">
          <h2>Unable to Load Movie</h2>
          <p>{error || "Movie information is unavailable."}</p>
          <Link to="/" className="back-link">
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  const favorite = isFavorite(movie.imdbID);

  const poster =
    movie.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : "https://placehold.co/400x600/202020/ffffff?text=No+Poster";

  return (
    <main className="details-page">
      <Link to="/" className="back-link">
        ← Back to Movies
      </Link>

      <section className="details-container">

        {/* Movie Poster */}
        <div className="details-poster">
          <img src={poster} alt={`${movie.Title} poster`} />
        </div>

        {/* Movie Information */}
        <div className="details-content">
          <p className="details-label">MOVIE INFORMATION</p>

          <h1>{movie.Title}</h1>

          <div className="details-meta">
            <span>{movie.Year}</span>
            <span>{movie.Rated}</span>
            <span>{movie.Runtime}</span>
          </div>

          <div className="imdb-rating">
            <span>IMDb Rating</span>
            <strong>
              {movie.imdbRating && movie.imdbRating !== "N/A"
                ? `⭐ ${movie.imdbRating}/10`
                : "Not rated"}
            </strong>
          </div>

          <div className="details-group">
            <h3>Genre</h3>
            <p>{movie.Genre || "Not available"}</p>
          </div>

          <div className="details-group">
            <h3>Director</h3>
            <p>{movie.Director || "Not available"}</p>
          </div>

          <div className="details-group">
            <h3>Actors</h3>
            <p>{movie.Actors || "Not available"}</p>
          </div>

          <div className="details-group">
            <h3>Plot</h3>
            <p>{movie.Plot || "No plot description available."}</p>
          </div>

          <button
            className={`details-favorite-btn ${
              favorite ? "favorited" : ""
            }`}
            onClick={() => toggleFavorite(movie)}
          >
            {favorite
              ? "♥ Remove from Favorites"
              : "♡ Add to Favorites"}
          </button>
        </div>

      </section>
    </main>
  );
}

export default Details;
