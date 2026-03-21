import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";

const IndexPage   = lazy(() => import("./pages/IndexPage"));
const MenuPage    = lazy(() => import("./pages/MenuPage"));
const AboutUsPage = lazy(() => import("./pages/AboutUsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const CartPage    = lazy(() => import("./pages/CartPage"));
const LoginPage   = lazy(() => import("./pages/LoginPage"));
const SignupPage  = lazy(() => import("./pages/SignupPage"));
const PaymentPage = lazy(() => import("./pages/PaymentPage"));

function PageLoader() {
  return (
    <div className="page-loader">
      <span className="material-icons loader-icon">hourglass_empty</span>
      Loading...
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppInner() {
  return (
    <div className="app-wrapper">
      <ScrollToTop />
   
      <Header />
      <main className="app-main">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/"        element={<IndexPage />} />
            <Route path="/menu"    element={<MenuPage />} />
            <Route path="/aboutus" element={<AboutUsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/cart"    element={<CartPage />} />
            <Route path="/login"   element={<LoginPage />} />
            <Route path="/signup"  element={<SignupPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="*"        element={<IndexPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppInner />
      </CartProvider>
    </AuthProvider>
  );
}