import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { fetchDashboardSummary } from "../services/api.js";
import LoadingState from "../components/LoadingState.jsx";
import { ErrorState } from "../components/LoadingState.jsx";

export default function Dashboard() {
  const { logout } = useAuth();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadSummary = async () => {
      try {
        const data = await fetchDashboardSummary();
        if (active) {
          setSummary(data);
          setError("");
        }
      } catch (requestError) {
        if (active) {
          setError(requestError.message || "Unable to load dashboard data.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadSummary();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <LoadingState message="Loading dashboard..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <section className="page-shell">
      <div className="container">
        <div className="dashboard-header">
          <div>
            <span className="eyebrow">Operations</span>
            <h1>YPX Studios dashboard</h1>
          </div>
          <button type="button" className="button button-secondary" onClick={logout}>
            Log out
          </button>
        </div>

        <div className="stat-grid">
          {summary?.stats?.map((item) => (
            <article key={item.label} className="stat-card">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </article>
          ))}
        </div>

        <div className="two-column-grid">
          <div className="panel">
            <h3>Recent leads</h3>
            <ul className="list-panel">
              {summary?.recentLeads?.map((lead) => (
                <li key={lead.id}>
                  <div>
                    <strong>{lead.name}</strong>
                    <small>{lead.service}</small>
                  </div>
                  <span className="pill">{lead.status}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel">
            <h3>Pipeline</h3>
            <ul className="list-panel">
              {summary?.pipeline?.map((item) => (
                <li key={item.title}>
                  <div>
                    <strong>{item.title}</strong>
                  </div>
                  <span className="pill accent">{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
