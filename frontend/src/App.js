import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/layout/Header";
import HomePage from "./components/pages/HomePage";
import ProductsPage from "./components/pages/ProductsPage";
import ContactPage from "./components/pages/ContactPage";
import PrivacyPage from "./components/pages/PrivacyPage";
import TermsPage from "./components/pages/TermsPage";
import ReferencesPage from "./components/pages/ReferencesPage";
import CorporatePage from "./components/pages/CorporatePage";
import NewsPage from "./components/pages/NewsPage";
import ProjectsPage from "./components/pages/ProjectsPage";
import CategoryPage from "./components/pages/CategoryPage";
import ProductDetailPage from "./components/pages/ProductDetailPage";
import AdminLayout from "./components/admin/AdminLayout";
import AdminLogin from "./components/admin/AdminLogin";
import AdminProducts from "./components/admin/AdminProducts";
import SettingsManager from "./components/admin/SettingsManager";
import Footer from "./components/layout/Footer";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AdminAuthProvider, useAdminAuth } from "./contexts/AdminAuthContext";
import "./index.css";

const ProtectedRoute = ({ children }) => {
  const { isAdmin } = useAdminAuth();
  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }
  return <AdminLayout>{children}</AdminLayout>;
};

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AdminAuthProvider>
          <div className="min-h-screen bg-[#050505] text-white">
            <Routes>
              {/* Public Routes with Header/Footer */}
              <Route
                path="/*"
                element={
                  <>
                    <Header />
                    <main>
                      <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/corporate" element={<CorporatePage />} />
                        <Route path="/products" element={<ProductsPage />} />
                        <Route path="/products/:slug" element={<CategoryPage />} />
                        <Route path="/products/:categorySlug/:productId" element={<ProductDetailPage />} />
                        <Route path="/references" element={<ReferencesPage />} />
                        <Route path="/news" element={<NewsPage />} />
                        <Route path="/projects" element={<ProjectsPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/privacy" element={<PrivacyPage />} />
                        <Route path="/terms" element={<TermsPage />} />
                        <Route path="*" element={<HomePage />} />
                      </Routes>
                    </main>
                    <Footer />
                  </>
                }
              />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin/products"
                element={
                  <ProtectedRoute>
                    <AdminProducts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/settings/:collection"
                element={
                  <ProtectedRoute>
                    <SettingsManager />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </AdminAuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
