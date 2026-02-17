import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import HomePage from "./components/pages/HomePage";
import ProductsPage from "./components/pages/ProductsPage";
import ContactPage from "./components/pages/ContactPage";
import PrivacyPage from "./components/pages/PrivacyPage";
import TermsPage from "./components/pages/TermsPage";
import ReferencesPage from "./components/pages/ReferencesPage";
import CorporatePage from "./components/pages/CorporatePage";
import NewsPage from "./components/pages/NewsPage";
import AdminLogin from "./components/admin/AdminLogin";
import AdminProducts from "./components/admin/AdminProducts";
import Footer from "./components/layout/Footer";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AdminAuthProvider, useAdminAuth } from "./contexts/AdminAuthContext";
import "./index.css";

const PlaceholderPage = ({ title, description }) => (
  <div className="mt-[140px] bg-[#050505] pb-16 pt-10 text-white">
    <div className="mx-auto max-w-6xl px-4">
      <h1 className="text-2xl font-semibold tracking-[0.18em] uppercase">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl text-sm text-white/75">{description}</p>
    </div>
  </div>
);

const AdminRoute = ({ children }) => {
  const { isAdmin } = useAdminAuth();
  if (!isAdmin) {
    window.location.href = "/admin/login";
    return null;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AdminAuthProvider>
          <div className="min-h-screen bg-[#050505] text-white">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/corporate" element={<CorporatePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/references" element={<ReferencesPage />} />
                <Route
                  path="/projects"
                  element={
                    <div className="mt-[140px] bg-[#050505] pb-16 pt-10 text-white">
                      <div className="mx-auto max-w-6xl px-4">
                        <h1 className="text-2xl font-semibold tracking-[0.18em] uppercase">
                          Projects
                        </h1>
                        <p className="mt-4 max-w-2xl text-sm text-white/75">
                          Static placeholder for the Projects page.
                        </p>
                      </div>
                    </div>
                  }
                />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/admin/products"
                  element={
                    <AdminRoute>
                      <AdminProducts />
                    </AdminRoute>
                  }
                />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="*" element={<HomePage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </AdminAuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
