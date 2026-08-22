import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { isLoggedIn, user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { to: "/",        label: "Home"     },
    { to: "/menu",    label: "Menu"     },
    { to: "/aboutus", label: "About Us" },
    { to: "/contact", label: "Contact"  },
  ];

  function closeMenu() { setMenuOpen(false); }

  return (
    <header role="banner">
      <div className="logo" onClick={() => { navigate("/"); closeMenu(); }}>
        <img
          src="/favicon.svg"
          alt="SoSo Bakery home"
          className="logo-img"
          width={44}
          height={44}
          draggable={false}
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
       
        <p className="logo-title">SoSo Bakery</p>
      </div>

    
      <nav className="nav-desktop" aria-label="Main navigation">
        <ul className="nav-links">
          {navItems.map(({ to, label }) => (
            <li key={to}>
            
              <NavLink to={to} end={to === "/"} aria-label={label}>
                {label.split("").map((ch, i) => <span key={i}>{ch}</span>)}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="auth-buttons">
          {isLoggedIn ? (
            <>
              <span className="user-greeting">
                <i className="bi bi-person-circle" aria-hidden="true"></i> {user?.name}
              </span>
              <button
                className="auth-button"
                onClick={() => { logout(); navigate("/"); }}
                aria-label="Logout"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="auth-button" aria-label="Login to your account">
                <i className="bi bi-person-circle" aria-hidden="true"></i> Login
              </NavLink>
              <NavLink to="/signup" className="auth-button" aria-label="Sign up for an account">
                Signup
              </NavLink>
            </>
          )}
        </div>

        <button
          className="cart-icon"
          onClick={() => navigate("/cart")}
          aria-label={`Shopping cart with ${cartCount} items`}
        >
          <span className="material-icons" aria-hidden="true">shopping_cart</span>
          <span className="cart-count" aria-hidden="true">{cartCount}</span>
        </button>
      </nav>

     
      <div className="nav-mobile-right">
        <button
          className="cart-icon"
          onClick={() => navigate("/cart")}
          aria-label={`Shopping cart with ${cartCount} items`}
        >
          <span className="material-icons" aria-hidden="true">shopping_cart</span>
          <span className="cart-count" aria-hidden="true">{cartCount}</span>
        </button>
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span className="material-icons" aria-hidden="true">{menuOpen ? "close" : "menu"}</span>
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <nav className="mobile-menu" aria-label="Mobile navigation">
          {navItems.map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === "/"} onClick={closeMenu} aria-label={label}>
              {label}
            </NavLink>
          ))}
          <div className="mobile-auth">
            {isLoggedIn ? (
              <>
                <span className="user-greeting">
                  <i className="bi bi-person-circle" aria-hidden="true"></i> {user?.name}
                </span>
                <button
                  className="auth-button"
                  onClick={() => { logout(); navigate("/"); closeMenu(); }}
                  aria-label="Logout"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="auth-button" onClick={closeMenu} aria-label="Login">
                  <i className="bi bi-person-circle" aria-hidden="true"></i> Login
                </NavLink>
                <NavLink to="/signup" className="auth-button" onClick={closeMenu} aria-label="Sign up">
                  Signup
                </NavLink>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}