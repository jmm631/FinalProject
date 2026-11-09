
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { FavoritesProvider } from "./context/FavoritesContext";

import Header from "./components/Header";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Favorites from "./pages/Favorites";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <div className="app-container">

          {/* Website Navigation */}
          <Header />

          {/* Application Pages */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<Details />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>

          {/* Footer */}
          <footer className="footer">
            <p>
              © {new Date().getFullYear()} CineScope.
              All rights reserved.
            </p>
            <p>Discover. Explore. Enjoy.</p>
          </footer>

        </div>
      </FavoritesProvider>
    </BrowserRouter>
  );
}

export default App;
