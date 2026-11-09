
import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="header-container">

        {/* CineScope Logo */}
        <Link to="/" className="logo">
          <span className="logo-icon">C</span>
          <span>CineScope</span>
        </Link>

        {/* Navigation Links */}
        <nav className="navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            My Favorites
          </NavLink>
        </nav>

      </div>
    </header>
  );
}

export default Header;
