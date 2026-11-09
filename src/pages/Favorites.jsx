
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const { favorites } = useFavorites();

  return (
    <main className="favorites-page">

      {/* Page Heading */}
      <section className="favorites-heading">
        <p className="hero-label">YOUR PERSONAL COLLECTION</p>
        <h1>My Favorites</h1>
        <p>
          Your favorite movies, all in one place.
        </p>
      </section>

      {/* Favorites List */}
      <section className="movies-section">

        {favorites.length > 0 ? (
          <>
            <div className="section-heading">
              <div>
                <h2>Saved Movies</h2>
                <p>
                  {favorites.length} favorite{" "}
                  {favorites.length === 1 ? "movie" : "movies"}
                </p>
              </div>
            </div>

            <div className="movie-grid">
              {favorites.map((movie) => (
                <MovieCard
                  key={movie.imdbID}
                  movie={movie}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="empty-results">
            <h2>No Favorites Yet</h2>
            <p>
              You haven't saved any movies to your collection.
            </p>

            <Link to="/" className="browse-btn">
              Explore Movies
            </Link>
          </div>
        )}

      </section>
    </main>
  );
}

export default Favorites;
