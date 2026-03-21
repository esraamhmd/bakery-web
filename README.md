<<<<<<< HEAD
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
=======
# 🥐 Soso's Bakery

A responsive and visually engaging bakery website built with HTML, CSS, and JavaScript. This project showcases bakery products, enables smooth navigation between sections, and delivers an appealing user experience.

![image](https://github.com/user-attachments/assets/e9f34b7c-31ae-45aa-b8e8-5339ef540fd2)


## 🧩 Features

- **Homepage** with hero banner, featured items, and navigation menu  
- **Product galleries** (cakes, pastries, breads, etc.) displaying images and details  
- **Interactive navigation** via links and hover effects  
- **About** sections highlighting bakery info and common queries  
- **Contact form** and embedded map integration  
- **Cart system** allowing users to “add” items and view a checkout screen (pure front-end simulation)  
- **Responsive design** for mobile-first layout and desktop compatibility
- **Demo**

  
https://github.com/user-attachments/assets/e626d999-0634-4ee6-af15-6c7e355c3720


## 🛠️ Tech Stack

- **HTML5** – semantic page structure  
- **CSS3** – styling with media queries and hover animations  
- **JavaScript** – interactivity: navigation, cart functionality  
- **Bootstrap** – enhance user interface (if included)

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/esraamhmd/bakery-web.git
cd bakery-web



## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
>>>>>>> 95e130633c2ea842bc8b9c79c5ca17024fc2c5f9
