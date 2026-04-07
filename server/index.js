const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// DB setup — async sqlite3 (works on all platforms including Windows)
const db = new sqlite3.Database(path.join(__dirname, 'reviews.db'), (err) => {
  if (err) { console.error('Could not open database:', err.message); process.exit(1); }
  console.log('✅ Database connected.');
});

const run = (sql, params = []) => new Promise((res, rej) =>
  db.run(sql, params, function(err) { err ? rej(err) : res(this); })
);
const get = (sql, params = []) => new Promise((res, rej) =>
  db.get(sql, params, (err, row) => { err ? rej(err) : res(row); })
);
const all = (sql, params = []) => new Promise((res, rej) =>
  db.all(sql, params, (err, rows) => { err ? rej(err) : res(rows); })
);

async function initDB() {
  await run(`
    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      location TEXT NOT NULL,
      project_type TEXT NOT NULL,
      rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
      review TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      approved INTEGER DEFAULT 1
    )
  `);
  const count = await get('SELECT COUNT(*) as c FROM reviews');
  if (count.c === 0) {
    const seeds = [
      ['Ahmad Hazim','Shah Alam, Selangor','New Residential Build',5,"H&S World built our dream bungalow in Shah Alam and we couldn't be happier. The team was professional, punctual, and the quality of workmanship exceeded our expectations. They kept us updated at every step. Highly recommend!"],
      ['Lee Sook Yin','Petaling Jaya, Selangor','Commercial Fit-Out',5,'They renovated our restaurant space in just 6 weeks — on time and within budget. The fit-out looks incredible and our customers always compliment the space. Great team to work with.'],
      ['Raj Nair','Subang Jaya, Selangor','Home Renovation',5,'Very transparent with their quotations — no hidden charges. The renovation team was clean, respectful of our home, and the end result is beautiful. Will definitely use them again.'],
      ['Fauziah Zainudin','Kuala Lumpur','Office Renovation',5,'Professional from start to finish. H&S World handled our office refurbishment while we were still operating — minimal disruption and the result was stunning. Excellent project management.'],
      ['Michael Tan','Cheras, KL','New Residential Build',5,'Engaged H&S World for our semi-detached house project. They delivered on time, the workmanship is solid, and they were very transparent throughout. Very satisfied!'],
    ];
    for (const s of seeds) {
      await run('INSERT INTO reviews (name,location,project_type,rating,review) VALUES (?,?,?,?,?)', s);
    }
    console.log('✅ Seeded 5 initial reviews.');
  }
}

app.use(cors());
app.use(express.json());

app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await all('SELECT * FROM reviews WHERE approved=1 ORDER BY created_at DESC');
    res.json(reviews);
  } catch (e) { res.status(500).json({ error: 'Database error.' }); }
});

app.get('/api/reviews/stats', async (req, res) => {
  try {
    const stats = await get(`
      SELECT COUNT(*) as total, ROUND(AVG(rating),1) as average,
        SUM(CASE WHEN rating=5 THEN 1 ELSE 0 END) as five_star,
        SUM(CASE WHEN rating=4 THEN 1 ELSE 0 END) as four_star,
        SUM(CASE WHEN rating=3 THEN 1 ELSE 0 END) as three_star,
        SUM(CASE WHEN rating=2 THEN 1 ELSE 0 END) as two_star,
        SUM(CASE WHEN rating=1 THEN 1 ELSE 0 END) as one_star
      FROM reviews WHERE approved=1
    `);
    res.json(stats);
  } catch (e) { res.status(500).json({ error: 'Database error.' }); }
});

app.post('/api/reviews', async (req, res) => {
  const { name, location, project_type, rating, review } = req.body;
  if (!name || !location || !project_type || !rating || !review)
    return res.status(400).json({ error: 'All fields are required.' });
  if (rating < 1 || rating > 5)
    return res.status(400).json({ error: 'Rating must be 1-5.' });
  if (review.length < 10)
    return res.status(400).json({ error: 'Review is too short.' });
  if (name.length > 100 || review.length > 2000)
    return res.status(400).json({ error: 'Input too long.' });
  try {
    const result = await run(
      'INSERT INTO reviews (name,location,project_type,rating,review) VALUES (?,?,?,?,?)',
      [name.trim(), location.trim(), project_type.trim(), parseInt(rating), review.trim()]
    );
    const newReview = await get('SELECT * FROM reviews WHERE id=?', [result.lastID]);
    res.status(201).json(newReview);
  } catch (e) { res.status(500).json({ error: 'Could not save review.' }); }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../client/dist/index.html')));
}

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`\n🏗  H&S World API → http://localhost:${PORT}`);
    console.log(`📋 Reviews:  GET  /api/reviews`);
    console.log(`📊 Stats:    GET  /api/reviews/stats`);
    console.log(`✍️  Submit:   POST /api/reviews\n`);
  });
}).catch(err => { console.error('DB init failed:', err); process.exit(1); });
