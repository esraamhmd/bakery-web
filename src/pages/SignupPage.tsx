import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SignupPage() {
  const navigate   = useNavigate();
  const { signup } = useAuth();

  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [confirm,  setConfirm]  = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    
    if (!name)                    { setError("Please enter your name.");              return; }
    if (!email)                   { setError("Please enter your email.");             return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError("Please enter a valid email.");      return; }
    if (!password)                { setError("Please enter a password.");             return; }
    if (password.length < 6)      { setError("Password must be at least 6 chars.");  return; }
    if (password !== confirm)     { setError("Passwords do not match.");              return; }

    setLoading(true);
    setTimeout(() => {
      const result = signup(name, email, password);
      setLoading(false);
      if (result.ok) {
        navigate("/");
      } else {
        setError(result.error ?? "Something went wrong.");
      }
    }, 400);
  }

  return (
    <main>
      <section className="signup-section">
        
        <div className="form-icon">
          <i className="bi bi-person-plus-fill"></i>
        </div>
        <h2>Create Account</h2>

        {error && <div className="form-error-banner">{error}</div>}

        <form className="signup-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={name} placeholder="Your name"
            onChange={(e) => { setName(e.target.value); setError(""); }} />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} placeholder="your@email.com"
            onChange={(e) => { setEmail(e.target.value); setError(""); }} />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} placeholder="Min. 6 characters"
            onChange={(e) => { setPassword(e.target.value); setError(""); }} />

          <label htmlFor="confirm">Confirm Password</label>
          <input type="password" id="confirm" value={confirm} placeholder="Repeat password"
            onChange={(e) => { setConfirm(e.target.value); setError(""); }} />

          <button type="submit" className="cta-button" disabled={loading}>
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </section>
    </main>
  );
}