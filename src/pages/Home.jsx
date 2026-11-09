
import { useEffect, useMemo, useState } from "react";
import { searchMovies } from "../services/movieAPI";
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";

function handlePosterError(event) {
  const image = event.target;

  if (
    !(image instanceof HTMLImageElement) ||
    !image.classList.contains("movie-poster") ||
    image.dataset.fallbackApplied
  ) {
    return;
  }

  image.dataset.fallbackApplied = "true";
  image.src = "https://placehold.co/300x450/202020/ffffff?text=No+Poster";
  image.alt = "Poster unavailable";
}

function Home() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [sort, setSort] = useState("default");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);

  // Fetch movies whenever the search, page, or retry changes
  useEffect(() => {
    if (!query) {
      return;
    }

    let ignore = false;

    async function loadMovies() {
      setLoading(true);
      setError("");

      try {
        const data = await searchMovies(query, page);

        if (!ignore) {
          setMovies(data.movies);
          setTotalResults(data.totalResults);
        }
      } catch (err) {
        if (!ignore) {
          setMovies([]);
          setTotalResults(0);
          setError(err.message || "Something went wrong.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadMovies();

    return () => {
      ignore = true;
    };
  }, [query, page, retry]);

  // Handle movie search
  function handleSearch(event) {
    event.preventDefault();

    const cleanSearch = search.trim();

    if (!cleanSearch) {
      setError("Please enter a movie title.");
      return;
    }

    setPage(1);
    setQuery(cleanSearch);
  }

  // Sort movies on the current page
  const sortedMovies = useMemo(() => {
    const result = [...movies];

    if (sort === "title-asc") {
      result.sort((a, b) =>
        a.Title.localeCompare(b.Title)
      );
    } else if (sort === "title-desc") {
      result.sort((a, b) =>
        b.Title.localeCompare(a.Title)
      );
    } else if (sort === "year-desc") {
      result.sort((a, b) =>
        Number(String(b.Year).slice(0, 4)) -
        Number(String(a.Year).slice(0, 4))
      );
    } else if (sort === "year-asc") {
      result.sort((a, b) =>
        Number(String(a.Year).slice(0, 4)) -
        Number(String(b.Year).slice(0, 4))
      );
    }

    return result;
  }, [movies, sort]);

  const totalPages = Math.ceil(totalResults / 10);

  return (
    <main className="home-page">

      {/* Hero Section */}
      <section className="hero-section">
        <p className="hero-label">YOUR MOVIE DISCOVERY PLATFORM</p>

        <h1>
          Discover Your Next
          <span> Favorite Movie</span>
        </h1>

        <p className="hero-description">
          Explore movies, discover stories, and save your
          favorite films in one place.
        </p>

        {/* Search Form */}
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for a movie..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <button type="submit">
            Search
          </button>
        </form>
      </section>

      {/* Movie Results */}
      <section className="movies-section">

        <div className="section-heading">
          <div>
            <h2>Explore Movies</h2>
            <p>
              {totalResults > 0
                ? `${totalResults} movies found`
                : "Find movies you will love"}
            </p>
          </div>

          {/* Sorting */}
          <select
            className="sort-select"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option value="default">Default</option>
            <option value="title-asc">Title: A to Z</option>
            <option value="title-desc">Title: Z to A</option>
            <option value="year-desc">Newest First</option>
            <option value="year-asc">Oldest First</option>
          </select>
        </div>

        {/* Loading State */}
        {loading && <Loading />}

        {/* Error State */}
        {!loading && error && (
          <div className="error-message">
            <h3>Unable to Load Movies</h3>
            <p>{error}</p>

            <button
              onClick={() => setRetry((value) => value + 1)}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Movie Grid */}
        {!loading && !error && (
          <>
            {sortedMovies.length > 0 ? (
              <div className="movie-grid" onErrorCapture={handlePosterError}>
                {sortedMovies.map((movie) => (
                  <MovieCard
                    key={movie.imdbID}
                    movie={movie}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-results">
                <h3>{query ? "No Movies Found" : "Ready to Explore?"}</h3>
                <p>
                  {query
                    ? "Try searching for another movie title."
                    : "Search for a movie to see results here."}
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((current) => current - 1)}
                >
                  Previous
                </button>

                <span>
                  Page {page} of {totalPages}
                </span>

                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage((current) => current + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

      </section>
    </main>
  );
}

export default Home;
