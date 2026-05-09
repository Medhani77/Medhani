# Medhani Niwoda — Curated Living Store

A full-stack e-commerce web application for a lifestyle retail brand offering beauty, home, fashion, and gourmet products.

---

## Project Structure

```
medhani-niwoda/
├── app.js          # Front-end application logic (products, cart, UI)
├── index.html      # Main storefront page
├── DarkMode.html   # Dark-mode variant of the storefront
├── login.html      # Sign-in / sign-up page
├── login.css       # Styles for the login page
├── DarkCSS.css     # Dark-mode stylesheet
├── .env            # Environment variables (not for version control)
└── node_modules/   # Dependencies
```

---

## Features

- **40 hardcoded products** across four categories — Beauty, Home, Fashion, and Gourmet
- **Shopping cart** with localStorage persistence (`mn_cart` key)
- **Category filtering** and live search
- **Hero slideshow** with auto-advance and dot navigation
- **Product modals** with quantity selection
- **Toast notifications** for cart/UI feedback
- **Sticky/scroll-aware header**
- **Dark mode** via a separate HTML/CSS variant
- **Authentication UI** — sign in / sign up page with a two-panel layout

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vanilla HTML, CSS, JavaScript |
| Fonts | Cormorant Garamond, Jost (Google Fonts) |
| Backend (planned/partial) | Node.js, Express |
| Database | MySQL (`e_commerce` database) |
| Auth | JWT (`jsonwebtoken`), bcryptjs |
| Config | dotenv |
| Other deps | cors, body-parser |

---

## Getting Started

### Prerequisites

- Node.js (v16+)
- MySQL server running locally

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy or edit `.env` in the project root:

```env
JWT_SECRET=your_secret_key_here
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_db_password
DB_NAME=e_commerce
PORT=3000
```

> **Important:** Never commit `.env` to version control. Add it to `.gitignore`.

### 3. Set up the database

Create the MySQL database:

```sql
CREATE DATABASE e_commerce;
```

Then run any migration/seed scripts (if available) to create the required tables.

### 4. Run the server

```bash
node server.js   # or whichever entry point starts the Express server
```

The app will be available at `http://localhost:3000`.

---

## Product Categories

| Category | Items | Example Products |
|----------|-------|-----------------|
| Beauty | 10 | Rose Gold Glow Serum, Velvet Lip Collection, Retinol Night Cream |
| Home | 10 | Linen & Amber Candle, Marble & Brass Wall Clock, Minimalist Table Lamp |
| Fashion | 10 | Pearl Drop Earrings, Leather Crossbody Bag, Silk Scarf |
| Gourmet | 10 | Artisan Dark Chocolate Box, Ceremonial Matcha Set, Luxury Tea Chest |

Some products are marked **out of stock** (`stock: 0`) and are correctly handled in the UI.

---

## Notes

- Cart state persists in the browser via `localStorage` — no back-end cart endpoint required for the current front-end build.
- The `.env` file ships with a placeholder `JWT_SECRET` (`mysecretkey123`) — **replace this before any deployment**.
- The dark mode variant (`DarkMode.html` + `DarkCSS.css`) is a standalone page, not a runtime toggle.
