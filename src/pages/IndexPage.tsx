import { useNavigate } from "react-router-dom";

export default function IndexPage() {
  const navigate = useNavigate();

  return (
    <main>
      <section className="hero">
      
        <h1>Freshly Baked Goods Every Day!</h1>
        <p>Discover the best bakery items made with love and care.</p>
        <a
          href="/menu"
          className="cta-button"
          onClick={(e) => { e.preventDefault(); navigate("/menu"); }}
        >
          Explore Our Menu
        </a>
      </section>

      <section className="highlights" aria-label="Featured categories">
        <a
          className="highlight-item"
          onClick={() => navigate("/menu")}
          href="/menu"
          aria-label="Artisan Breads - handcrafted breads"
        >
          <span className="material-icons" aria-hidden="true">local_cafe</span>
          <h2>Artisan Breads</h2>
          <p>Handcrafted breads baked fresh every day with organic ingredients.</p>
        </a>
        <a
          className="highlight-item"
          onClick={() => navigate("/menu")}
          href="/menu"
          aria-label="Delicious Pastries"
        >
          <span className="material-icons" aria-hidden="true">cake</span>
          <h2>Delicious Pastries</h2>
          <p>Enjoy our range of flaky croissants, buttery danishes, and more.</p>
        </a>
        <a
          className="highlight-item"
          onClick={() => navigate("/menu")}
          href="/menu"
          aria-label="Custom Cakes for special occasions"
        >
          <span className="material-icons" aria-hidden="true">celebration</span>
          <h2>Custom Cakes</h2>
          <p>Order custom cakes for special occasions with our talented decorators.</p>
        </a>
      </section>
    </main>
  );
}