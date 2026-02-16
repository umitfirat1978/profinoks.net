const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'profinoks';
let db;

MongoClient.connect(mongoUrl)
  .then(client => {
    db = client.db(dbName);
    console.log(`Connected to Database: ${dbName}`);
  })
  .catch(error => console.error(error));

// --- Static homepage data ---
const SLIDER_ITEMS = [
  { id: 1, title: "Since 1993", image_url: "/profinoks/slider-1.jpg" },
  { id: 2, title: "Strong & Practical", image_url: "/profinoks/slider-2.jpg" },
  { id: 3, title: "Aesthetics & Dynamic", image_url: "/profinoks/slider-3.png" },
  { id: 4, title: "Functional & Modular", image_url: "/profinoks/slider-4.jpg" },
  { id: 5, title: "The Best For Your Guest", image_url: "/profinoks/slider-5.png" },
  {
    id: 6,
    title: "30 years of Production and Industry Experience",
    image_url: "/profinoks/slider-6.jpg",
  },
];

const PRODUCT_GROUPS = [
  {
    id: 1,
    title: "RESTAURANT EQUIPMENTS",
    slug: "restaurant-equipments",
    image_url: "/profinoks/group-restaurant.png",
    active_background_url: "/profinoks/group-restaurant.png",
    href: "https://profinoks.com.tr/en/products.aspx?id=1",
    description: "Buffet and service solutions that combine durability with refined aesthetics.",
  },
  {
    id: 2,
    title: "HOUSEKEEPING EQUIPMENTS",
    slug: "housekeeping-equipments",
    image_url: "/profinoks/group-housekeeping.png",
    active_background_url: "/profinoks/group-housekeeping.png",
    href: "https://profinoks.com.tr/en/products.aspx?id=2",
    description: "Operationally functional trolleys and equipment for housekeeping teams.",
  },
  {
    id: 3,
    title: "FRONT OFFICE EQUIPMENTS",
    slug: "front-office-equipments",
    image_url: "/profinoks/group-frontoffice.png",
    active_background_url: "/profinoks/group-frontoffice.png",
    href: "https://profinoks.com.tr/en/products.aspx?id=3",
    description: "Elegant and functional solutions for lobby and reception areas.",
  },
  {
    id: 4,
    title: "BANQUET & MEETING EQUIPMENTS",
    slug: "banquet-meeting-equipments",
    image_url: "/profinoks/group-banquet.png",
    active_background_url: "/profinoks/group-banquet.png",
    href: "https://profinoks.com.tr/en/products.aspx?id=4",
    description: "Modular banquet and meeting equipment that adapts to every setup.",
  },
];

const REFERENCE_LOGOS = [
  { id: 1, image_url: "/profinoks/ref-1.jpg" },
  { id: 2, image_url: "/profinoks/ref-2.png" },
  { id: 3, image_url: "/profinoks/ref-3.jpg" },
  { id: 4, image_url: "/profinoks/ref-4.png" },
  { id: 5, image_url: "/profinoks/ref-5.jpg" },
  { id: 6, image_url: "/profinoks/ref-6.jpg" },
  { id: 7, image_url: "/profinoks/ref-7.jpg" },
  { id: 8, image_url: "/profinoks/ref-8.jpg" },
  { id: 9, image_url: "/profinoks/ref-9.jpg" },
  { id: 10, image_url: "/profinoks/ref-10.png" },
  { id: 11, image_url: "/profinoks/ref-11.jpg" },
  { id: 12, image_url: "/profinoks/ref-12.jpg" },
  { id: 13, image_url: "/profinoks/ref-13.jpg" },
  { id: 14, image_url: "/profinoks/ref-14.jpg" },
];

const TESTIMONIALS = [
  {
    id: 1,
    hotel: "Mövenpick Hotel Istanbul",
    person: "Oktay Çampınar",
    role: "Purchasing Manager",
    quote: "We met Profinoks in 2008 at CNR Istanbul Fair and placed our first housekeeping trolley orders that day. A modest, solution-oriented partner that has always made us feel they are by our side.",
    image_url: "/profinoks/test-1.jpg",
    detail_url: "https://profinoks.com.tr/yorumdetay.aspx?dil=en&q=6",
  },
  {
    id: 2,
    hotel: "Radisson Blu Hotel, Istanbul Sisli / Pera",
    person: "Melih İlgü",
    role: "Purchasing Director",
    quote: "With its ever-expanding product range and quality, Profinoks is one of the true pioneers in the HoReCa sector, especially with its strong after-sales support.",
    image_url: "/profinoks/test-2.jpg",
    detail_url: "https://profinoks.com.tr/yorumdetay.aspx?dil=en&q=7",
  },
  {
    id: 3,
    hotel: "Fairmont Quasar Istanbul",
    person: "Emre Melen",
    role: "Assistant Director, Food & Beverage",
    quote: "A company that changes our perspective on local products, surpassing imported quality and always providing tailored solutions with strong after-sales support.",
    image_url: "/profinoks/test-3.jpg",
    detail_url: "https://profinoks.com.tr/yorumdetay.aspx?dil=en&q=4",
  },
];

// --- API Routes ---

app.get('/api/home', (req, res) => {
  res.json({
    slider: SLIDER_ITEMS,
    product_groups: PRODUCT_GROUPS,
    references: REFERENCE_LOGOS,
    testimonials: TESTIMONIALS,
  });
});

app.get('/api/products', async (req, res) => {
  try {
    const group_slug = req.query.group_slug;
    const query = { is_active: true };
    if (group_slug) {
      query.group_slug = group_slug;
    }
    const products = await db.collection('products').find(query).toArray();
    res.json(products.map(p => ({ ...p, id: p._id.toString() })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin routes (simplified for now, mirroring the Python logic)
const FAKE_ADMIN_TOKEN = "dev-admin-token";

const requireAdmin = (req, res, next) => {
  const adminToken = req.headers['x-admin-token'];
  if (adminToken !== FAKE_ADMIN_TOKEN) {
    return res.status(401).json({ detail: "Admin authentication required" });
  }
  next();
};

app.post('/api/admin/login', (req, res) => {
  if (req.body.password === "dev-admin") {
    return res.json({ token: FAKE_ADMIN_TOKEN, role: "admin" });
  }
  res.status(401).json({ detail: "Invalid developer password" });
});

app.get('/api/admin/products', requireAdmin, async (req, res) => {
  try {
    const products = await db.collection('products').find().toArray();
    res.json(products.map(p => ({ ...p, id: p._id.toString() })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/products', requireAdmin, async (req, res) => {
  try {
    const result = await db.collection('products').insertOne(req.body);
    res.json({ ...req.body, id: result.insertedId.toString() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve frontend static files
app.use(express.static(path.join(__dirname, '.next')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '.next', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
