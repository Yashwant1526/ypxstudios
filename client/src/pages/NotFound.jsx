import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="page-shell">
      <div className="container narrow">
        <div className="panel empty-state">
          <span className="eyebrow">404</span>
          <h1>Page not found</h1>
          <p>The page you were looking for does not exist or has moved.</p>
          <Link className="button button-primary" to="/">
            Return home
          </Link>
        </div>
      </div>
    </section>
  );
}
