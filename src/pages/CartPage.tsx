import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import type { CartItem } from "../context/CartContext";

const itemImages: Record<string, string> = {
  "Classic Baguette":  "Classic Baguette.jpg",
  "Sourdough Bread":   "Sourdough Bread.jpg",
  "Multigrain Bread":  "Multigrain Bread.jpg",
  "Focaccia":          "Focaccia.jpg",
  "Flaky Croissants":  "Flaky Croissants.jpg",
  "Chocolate Danish":  "Chocolate Danish.jpg",
  "Almond Croissant":  "Almond Croissant.jpg",
  "Fruit Tart":        "Fruit Tart.jpg",
  "Cinnamon Roll":     "Cinnamon Roll.jpg",
  "Blueberry Muffin":  "Blueberry Muffin.jpg",
  "Chocolate Muffin":  "Chocolate Muffin.jpg",
  "Cheese Danish":     "Cheese Danish.jpg",
  "Brioche Loaf":      "Brioche Loaf.jpg",
  "Garlic Bread":      "garlic bread.jpg",
  "Pretzel":           "Pretzel.jpg",
  "Apple Pie":         "Apple Pie.jpg",
};

const FALLBACK = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='90'%3E%3Crect width='90' height='90' fill='%23f8e1d1'/%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' font-size='32'%3E%F0%9F%8D%9E%3C/text%3E%3C/svg%3E";

export default function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const total = cart.reduce(
    (acc: number, item: CartItem) => acc + item.price * item.quantity, 0
  );

  function checkout() {
    if (cart.length === 0) {
      alert("Your cart is empty. Please add items before checking out.");
    } else {
      navigate("/payment");
    }
  }

  return (
    <main className="cart-container">
      <h1>Your Cart</h1>

      <div className="cart-items">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item: CartItem) => (
            <div key={item.name} className="card">
              <div className="card-body">
                <img
                  src={`/imgs/${itemImages[item.name] ?? item.name.toLowerCase().replace(/ /g, "-") + ".jpg"}`}
                  alt={item.name}
                  className="cart-item-img"
                  /* FIX CLS: explicit dimensions */
                  width={90}
                  height={90}
                  onError={(e) => { e.currentTarget.src = FALLBACK; }}
                />
                <div className="cart-item-info">
                  <h2>{item.name}</h2>
                  <p>Price: ${item.price.toFixed(2)}</p>
                  <p>
                    Quantity:
                    <input
                      type="number"
                      value={item.quantity}
                      min={1}
                      aria-label={`Quantity for ${item.name}`}
                      onChange={(e) =>
                        updateQuantity(item.name, parseInt(e.target.value, 10))
                      }
                    />
                  </p>
                  <button
                    className="remove-item"
                    aria-label={`Remove ${item.name} from cart`}
                    onClick={() => removeFromCart(item.name)}
                  >
                    Remove
                  </button>
                </div>
                <div className="cart-item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="cart-summary">
        <h2>Total: ${total.toFixed(2)}</h2>
        <div className="cart-summary-buttons">
          {cart.length > 0 && (
            <button className="clear-cart" onClick={clearCart}>Clear Cart</button>
          )}
          <button className="checkout-button" onClick={checkout}>Pay</button>
        </div>
      </div>
    </main>
  );
}