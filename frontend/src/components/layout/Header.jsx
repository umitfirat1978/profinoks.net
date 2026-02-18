import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Linkedin, Youtube, Instagram, Facebook, MessageCircle, Globe2, Search, Menu, X } from "lucide-react";

import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { mainNavItems } from "../../mock";
import { useLanguage } from "../../contexts/LanguageContext";
import { t } from "../../i18n";

const Header = () => {
  const location = useLocation();
  const { lang, toggleLang } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(() => {
    if (typeof window === "undefined") return "";
    return window.localStorage.getItem("profinoksSearch") || "";
  });

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("profinoksSearch", searchTerm);
      }
    } catch (err) {
      // fail silently – search is only a cosmetic feature in this clone
      console.error("Search persistence failed", err);
    }
  };

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 text-white">
      {/* Top utility bar */}
      <div className="bg-transparent">
        <div className="mx-auto flex max-w-6xl items-center justify-end px-4 py-4 space-x-4">
          <div className="hidden items-center space-x-3 md:flex">
            <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/10">
              <a href="https://www.linkedin.com/..." className="text-white hover:text-white/80 transition-colors"><Linkedin size={14} /></a>
              <a href="https://www.youtube.com/..." className="text-white hover:text-white/80 transition-colors"><Youtube size={14} /></a>
            </div>

            <button
              onClick={() => {
                window.open("https://drive.google.com/file/d/1DTSz_N8ljmdiRxP0BQP_TmKiXxGlJwRQ/view?usp=sharing", "_blank");
              }}
              className="flex items-center bg-white/80 text-black px-4 py-1.5 rounded-md text-[13px] font-bold hover:bg-white transition-colors"
            >
              <img src="/profinoks/catalogue-icon.png" className="h-4 w-4 mr-2" alt="" onError={(e) => e.target.style.display = 'none'} />
              {t(lang, "nav.catalogue")}
            </button>

            <button className="bg-black/60 backdrop-blur-sm text-white px-4 py-1.5 rounded-md text-[13px] font-bold border border-white/10 hover:bg-black/80 transition-colors">
              Online Payment
            </button>

            <div className="relative">
              <input
                type="text"
                placeholder="Search Product"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-primary hover:bg-primary/90 text-white pl-4 pr-10 py-1.5 rounded-md text-[13px] font-bold placeholder:text-white/70 w-[180px] focus:outline-none"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="bg-primary/80 backdrop-blur-md border-b border-white/5 shadow-lg">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center">
            <img
              src="/profinoks/logo.png"
              alt="Profinoks Logo"
              className="h-10 w-auto sm:h-12"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/150x50?text=PROFINOKS";
              }}
            />
          </Link>

          <nav className="hidden items-center space-x-8 text-[15px] font-bold uppercase tracking-[0.12em] lg:flex">
            {mainNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive: isNavActive }) =>
                  [
                    "relative pb-1 transition-colors text-white",
                    isNavActive || isActive(item.path)
                      ? "opacity-100"
                      : "opacity-80 hover:opacity-100",
                  ].join(" ")
                }
              >
                {({ isActive: isNavActive }) => (
                  <>
                    <span>{t(lang, item.translationKey)}</span>
                    <span
                      className={[
                        "absolute inset-x-0 -bottom-0.5 h-0.5 origin-left bg-white transition-transform",
                        isNavActive || isActive(item.path)
                          ? "scale-x-100"
                          : "scale-x-0",
                      ].join(" ")}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center space-x-6">
            <Link to="/cart" className="text-white hover:text-white/80 transition-colors">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </Link>

            <button onClick={toggleLang} className="flex items-center space-x-2 text-white font-bold text-[14px]">
              <Globe2 className="h-4 w-4" />
              <span>{lang === "en" ? "TR" : "TR"}</span>
            </button>

            <div className="lg:hidden">
              <button
                type="button"
                onClick={() => setMobileOpen((open) => !open)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white hover:border-white"
                aria-label="Toggle navigation"
              >
                {mobileOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-white/10 bg-black/95 lg:hidden">
            <div className="mx-auto max-w-6xl px-4 pb-4 pt-2">
              <form onSubmit={handleSearchSubmit} className="mb-3 flex items-center space-x-2">
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-9 flex-1 bg-white/10 text-xs placeholder:text-white/50 border-white/20 focus-visible:ring-white/40"
                  placeholder="Search Product"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="h-9 w-9 bg-primary text-white hover:bg-primary/80"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </form>

              <nav className="flex flex-col space-y-2 text-xs font-medium uppercase tracking-[0.16em]">
                {mainNavItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive: isNavActive }) =>
                      [
                        "flex items-center justify-between rounded-sm px-2 py-1.5",
                        isNavActive || isActive(item.path)
                          ? "bg-white/10 text-white"
                          : "text-white/75 hover:bg-white/5",
                      ].join(" ")
                    }
                  >
                    {t(lang, item.translationKey)}
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
