let cart = []; // Array to store cart items

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
  return prices[itemName] || 0;
}

// Display a message when an item is added
function displayAddToCartMessage(itemName) {
  const cartMessageElement = document.createElement("p");
  cartMessageElement.textContent = `"${itemName}" has been added to your cart!`;
  cartMessageElement.style.display = "block";
  cartMessageElement.classList.add("cart-message");
  document.body.appendChild(cartMessageElement);

  setTimeout(() => {
    cartMessageElement.remove();
  }, 3000);
}

// Update the cart count
function updateCartCount() {
  const cartCountElement = document.querySelector(".cart-count");
  if (!cartCountElement) return; // Exit if the element doesn't exist

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  cartCountElement.textContent = itemCount;
}

// Render cart items in the cart.html page
function renderCartItems() {
  const cartItemsContainer = document.querySelector(".cart-items");
  if (!cartItemsContainer) return; // Exit if the element doesn't exist

  cartItemsContainer.innerHTML = ""; // Clear previous items
  cart.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("cart-item");
    itemElement.textContent = `${item.name} - $${item.price.toFixed(2)} x ${
      item.quantity
    }`;
    cartItemsContainer.appendChild(itemElement);
  });
}

// Function to remove an item from the cart
function removeFromCart(itemName) {
  const itemIndex = cart.findIndex((item) => item.name === itemName);

  if (itemIndex !== -1) {
    cart[itemIndex].quantity -= 1;

    if (cart[itemIndex].quantity === 0) {
      cart.splice(itemIndex, 1);
    }

    updateCartCount();
    renderCartItems();
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
      console.log("Item name:", itemName); // Debugging line
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
