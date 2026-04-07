# 🏗 H AND S WORLD (M) SDN. BHD. — Full-Stack Landing Page

A professional, full-stack landing page for H AND S WORLD construction company.  
Built with **React** (frontend) + **Express + SQLite** (backend).

---

## ✅ Features

- 🎨 Clean, professional Navy, White & Gold design
- 🏗 Hero section with stats and animated cards
- 🔨 Services grid (6 services)
- 🏆 Why Choose Us section
- 📸 Before & After project showcase
- ⭐ **Live Reviews** — fetched from real database
- ✍️ **Submit a Review** — anyone can leave a star-rated review
- 📊 Review stats panel (rating distribution)
- 📞 Contact / Quote request form
- 📱 Fully responsive (mobile-friendly)

---

## 🚀 Getting Started

### Requirements
- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

---

### Step 1 — Install dependencies

Open a terminal in the project root folder (`hsworld/`), then:

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

---

### Step 2 — Start the backend server

In one terminal window:

```bash
cd server
node index.js
```

You should see:
```
🏗  H&S World API running at http://localhost:3001
📋 Reviews endpoint: http://localhost:3001/api/reviews
```

---

### Step 3 — Start the frontend

In a **second terminal window**:

```bash
cd client
npx vite
```

Then open your browser at:
👉 **http://localhost:5173**

---

## 📁 Project Structure

```
hsworld/
├── server/
│   ├── index.js          # Express API server
│   ├── reviews.db        # SQLite database (auto-created)
│   └── package.json
│
├── client/
│   ├── index.html
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       └── components/
│           ├── Navbar.jsx / .css
│           ├── Hero.jsx / .css
│           ├── Services.jsx / .css
│           ├── WhyUs.jsx / .css
│           ├── Projects.jsx / .css
│           ├── Reviews.jsx / .css   ← Full-stack reviews
│           ├── Contact.jsx / .css
│           └── Footer.jsx / .css
│
└── README.md
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reviews` | Fetch all approved reviews |
| GET | `/api/reviews/stats` | Get rating statistics |
| POST | `/api/reviews` | Submit a new review |

### POST `/api/reviews` — Body
```json
{
  "name": "Ahmad Razif",
  "location": "Shah Alam, Selangor",
  "project_type": "New Residential Build",
  "rating": 5,
  "review": "Excellent work, highly recommend!"
}
```

---

## 🌐 Deploying to Production

### Build the frontend:
```bash
cd client
npx vite build
```

### Then in `server/index.js`, set:
```
NODE_ENV=production node index.js
```

The Express server will serve the React build at port 3001.

---

## 📞 Contact Details to Update

In the code, replace these placeholders with your real details:
- **Phone**: `+60 12-345 6789`
- **WhatsApp**: `https://wa.me/60123456789`
- **Email**: `info@hsworldsdn.com`

---

*Built for H AND S WORLD (M) SDN. BHD. — Building Dreams Into Reality.*
  