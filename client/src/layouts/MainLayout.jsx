import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { CONFIG, waLink } from "../config.js";

const links = [
  ["/", "Home"],
  ["/services", "Services"],
  ["/portfolio", "Portfolio"],
  ["/contact", "Contact"],
];

export default function MainLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="container nav-bar">
          <Link to="/" className="brand-mark" aria-label="YPX Studios home">
            YPX<span>.</span>Studios
          </Link>

          <button
            type="button"
            className="menu-button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            ☰
          </button>

          <nav className={menuOpen ? "main-nav open" : "main-nav"}>
            {links.map(([to, label]) => (
              <NavLink key={to} to={to} end={to === "/"}>
                {label}
              </NavLink>
            ))}

            {isAuthenticated ? (
              <NavLink to="/dashboard">Dashboard</NavLink>
            ) : (
              <NavLink to="/login">Login</NavLink>
            )}

            <Link to="/enquiry" className="button button-primary nav-button">
              Start a project
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <strong>{CONFIG.brand}</strong>
            <p>Creative • Technology • Digital Solutions</p>
          </div>

          <div>
            <p>📧 {CONFIG.email}</p>
            <p>📍 {CONFIG.location}</p>
            <p>
              <a href={CONFIG.instagram} target="_blank" rel="noreferrer noopener">
                Instagram: {CONFIG.instagram.replace("https://instagram.com/", "@")}
              </a>
            </p>
          </div>
        </div>
      </footer>

      <a className="floating-whatsapp" href={waLink()} target="_blank" rel="noreferrer noopener" aria-label="Chat on WhatsApp">
        💬
      </a>
    </div>
  );
}
