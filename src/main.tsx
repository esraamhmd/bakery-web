import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import "./css/index.css";
import "./css/menu.css";
import "./css/cart.css";
import "./css/aboutus.css";
import "./css/contact.css";
import "./css/login.css";
import "./css/signup.css";
import "./css/payment.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter
    future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}
  >
    <App />
  </BrowserRouter>
);