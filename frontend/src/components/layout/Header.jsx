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
    <header className="fixed inset-x-0 top-0 z-40 text-white font-medium">
      {/* Top utility bar */}
      <div className="bg-transparent">
        <div className="mx-auto flex max-w-6xl items-center justify-end px-4 py-2 text-xs sm:text-[13px]">
          <div className="hidden items-center space-x-4 md:flex">
            <div className="flex items-center bg-black/40 px-2.5 h-[30px] rounded-full space-x-2 text-white">
              <a
                href="https://api.whatsapp.com/send?phone=905321546312"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition-colors"
                title="WhatsApp"
              >
                <MessageCircle className="h-[18px] w-[18px]" />
              </a>
              <a
                href="https://www.instagram.com/profinoks/?hl=tr"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition-colors"
                title="Instagram"
              >
                <Instagram className="h-[18px] w-[18px]" />
              </a>
              <a
                href="https://www.facebook.com/profinoks.endustriyelmutfakekipmanlari"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition-colors"
                title="Facebook"
              >
                <Facebook className="h-[18px] w-[18px]" />
              </a>
              <a
                href="https://www.linkedin.com/in/profinoks-end%C3%BCstriyel-mutfak-ekipmanlari-4471921b2/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="h-[18px] w-[18px]" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCTsoSgntPEXAshH80VtSa-g/featured"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition-colors"
                title="YouTube"
              >
                <Youtube className="h-[18px] w-[18px]" />
              </a>
            </div>

            <button
              onClick={() => {
                window.open("https://drive.google.com/file/d/1DTSz_N8ljmdiRxP0BQP_TmKiXxGlJwRQ/view?usp=sharing", "_blank");
              }}
              className="bg-black/40 px-3 h-[30px] rounded-full text-white hover:bg-black/60 transition-colors flex items-center"
            >
              <span className="align-middle mr-1 inline-block h-[14px] w-[14px] rounded-sm bg-white/20" />
              <span className="text-[12px] font-semibold">{t(lang, "nav.catalogue")}</span>
            </button>


          </div>

          <div className="ml-4 flex flex-1 items-center justify-end space-x-3">
            <button
              type="button"
              onClick={toggleLang}
              className="bg-black/40 px-3 h-[30px] rounded-full flex items-center space-x-1.5 text-white hover:bg-black/60"
            >
              <Globe2 className="h-[18px] w-[18px]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.1em]">
                {lang === "en" ? "EN / TR" : "TR / EN"}
              </span>
            </button>

            <form
              onSubmit={handleSearchSubmit}
              className="ml-2 hidden max-w-[220px] flex-1 items-center space-x-1 sm:flex"
            >
              <div className="relative w-full">
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-10 bg-primary/60 pr-10 text-[15px] placeholder:text-white/70 border-white/20 text-white focus-visible:ring-primary/40"
                  placeholder={lang === "tr" ? "Ürün Arama" : "Search Product"}
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-2 flex items-center text-black/70 hover:text-black"
                >
                  <Search className="h-5 w-5 text-white/70 hover:text-white" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="bg-primary/60 backdrop-blur-md border-b border-white/5 shadow-lg">
        <div className="mx-auto flex max-w-6xl items-center justify-start px-4 py-3">
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

          <nav className="hidden items-center ml-auto space-x-8 text-[16px] font-bold uppercase tracking-[0.12em] lg:flex">
            {mainNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive: isNavActive }) =>
                  [
                    "relative pb-1 transition-colors",
                    isNavActive || isActive(item.path)
                      ? "text-white"
                      : "text-white/70 hover:text-white",
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

          <div className="flex items-center ml-auto space-x-3 lg:hidden">
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
