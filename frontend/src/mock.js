// Mock data for Profinoks home page clone
// All content here is static and not loaded from any backend API.

export const sliderItems = [
  {
    id: 1,
    title: "Since 1993",
    imageUrl: "/ormel/slider-1.jpg",
  },
  {
    id: 2,
    title: "Strong & Practical",
    imageUrl: "/ormel/slider-2.jpg",
  },
  {
    id: 3,
    title: "Aesthetics & Dynamic",
    imageUrl: "/ormel/slider-3.png",
  },
  {
    id: 4,
    title: "Functional & Modular",
    imageUrl: "/ormel/slider-4.jpg",
  },
  {
    id: 5,
    title: "The Best For Your Guest",
    imageUrl: "/ormel/slider-5.png",
  },
  {
    id: 6,
    title: "30 years of Production and Industry Experience",
    imageUrl: "/ormel/slider-6.jpg",
  },
];

export const productGroups = [
  {
    id: 1,
    title: "RESTAURANT EQUIPMENTS",
    slug: "restaurant-equipments",
    imageUrl: "/ormel/group-restaurant.png",
    activeBackgroundUrl: "/ormel/group-restaurant.png",
    href: "https://profinoks.com.tr/en/products.aspx?id=1",
    description:
      "Buffet and service solutions that combine durability with refined aesthetics.",
  },
  {
    id: 2,
    title: "HOUSEKEEPING EQUIPMENTS",
    slug: "housekeeping-equipments",
    imageUrl: "/ormel/group-housekeeping.png",
    activeBackgroundUrl: "/ormel/group-housekeeping.png",
    href: "https://profinoks.com.tr/en/products.aspx?id=2",
    description:
      "Operationally functional trolleys and equipment for housekeeping teams.",
  },
  {
    id: 3,
    title: "FRONT OFFICE EQUIPMENTS",
    slug: "front-office-equipments",
    imageUrl: "/ormel/group-frontoffice.png",
    activeBackgroundUrl: "/ormel/group-frontoffice.png",
    href: "https://profinoks.com.tr/en/products.aspx?id=3",
    description:
      "Elegant and functional solutions for lobby and reception areas.",
  },
  {
    id: 4,
    title: "BANQUET & MEETING EQUIPMENTS",
    slug: "banquet-meeting-equipments",
    imageUrl: "/ormel/group-banquet.png",
    activeBackgroundUrl: "/ormel/group-banquet.png",
    href: "https://profinoks.com.tr/en/products.aspx?id=4",
    description:
      "Modular banquet and meeting equipment that adapts to every setup.",
  },
];

export const referenceLogos = [
  "/ormel/ref-1.jpg",
  "/ormel/ref-2.png",
  "/ormel/ref-3.jpg",
  "/ormel/ref-4.png",
  "/ormel/ref-5.jpg",
  "/ormel/ref-6.jpg",
  "/ormel/ref-7.jpg",
  "/ormel/ref-8.jpg",
  "/ormel/ref-9.jpg",
  "/ormel/ref-10.png",
  "/ormel/ref-11.jpg",
  "/ormel/ref-12.jpg",
  "/ormel/ref-13.jpg",
  "/ormel/ref-14.jpg",
];

export const testimonials = [
  {
    id: 1,
    hotel: "Mövenpick Hotel Istanbul",
    person: "Oktay Çampınar",
    role: "Purchasing Manager",
    quote:
      "We met Profinoks in 2008 at CNR Istanbul Fair and placed our first housekeeping trolley orders that day. A modest, solution-oriented partner that has always made us feel they are by our side.",
    imageUrl: "/ormel/test-1.jpg",
    detailUrl: "https://profinoks.com.tr/yorumdetay.aspx?dil=en&q=6",
  },
  {
    id: 2,
    hotel: "Radisson Blu Hotel, Istanbul Sisli / Pera",
    person: "Melih İlgü",
    role: "Purchasing Director",
    quote:
      "With its ever-expanding product range and quality, Profinoks is one of the true pioneers in the HoReCa sector, especially with its strong after-sales support.",
    imageUrl: "/ormel/test-2.jpg",
    detailUrl: "https://profinoks.com.tr/yorumdetay.aspx?dil=en&q=7",
  },
  {
    id: 3,
    hotel: "Fairmont Quasar Istanbul",
    person: "Emre Melen",
    role: "Assistant Director, Food & Beverage",
    quote:
      "A company that changes our perspective on local products, surpassing imported quality and always providing tailored solutions with strong after-sales support.",
    imageUrl: "/ormel/test-3.jpg",
    detailUrl: "https://profinoks.com.tr/yorumdetay.aspx?dil=en&q=4",
  },
];

export const mainNavItems = [
  { label: "Home Page", path: "/", translationKey: "nav.home" },
  { label: "Corporate", path: "/corporate", translationKey: "nav.corporate" },
  { label: "Products", path: "/products", translationKey: "nav.products" },
  { label: "References", path: "/references", translationKey: "nav.references" },
  { label: "Projects", path: "/projects", translationKey: "nav.projects" },
  { label: "News", path: "/news", translationKey: "nav.news" },
  { label: "Contact", path: "/contact", translationKey: "nav.contact" },
];
