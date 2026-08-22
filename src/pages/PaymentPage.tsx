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


  function handleExpiryChange(val: string) {
    
    const digits = val.replace(/\D/g, "");
   
    let formatted = digits;
    if (digits.length >= 3) {
      formatted = digits.slice(0, 2) + "/" + digits.slice(2, 4);
    } else if (digits.length === 2 && !expiry.includes("/")) {
      formatted = digits + "/";
    }
    setExpiry(formatted);
    setError("");
  }

  function validateExpiry(value: string): string | null {
    if (!/^\d{2}\/\d{2}$/.test(value)) return "Expiry must be MM/YY format.";

    const [mm, yy] = value.split("/").map(Number);

    if (mm < 1 || mm > 12) return "Month must be between 01 and 12.";

    const now = new Date();
    const currentYear  = now.getFullYear() % 100; 
    const currentMonth = now.getMonth() + 1;       

  
    if (yy < currentYear) {
      return "Card has expired.";
    }
   
    if (yy === currentYear && mm < currentMonth) {
      return "Card has expired.";
    }

    return null;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name)                    { setError("Please enter cardholder name.");  return; }
    if (!/^\d{16}$/.test(number)) { setError("Card number must be 16 digits."); return; }

    const expiryError = validateExpiry(expiry);
    if (expiryError) { setError(expiryError); return; }

    if (!/^\d{3,4}$/.test(cvc))  { setError("CVC must be 3 or 4 digits.");     return; }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      clearCart();
      navigate("/");
    }, 1500);
  }

  return (
    <main className="payment-container">
      <div className="form-icon" aria-hidden="true">
        <i className="bi bi-credit-card-fill"></i>
      </div>
      <h1>Payment</h1>

      {error && <div className="form-error-banner" role="alert">{error}</div>}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="p-name">Cardholder Name</label>
          <input type="text" id="p-name" value={name}
            placeholder="Full name on card"
            autoComplete="cc-name"
            onChange={(e) => { setName(e.target.value); setError(""); }} />
        </div>

        <div className="form-group">
          <label htmlFor="p-number">Card Number</label>
          <input type="text" id="p-number" value={number}
            placeholder="1234 5678 9012 3456"
            autoComplete="cc-number"
            maxLength={16}
            onChange={(e) => { setNumber(e.target.value.replace(/\D/g, "")); setError(""); }} />
        </div>

        <div className="payment-row">
          <div className="form-group">
            <label htmlFor="p-expiry">Expiry</label>
            <input
              type="text"
              id="p-expiry"
              value={expiry}
              placeholder="MM/YY"
              autoComplete="cc-exp"
              maxLength={5}
              onChange={(e) => handleExpiryChange(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="p-cvc">CVC</label>
            <input type="text" id="p-cvc" value={cvc}
              placeholder="123"
              autoComplete="cc-csc"
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