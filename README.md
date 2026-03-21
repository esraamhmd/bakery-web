# 🥖 SoSo Bakery — Bakery Web Application

<div align="center">

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
<img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" />
<img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" />
<img src="https://img.shields.io/badge/LocalStorage-API-1D546D?style=for-the-badge" />

<br/><br/>

### A full-featured, responsive bakery website converted from HTML/CSS/JS to React + TypeScript — with authentication, cart management, and online payment.

<br/>

</div>

---

## 📖 Introduction

**SoSo Bakery** is a complete front-end bakery web application built with React and TypeScript. Originally a vanilla HTML/CSS/JS project, it was fully converted to a modern React + TypeScript stack with React Router, Context API, lazy loading, and full form validation.

The app delivers a real-world shopping experience — browse the menu, add items to a cart, sign up or log in, and complete a simulated payment — all with no backend required.

---

## 🔗 Live Demo

> 🚀 Deployed on Vercel

---

## ✨ Features

### 🏠 Home Page
- Hero section with animated background
- Highlight cards for Artisan Breads, Pastries, and Custom Cakes
- Fully responsive layout for all screen sizes

### 🍞 Menu
- 10 products across **Breads** and **Pastries** categories
- Bootstrap cards with product image, name, price, and Add to Cart button
- Shimmer loading animation while images load
- Lazy loading for off-screen images — only first 3 load eagerly
- Toast notification centered at top when item is added

### 🛒 Cart
- Add, remove, and update quantity of items
- Real-time total calculation — always in sync with state
- Product images shown from `/imgs/` folder
- Clear Cart and Pay buttons
- Empty cart state handled gracefully

### 👤 Authentication
- **Sign Up** — name, email, password, confirm password with full validation
- **Login** — email and password with inline error messages
- Accounts stored in **localStorage** — survive page refresh
- Session persisted — user stays logged in after refresh
- Header shows `Hi, [Name]` with Bootstrap person icon when logged in
- Logout clears session instantly

### 💳 Payment
- Cardholder name, card number (16 digits), expiry (MM/YY), CVC
- Inline validation — no alert() popups
- Expiry and CVC shown side by side
- Clears cart and redirects home on success

### 📬 Contact
- Name, email, message fields
- Auto `.com` suggestion as you type email (gmail, yahoo, hotmail, outlook)
- Toast notification on successful send — same style as cart toast
- Inline error validation

### 📖 About Us
- Story section with bakery description

### 📱 Responsive Design
- Mobile hamburger menu with dropdown navigation
- Tablet and desktop breakpoints
- All pages adapt to screen size

---

## 🚀 Tech Stack

### ⚛️ React 18
Core UI framework. App split into clean reusable components — `Header`, `Footer`, pages, and context providers. Hooks used: `useState`, `useEffect`, `useCallback`, `useRef`, `lazy`, `Suspense`.

### 🔷 TypeScript
Full type safety across all components, contexts, and pages. Interfaces defined for `CartItem`, `User`, `AuthContextType`, `CartContextType`.

### ⚡ Vite 5
Lightning-fast dev server and build tool. Configured with `historyApiFallback` for React Router support and code splitting.

### 🛣️ React Router DOM v6
Full client-side routing with `BrowserRouter`, `Routes`, `Route`, `NavLink`, `useNavigate`, `useLocation`. `ScrollToTop` component resets scroll position on every route change.

### 🎨 Bootstrap 5 + Bootstrap Icons
Bootstrap 5 cards used throughout — menu products, cart items, highlight cards. Bootstrap Icons (`bi-person-circle`, `bi-person-plus-fill`, `bi-credit-card-fill`, `bi-envelope-fill`) on forms and header.

### 💾 localStorage API
User accounts and sessions persisted using the browser's built-in `localStorage`. No backend or database needed.

### 🧩 Context API
Two global contexts:
- **CartContext** — cart state, add/remove/update/clear, cart count
- **AuthContext** — user session, login, signup, logout, validation

---

## 📁 Project Structure

```
bake/
├── public/
│   ├── favicon.svg
│   └── imgs/           ← product images (s1.jpg – s9.jpg, bg2.jpg)
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   └── CartContext.tsx
│   ├── css/
│   │   ├── index.css
│   │   ├── menu.css
│   │   ├── cart.css
│   │   ├── login.css
│   │   ├── signup.css
│   │   ├── payment.css
│   │   ├── contact.css
│   │   └── aboutus.css
│   ├── pages/
│   │   ├── IndexPage.tsx
│   │   ├── MenuPage.tsx
│   │   ├── CartPage.tsx
│   │   ├── AboutUsPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── SignupPage.tsx
│   │   └── PaymentPage.tsx
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

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

## 🔐 Auth Notes

Accounts are stored in `localStorage` — this is a front-end demo with no real backend. Do not use real passwords.

---

## 📄 License

This project is licensed under the MIT License.

---

<div align="center">

**Built with ❤️ using React + TypeScript + Vite**

</div>
