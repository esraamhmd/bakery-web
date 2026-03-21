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

    // short clean validation — same as real websites
    if (!email)    { setError("Please enter your email.");    return; }
    if (!password) { setError("Please enter your password."); return; }

    setLoading(true);
    setTimeout(() => {
      const result = login(email, password);
      setLoading(false);
      if (result.ok) {
        navigate("/");
      } else {
        setError(result.error ?? "Invalid email or password.");
      }
    }, 400);
  }

  return (
    <main>
      <section className="login-section">
        {/* Bootstrap person-circle icon */}
        <div className="form-icon">
          <i className="bi bi-person-circle"></i>
        </div>
        <h2>Login</h2>

        {error && <div className="form-error-banner">{error}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} placeholder="your@email.com"
            onChange={(e) => { setEmail(e.target.value); setError(""); }} />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} placeholder="Password"
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