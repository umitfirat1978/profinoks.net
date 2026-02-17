// Simple EN/TR translations for the Profinoks clone.
// This is frontend-only and can later be wired to CMS data.

export const LANGUAGES = {
  EN: "en",
  TR: "tr",
};

export const translations = {
  en: {
    hero: {
      badge: "Profinoks Industrial Kitchen Equipment",
      subtitle:
        "Reliable designer and manufacturer of hotel equipment and movable furniture for the hospitality industry.",
    },
    nav: {
      home: "Home Page",
      corporate: "Corporate",
      products: "Products",
      references: "References",
      projects: "Projects",
      news: "News",
      contact: "Contact",
      catalogue: "Product Catalogue",
      admin: "Admin",
    },
    productGroups: {
      heading: "OUR PRODUCTS",
      animation: "Animation",
    },
    references: {
      heading: "REFERENCES",
      tagline: "Thank you for adding value",
    },
    testimonials: {
      heading: "CUSTOMER REVIEWS",
      readMore: "Read full story",
    },
    admin: {
      loginTitle: "Admin Login (Dev)",
      loginDescription:
        "Developer-only access. This is a temporary fake login until Google OAuth is configured.",
      passwordLabel: "Developer password",
      signInButton: "Sign in as admin",
      wrongPassword: "Invalid developer password",
      productsHeading: "Products CMS",
      newProduct: "New Product",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
    },
  },
  tr: {
    hero: {
      badge: "PROFİNOKS ENDÜSTRİYEL MUTFAK EKİPMANLARI",
      subtitle:
        "Otel ekipmanları ve hareketli mobilyaların güvenilir tasarımcısı ve üreticisi.",
    },
    nav: {
      home: "Ana Sayfa",
      corporate: "Kurumsal",
      products: "Ürünler",
      references: "Referanslar",
      projects: "Projeler",
      news: "Haberler",
      contact: "İletişim",
      catalogue: "Ürün Kataloğu",
      admin: "Yönetim",
    },
    productGroups: {
      heading: "ÜRÜNLERİMİZ",
      animation: "Animasyon",
    },
    references: {
      heading: "REFERANSLAR",
      tagline: "Değer kattığınız için teşekkür ederiz",
    },
    testimonials: {
      heading: "MÜŞTERİ YORUMLARI",
      readMore: "Tüm hikayeyi oku",
    },
    admin: {
      loginTitle: "Yönetici Girişi (Dev)",
      loginDescription:
        "Sadece geliştirici erişimi. Google OAuth yapılandırılana kadar geçici sahte giriş.",
      passwordLabel: "Geliştirici şifresi",
      signInButton: "Yönetici olarak giriş yap",
      wrongPassword: "Geçersiz geliştirici şifresi",
      productsHeading: "Ürün CMS",
      newProduct: "Yeni Ürün",
      save: "Kaydet",
      cancel: "Vazgeç",
      delete: "Sil",
    },
  },
};

export function t(lang, path) {
  const segments = path.split(".");
  let node = translations[lang] || translations.en;
  for (const key of segments) {
    if (!node || typeof node !== "object") return path;
    node = node[key];
  }
  return node ?? path;
}
