const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'profinoks-secret-key-2024';

app.use(cors());
app.use(express.json());

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'dist', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer configuration for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// MongoDB connection
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'profinoks';
let db;

MongoClient.connect(mongoUrl)
  .then(client => {
    db = client.db(dbName);
    console.log(`Connected to Database: ${dbName}`);
    // Initialize collections if they don't exist
    initializeDB();
  })
  .catch(error => console.error(error));

// Seed initial data if DB is empty
async function initializeDB() {
  const collections = ['slider', 'groups', 'references', 'testimonials', 'users'];
  for (const col of collections) {
    const count = await db.collection(col).countDocuments();
    if (count === 0) {
      if (col === 'users') {
        const hashedPassword = await bcrypt.hash('ProfinoksAdmin2026!', 10);
        await db.collection('users').insertOne({ username: 'admin', password: hashedPassword });
      } else if (col === 'slider') {
        await db.collection('slider').insertMany([
          { id: 1, title: "Since 1993", image_url: "/profinoks/slider-1.jpg" },
          { id: 2, title: "Strong & Practical", image_url: "/profinoks/slider-2.jpg" },
          { id: 3, title: "Aesthetics & Dynamic", image_url: "/profinoks/slider-3.png" },
          { id: 4, title: "Functional & Modular", image_url: "/profinoks/slider-4.jpg" },
          { id: 5, title: "The Best For Your Guest", image_url: "/profinoks/slider-5.png" },
          { id: 6, title: "30 years of Production and Industry Experience", image_url: "/profinoks/slider-6.jpg" }
        ]);
      } else if (col === 'groups') {
        await db.collection('groups').insertMany([
          { id: 1, title: "RESTAURANT EQUIPMENTS", slug: "restaurant-equipments", image_url: "/profinoks/group-restaurant.png", description: "Buffet and service solutions that combine durability with refined aesthetics." },
          { id: 2, title: "HOUSEKEEPING EQUIPMENTS", slug: "housekeeping-equipments", image_url: "/profinoks/group-housekeeping.png", description: "Operationally functional trolleys and equipment for housekeeping teams." },
          { id: 3, title: "FRONT OFFICE EQUIPMENTS", slug: "front-office-equipments", image_url: "/profinoks/group-frontoffice.png", description: "Elegant and functional solutions for lobby and reception areas." },
          { id: 4, title: "BANQUET & MEETING EQUIPMENTS", slug: "banquet-meeting-equipments", image_url: "/profinoks/group-banquet.png", description: "Modular banquet and meeting equipment that adapts to every setup." }
        ]);
      } else if (col === 'references') {
        await db.collection('references').insertMany([
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
          { id: 14, image_url: "/profinoks/ref-14.jpg" }
        ]);
      } else if (col === 'testimonials') {
        await db.collection('testimonials').insertMany([
          { id: 1, hotel: "Mövenpick Hotel Istanbul", person: "Oktay Çampınar", role: "Purchasing Manager", quote: "We met Profinoks in 2008 at CNR Istanbul Fair and placed our first housekeeping trolley orders that day. A modest, solution-oriented partner that has always made us feel they are by our side.", image_url: "/profinoks/test-1.jpg" },
          { id: 2, hotel: "Radisson Blu Hotel, Istanbul Sisli / Pera", person: "Melih İlgü", role: "Purchasing Director", quote: "With its ever-expanding product range and quality, Profinoks is one of the true pioneers in the HoReCa sector, especially with its strong after-sales support.", image_url: "/profinoks/test-2.jpg" },
          { id: 3, hotel: "Fairmont Quasar Istanbul", person: "Emre Melen", role: "Assistant Director, Food & Beverage", quote: "A company that changes our perspective on local products, surpassing imported quality and always providing tailored solutions with strong after-sales support.", image_url: "/profinoks/test-3.jpg" }
        ]);
      }
    }
  }
}

// Test endpoint to verify API is reachable
app.get('/api/test', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Backend is alive',
    dbConnected: !!db
  });
});

// Middleware for Admin authentication
const authenticateToken = (req, res, next) => {
  if (!db) return res.status(503).json({ message: 'Database not connected yet' });
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access denied' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// --- Auth Routes ---
app.post('/api/admin/login', async (req, res) => {
  if (!db) return res.status(503).json({ message: 'Database not connected yet' });
  const { username, password } = req.body;
  try {
    const user = await db.collection('users').findOne({ username });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, username: user.username });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- Public API Routes ---
app.get('/api/home', async (req, res) => {
  try {
    const slider = await db.collection('slider').find().toArray();
    const groups = await db.collection('groups').find().toArray();
    const references = await db.collection('references').find().toArray();
    const testimonials = await db.collection('testimonials').find().toArray();
    
    res.json({
      slider,
      product_groups: groups,
      references,
      testimonials,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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

// --- Admin API Routes ---
app.get('/api/admin/products', authenticateToken, async (req, res) => {
  try {
    const products = await db.collection('products').find().toArray();
    res.json(products.map(p => ({ ...p, id: p._id.toString() })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/products', authenticateToken, async (req, res) => {
  try {
    const result = await db.collection('products').insertOne(req.body);
    res.json({ ...req.body, _id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/admin/products/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    delete updateData._id;
    await db.collection('products').updateOne({ _id: new ObjectId(id) }, { $set: updateData });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/admin/products/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('products').deleteOne({ _id: new ObjectId(id) });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Site Settings Routes
app.get('/api/admin/settings/:collection', authenticateToken, async (req, res) => {
  try {
    const items = await db.collection(req.params.collection).find().toArray();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/settings/:collection', authenticateToken, async (req, res) => {
  try {
    const result = await db.collection(req.params.collection).insertOne(req.body);
    res.json({ ...req.body, _id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/admin/settings/:collection/:id', authenticateToken, async (req, res) => {
  try {
    const { collection, id } = req.params;
    const updateData = { ...req.body };
    delete updateData._id;
    await db.collection(collection).updateOne({ _id: new ObjectId(id) }, { $set: updateData });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/admin/settings/:collection/:id', authenticateToken, async (req, res) => {
  try {
    const { collection, id } = req.params;
    await db.collection(collection).deleteOne({ _id: new ObjectId(id) });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Image Upload Route
app.post('/api/admin/upload', authenticateToken, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

// Serve frontend static files
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});