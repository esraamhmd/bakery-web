let cart = []; // Array to store cart items

// Get item price based on its name
function getItemPrice(itemName) {
  const prices = {
    "Classic Baguette": 3.0,
    "Sourdough Bread": 4.0,
    "Multigrain Bread": 3.5,
    Focaccia: 5.0,
    "Flaky Croissants": 2.5,
    "Chocolate Danish": 3.0,
    "Almond Croissant": 3.5,
    "Pain au Chocolat": 2.75,
    "Fruit Tart": 4.5,
    Ciabatta: 2.25,
  };

  const price = prices[itemName];
  if (!price) {
    console.warn(`Price for "${itemName}" not found.`);
    return 0; // Return a default price of 0 if not found
  }
  return price;
}

// Display a message when an item is added
function displayAddToCartMessage(itemName) {
  const cartMessageElement = document.querySelector(".cart-message");
  if (cartMessageElement) {
    cartMessageElement.textContent = `"${itemName}" has been added to your cart!`;
    cartMessageElement.style.display = "block";
  }

  setTimeout(() => {
    if (cartMessageElement) {
      cartMessageElement.style.display = "none";
    }
  }, 3000);
}

// Update the cart count
function updateCartCount() {
  const cartCountElement = document.querySelector(".cart-count");
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  cartCountElement.textContent = itemCount;
}

// Render the cart items
function renderCartItems() {
  const cartItemsContainer = document.querySelector(".cart-items");
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cart.forEach((item) => {
      const cartItemDiv = document.createElement("div");
      cartItemDiv.classList.add("cart-item");

      const itemImage = document.createElement("img");
      itemImage.src = `../imgs/${item.name
        .toLowerCase()
        .replace(/ /g, "-")}.jpg`;
      itemImage.alt = item.name;

      const itemInfoDiv = document.createElement("div");
      itemInfoDiv.classList.add("cart-item-info");
      itemInfoDiv.innerHTML = `
        <h4>${item.name}</h4>
        <p>Price: $${item.price.toFixed(2)}</p>
        <p>Quantity: <input type="number" value="${
          item.quantity
        }" min="1" onchange="updateQuantity('${item.name}', this.value)"></p>
        <button class="remove-item" onclick="removeFromCart('${
          item.name
        }')">Remove</button>
      `;

      cartItemDiv.appendChild(itemImage);
      cartItemDiv.appendChild(itemInfoDiv);
      cartItemsContainer.appendChild(cartItemDiv);
    });
  }

  updateTotalPrice();
}

// Update the total price
function updateTotalPrice() {
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  document.querySelector(
    ".cart-summary h3"
  ).innerText = `Total: $${total.toFixed(2)}`;
}

// Remove an item from the cart
function removeFromCart(itemName) {
  cart = cart.filter((item) => item.name !== itemName);
  renderCartItems();
  updateCartCount();
  updateTotalPrice();
}

// Update item quantity
function updateQuantity(itemName, quantity) {
  const itemIndex = cart.findIndex((item) => item.name === itemName);
  if (itemIndex !== -1) {
    cart[itemIndex].quantity = parseInt(quantity, 10);
    renderCartItems();
    updateCartCount();
  }
}

// Checkout function
function checkout() {
  if (cart.length === 0) {
    alert(
      "Your cart is empty. Please add items to the cart before checking out."
    );
  } else {
    alert("Proceeding to checkout...");
  }
}

// Initial cart count update
updateCartCount();
// Function to add an item to the cart
function addToCart(itemName) {
  if (!itemName) {
    alert("Item name cannot be null or undefined.");
    return;
  }

  const confirmation = confirm(
    `Are you sure you want to add "${itemName}" to the cart?`
  );

  if (confirmation) {
    const itemIndex = cart.findIndex((item) => item.name === itemName);

    if (itemIndex !== -1) {
      cart[itemIndex].quantity += 1;
    } else {
      const newItem = {
        name: itemName,
        price: getItemPrice(itemName),
        quantity: 1,
      };
      cart.push(newItem);
    }

    displayAddToCartMessage(itemName);
    updateCartCount();
  }
}

// Function to clear the cart
function clearCart() {
  cart = [];
  updateCartCount();
  renderCartItems();
}

// Attach event listeners on page load
document.addEventListener("DOMContentLoaded", () => {
  // Attach `addToCart` functionality to buttons
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const itemName = button.getAttribute("data-item");
      addToCart(itemName);
    });
  });

  // Attach `removeFromCart` functionality to buttons
  const removeFromCartButtons = document.querySelectorAll(".remove-from-cart");
  removeFromCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const itemName = button.getAttribute("data-item");
      removeFromCart(itemName);
    });
  });

  // Attach `clearCart` functionality to button
  const clearCartButton = document.querySelector(".clear-cart");
  if (clearCartButton) {
    clearCartButton.addEventListener("click", () => {
      clearCart();
    });
  }

  // Update cart count on all pages
  updateCartCount();

  // Render cart items only if the `.cart-items` container exists
  renderCartItems();
});
