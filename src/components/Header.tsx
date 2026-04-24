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
    <header>
      <div className="logo" onClick={() => { navigate("/"); closeMenu(); }}>
        <img
          src="/favicon.svg"
          alt="SoSo Bakery Logo"
          className="logo-img"
          draggable={false}
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
        <h1>SoSo Bakery</h1>
      </div>

   
      <nav className="nav-desktop">
        <ul className="nav-links">
          {navItems.map(({ to, label }) => (
            <li key={to}>
              <NavLink to={to} end={to === "/"}>
                {label.split("").map((ch, i) => <span key={i}>{ch}</span>)}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="auth-buttons">
          {isLoggedIn ? (
            <>
            
              <span className="user-greeting">
                <i className="bi bi-person-circle"></i> {user?.name}
              </span>
              <button className="auth-button" onClick={() => { logout(); navigate("/"); }}>
                Logout
              </button>
            </>
          ) : (
            <>
              
              <NavLink to="/login" className="auth-button">
                <i className="bi bi-person-circle"></i> Login
              </NavLink>
              <NavLink to="/signup" className="auth-button">Signup</NavLink>
            </>
          )}
        </div>

        <button className="cart-icon" onClick={() => navigate("/cart")} aria-label="Cart">
          <span className="material-icons">shopping_cart</span>
          <span className="cart-count">{cartCount}</span>
        </button>
      </nav>

     
      <div className="nav-mobile-right">
        <button className="cart-icon" onClick={() => navigate("/cart")} aria-label="Cart">
          <span className="material-icons">shopping_cart</span>
          <span className="cart-count">{cartCount}</span>
        </button>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span className="material-icons">{menuOpen ? "close" : "menu"}</span>
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="mobile-menu">
          {navItems.map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === "/"} onClick={closeMenu}>
              {label}
            </NavLink>
          ))}
          <div className="mobile-auth">
            {isLoggedIn ? (
              <>
                <span className="user-greeting">
                  <i className="bi bi-person-circle"></i> {user?.name}
                </span>
                <button className="auth-button" onClick={() => { logout(); navigate("/"); closeMenu(); }}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login"  className="auth-button" onClick={closeMenu}>
                  <i className="bi bi-person-circle"></i> Login
                </NavLink>
                <NavLink to="/signup" className="auth-button" onClick={closeMenu}>Signup</NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}