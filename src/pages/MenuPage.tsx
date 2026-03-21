import { useState, memo, useCallback, useRef } from "react";
import { useCart } from "../context/CartContext";

interface MenuItem { name: string; price: number; img: string; category: string; }

const menuItems: MenuItem[] = [
  { name: "Classic Baguette",  price: 3.0,  img: "s1.jpg", category: "Breads"   },
  { name: "Sourdough Bread",   price: 4.0,  img: "s2.jpg", category: "Breads"   },
  { name: "Multigrain Bread",  price: 3.5,  img: "s3.jpg", category: "Breads"   },
  { name: "Focaccia",          price: 5.0,  img: "s4.jpg", category: "Breads"   },
  { name: "Ciabatta",          price: 2.25, img: "s5.jpg", category: "Breads"   },
  { name: "Flaky Croissants",  price: 2.5,  img: "s6.jpg", category: "Pastries" },
  { name: "Chocolate Danish",  price: 3.0,  img: "s7.jpg", category: "Pastries" },
  { name: "Almond Croissant",  price: 3.5,  img: "s8.jpg", category: "Pastries" },
  { name: "Fruit Tart",        price: 4.5,  img: "s9.jpg", category: "Pastries" },
];

const categories = ["Breads", "Pastries"];


const loadedImages = new Map<string, boolean>();

const FALLBACK =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E" +
  "%3Crect width='200' height='200' fill='%23f8e1d1'/%3E" +
  "%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' font-size='52'%3E" +
  "%F0%9F%8D%9E%3C/text%3E%3C/svg%3E";


const ProductCard = memo(function ProductCard({
  item,
  onAdd,
  eager,
}: {
  item: MenuItem;
  onAdd: (name: string) => void;
  eager: boolean;
}) {

  const [imgLoaded, setImgLoaded] = useState(() => loadedImages.get(item.img) ?? false);
  const imgRef = useRef<HTMLImageElement>(null);

  function handleLoad() {
   
    loadedImages.set(item.img, true);
    setImgLoaded(true);
  }

  function handleError() {
    loadedImages.set(item.img, true); 
    setImgLoaded(true);
    if (imgRef.current) imgRef.current.src = FALLBACK;
  }

  return (
    <div className="card">
     
      <div className={`card-img-wrapper ${imgLoaded ? "loaded" : "loading"}`}>
        <img
          ref={imgRef}
          src={`/imgs/${item.img}`}
          alt={item.name}
          width={200}
          height={200}
      
          loading={eager ? "eager" : "lazy"}
         
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
        />
      </div>

      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text">${item.price.toFixed(2)}</p>
        <a
          href="#"
          className="btn btn-primary"
          onClick={(e) => { e.preventDefault(); onAdd(item.name); }}
        >
          Add to Cart
        </a>
      </div>
    </div>
  );
});

export default function MenuPage() {
  const { addToCart } = useCart();
  const [showMessage, setShowMessage] = useState(false);
  const [cartMessage, setCartMessage] = useState("");


  const handleAddToCart = useCallback((itemName: string) => {
    addToCart(itemName);
    setCartMessage(`"${itemName}" added to cart!`);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  }, [addToCart]);

  return (
    <div>
      {showMessage && <div className="cart-message">{cartMessage}</div>}

      <div className="menu-section">
        {categories.map((cat, catIdx) => (
          <div key={cat} className="menu-category">
            <div className="image-row">
              {menuItems
                .filter((item) => item.category === cat)
                .map((item, itemIdx) => (
                  <ProductCard
                    key={item.name}
                    item={item}
                    onAdd={handleAddToCart}
                    eager={catIdx === 0 && itemIdx < 3}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}