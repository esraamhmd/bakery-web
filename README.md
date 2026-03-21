#  SoSo Bakery - Bakery Web Application

<div align="center">

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />

<img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" />
<img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" />
<img src="https://img.shields.io/badge/LocalStorage-API-1D546D?style=for-the-badge" />

<br/><br/>


https://github.com/user-attachments/assets/ee9cc1d5-b2bd-4560-ad55-9a50028aaf94


### A full-featured, responsive bakery website using React.js + TypeScript with authentication, cart management, and online payment.

<br/>

</div>

---

## 📖 Introduction

**SoSo Bakery** is a complete front-end bakery web application built with React and TypeScript. 


---

## 🔗 Live Demo
https://bakery-web-kwjh.vercel.app/

## ✨ Features

### 🏠 Home Page
- Hero section with animated background
- Highlight cards for Artisan Breads, Pastries, and Custom Cakes
- Fully responsive layout for all screen sizes

### 🍞 Menu
- 10 products across **Breads** and **Pastries** categories
- Bootstrap cards with product image, name, price, and Add to Cart button
- Toast notification centered at top when item is added

### 🛒 Cart
- Add, remove, and update quantity of items
- Real-time total calculation — always in sync with state
- Clear Cart and Pay buttons


### 👤 Authentication
- **Sign Up** — name, email, password, confirm password with full validation
- **Login** — email and password with inline error messages

### 💳 Payment
- Cardholder name, card number (16 digits), expiry (MM/YY), CVC
- Inline validation 
- Expiry and CVC shown side by side
- Clears cart and redirects home on success

### 📬 Contact
- Name, email, message fields
- Auto `.com` suggestion as you type email (gmail, yahoo, hotmail, outlook)
- Toast notification on successful send 
- Inline error validation

### 📖 About Us
- Story section with bakery description

### 📱 Responsive Design
- Mobile hamburger menu with dropdown navigation
- Tablet and desktop breakpoints
- All pages adapt to screen size

---

## 🚀 Tech Stack

### ⚛️ React 
Core UI framework. App split into clean reusable components — `Header`, `Footer`, pages, and context providers. Hooks used: `useState`, `useEffect`, `useCallback`.

### 🔷 TypeScript
Full type safety across all components, contexts, and pages. Interfaces defined for `CartItem`, `User`, `AuthContextType`, `CartContextType`.

### 🛣️ React Router 
Full client-side routing with `BrowserRouter`, `Routes`, `Route`, `NavLink`, `useNavigate`, `useLocation`. `ScrollToTop` component resets scroll position on every route change.

### 🎨 Bootstrap 
Bootstrap 5 cards used throughout — menu products, cart items, highlight cards. Bootstrap Icons (`bi-person-circle`, `bi-person-plus-fill`, `bi-credit-card-fill`, `bi-envelope-fill`) on forms and header.

### 🧩 Context API
Two global contexts:
- **CartContext** — cart state, add/remove/update/clear, cart count
- **AuthContext** — user session, login, signup, logout, validation

---

## 🛠️ Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📄 License

This project is licensed under the MIT License.

---

<div align="center">

**Built with ❤️ using React + TypeScript **

</div>
