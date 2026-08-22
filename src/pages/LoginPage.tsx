import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const navigate  = useNavigate();
  const { login } = useAuth();

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email)    { setError("Please enter your email.");    return; }
    if (!password) { setError("Please enter your password."); return; }
    setLoading(true);
    setTimeout(() => {
      const result = login(email, password);
      setLoading(false);
      if (result.ok) { navigate("/"); }
      else { setError(result.error ?? "Invalid email or password."); }
    }, 400);
  }

  return (
    <main>
      <section className="login-section">
        <div className="form-icon" aria-hidden="true">
          <i className="bi bi-person-circle"></i>
        </div>
        <h1>Login</h1>

        {error && <div className="form-error-banner" role="alert">{error}</div>}

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="login-email">Email</label>
          <input type="email" id="login-email" value={email}
            placeholder="your@email.com"
            autoComplete="email"
            onChange={(e) => { setEmail(e.target.value); setError(""); }} />

          <label htmlFor="login-password">Password</label>
          <input type="password" id="login-password" value={password}
            placeholder="Password"
            autoComplete="current-password"
            onChange={(e) => { setPassword(e.target.value); setError(""); }} />

          <button type="submit" className="cta-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="register-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </section>
    </main>
  );
}