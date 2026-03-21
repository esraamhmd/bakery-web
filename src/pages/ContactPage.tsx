import { useState } from "react";

const COMMON_DOMAINS = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];

export default function ContactPage() {
  const [name,       setName]       = useState("");
  const [email,      setEmail]      = useState("");
  const [message,    setMessage]    = useState("");
  const [error,      setError]      = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [sent,       setSent]       = useState(false);

  function handleEmailChange(val: string) {
    setEmail(val);
    setError("");
    const atIdx = val.indexOf("@");
    if (atIdx !== -1) {
      const typed = val.slice(atIdx + 1).toLowerCase();
      if (typed.length > 0 && !typed.includes(".")) {
        const match = COMMON_DOMAINS.find((d) => d.startsWith(typed));
        setSuggestion(match ? val.slice(0, atIdx + 1) + match : "");
      } else {
        setSuggestion("");
      }
    } else {
      setSuggestion("");
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name)                       { setError("Please enter your name.");    return; }
    if (!email)                      { setError("Please enter your email.");   return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError("Please enter a valid email."); return; }
    if (!message.trim())             { setError("Please enter your message."); return; }

    setSent(true);
    setName(""); setEmail(""); setMessage(""); setSuggestion("");
    // auto-dismiss toast after 4 seconds
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <main>
      {sent && (
        <div className="contact-toast">
          Message sent! We'll get back to you soon.
        </div>
      )}

      <section className="contact">
        <div className="form-icon">
          <i className="bi bi-envelope-fill"></i>
        </div>
        <h2>Contact Us</h2>

        {error && <div className="form-error-banner">{error}</div>}

        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="c-name">Name</label>
          <input type="text" id="c-name" value={name} placeholder="Your name"
            onChange={(e) => { setName(e.target.value); setError(""); }} />

          <label htmlFor="c-email">Email</label>
          <div className="email-wrapper">
            <input
              type="email"
              id="c-email"
              value={email}
              placeholder="your@email.com"
              onChange={(e) => handleEmailChange(e.target.value)}
              autoComplete="email"
            />
            {suggestion && (
              <div className="email-suggestion"
                onClick={() => { setEmail(suggestion); setSuggestion(""); }}>
                Did you mean <strong>{suggestion}</strong>? Tap to use
              </div>
            )}
          </div>

          <label htmlFor="c-message">Message</label>
          <textarea id="c-message" rows={5} value={message} placeholder="How can we help?"
            onChange={(e) => { setMessage(e.target.value); setError(""); }} />

          <button type="submit" className="cta-button">Send Message</button>
        </form>
      </section>
    </main>
  );
}