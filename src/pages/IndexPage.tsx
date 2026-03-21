import { useNavigate } from "react-router-dom";

export default function IndexPage() {
  const navigate = useNavigate();

  return (
    <main>
      <section className="hero">
        <h2>Freshly Baked Goods Every Day!</h2>
        <p>Discover the best bakery items made with love and care.</p>
        <a
          href="#"
          className="cta-button"
          onClick={(e) => { e.preventDefault(); navigate("/menu"); }}
        >
          Explore Our Menu
        </a>
      </section>

      <section className="highlights">
        <a className="highlight-item" onClick={() => navigate("/menu")} style={{ cursor: "pointer" }}>
          <span className="material-icons">local_cafe</span>
          <h3>Artisan Breads</h3>
          <p>Handcrafted breads baked fresh every day with organic ingredients.</p>
        </a>
        <a className="highlight-item" onClick={() => navigate("/menu")} style={{ cursor: "pointer" }}>
          <span className="material-icons">cake</span>
          <h3>Delicious Pastries</h3>
          <p>Enjoy our range of flaky croissants, buttery danishes, and more.</p>
        </a>
        <a className="highlight-item" onClick={() => navigate("/menu")} style={{ cursor: "pointer" }}>
          <span className="material-icons">celebration</span>
          <h3>Custom Cakes</h3>
          <p>Order custom cakes for special occasions with our talented decorators.</p>
        </a>
      </section>
    </main>
  );
}