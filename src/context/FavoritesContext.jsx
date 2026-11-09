
import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  // Load saved favorites from localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem("cinescope-favorites");
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch {
      return [];
    }
  });

  // Save favorites whenever the list changes
  useEffect(() => {
    localStorage.setItem(
      "cinescope-favorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  // Add or remove a movie from favorites
  const toggleFavorite = (movie) => {
    setFavorites((currentFavorites) => {
      const alreadyFavorite = currentFavorites.some(
        (item) => item.imdbID === movie.imdbID
      );

      if (alreadyFavorite) {
        return currentFavorites.filter(
          (item) => item.imdbID !== movie.imdbID
        );
      }

      return [...currentFavorites, movie];
    });
  };

  // Check if a movie is already a favorite
  const isFavorite = (imdbID) => {
    return favorites.some((movie) => movie.imdbID === imdbID);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

// Custom hook for accessing favorites
export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      "useFavorites must be used inside FavoritesProvider"
    );
  }

  return context;
}
