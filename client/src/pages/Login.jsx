import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/dashboard";

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = {};
    if (!form.email.trim()) nextErrors.email = "Email is required.";
    if (!form.password.trim()) nextErrors.password = "Password is required.";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    try {
      setLoading(true);
      setSubmitError("");
      await login(form);
      navigate(from, { replace: true });
    } catch (error) {
      setSubmitError(error.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page-shell">
      <div className="container narrow">
        <div className="panel auth-panel">
          <div className="panel-header">
            <span className="eyebrow">Client access</span>
            <h1>Admin login</h1>
          </div>

          <form className="form-grid" onSubmit={handleSubmit} noValidate>
            <label className="field-block">
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                placeholder="admin@ypxstudios.com"
              />
              <small className="field-error">{errors.email || ""}</small>
            </label>

            <label className="field-block">
              <span>Password</span>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={onChange}
                placeholder="Enter your password"
              />
              <small className="field-error">{errors.password || ""}</small>
            </label>

            {submitError ? <div className="inline-error">{submitError}</div> : null}

            <button className="button button-primary" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
