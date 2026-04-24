import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function PaymentPage() {
  const navigate      = useNavigate();
  const { clearCart } = useCart();

  const [name,    setName]    = useState("");
  const [number,  setNumber]  = useState("");
  const [expiry,  setExpiry]  = useState("");
  const [cvc,     setCvc]     = useState("");
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name)                          { setError("Please enter cardholder name.");   return; }
    if (!/^\d{16}$/.test(number))       { setError("Card number must be 16 digits.");  return; }
    if (!/^\d{2}\/\d{2}$/.test(expiry)) { setError("Expiry must be MM/YY format.");    return; }
    if (!/^\d{3,4}$/.test(cvc))         { setError("CVC must be 3 or 4 digits.");      return; }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      clearCart();
      navigate("/");
    }, 1500);
  }

  return (
    <main className="payment-container">
      {/* Bootstrap credit-card icon */}
      <div className="form-icon">
        <i className="bi bi-credit-card-fill"></i>
      </div>
      <h2>Payment</h2>

      {error && <div className="form-error-banner">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="p-name">Cardholder Name</label>
          <input type="text" id="p-name" value={name} placeholder="Full name on card"
            onChange={(e) => { setName(e.target.value); setError(""); }} />
        </div>

        <div className="form-group">
          <label htmlFor="p-number">Card Number</label>
          <input type="text" id="p-number" value={number} placeholder="1234 5678 9012 3456"
            maxLength={16}
            onChange={(e) => { setNumber(e.target.value.replace(/\D/g, "")); setError(""); }} />
        </div>

        <div className="payment-row">
          <div className="form-group">
            <label htmlFor="p-expiry">Expiry</label>
            <input type="text" id="p-expiry" value={expiry} placeholder="MM/YY"
              maxLength={5}
              onChange={(e) => { setExpiry(e.target.value); setError(""); }} />
          </div>
          <div className="form-group">
            <label htmlFor="p-cvc">CVC</label>
            <input type="text" id="p-cvc" value={cvc} placeholder="123"
              maxLength={4}
              onChange={(e) => { setCvc(e.target.value.replace(/\D/g, "")); setError(""); }} />
          </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </main>
  );
}