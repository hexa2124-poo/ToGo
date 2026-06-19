# ☕ To Go Coffee — Premium Beverage Ordering Platform

> Fresh Coffee. Fast Service. Anytime.

A complete, production-ready ordering platform for **To Go Coffee** — a premium mobile coffee cart in Vesu, Surat. Built with Next.js 15, TypeScript, TailwindCSS, Framer Motion, with Google Sheets as the database and Google Apps Script as the REST API backend.

---

## ✨ Features

- **Customer storefront**: Animated hero, 70+ menu items across 12 categories, search & filter, quick-view modal, hot/cold variants, flavour customizations
- **Cart system**: Persistent cart (localStorage), slide-out drawer, floating cart button, quantity controls, order notes
- **WhatsApp checkout**: One-tap order submission pre-filled with itemized cart
- **Dark / Light mode**: System-aware theme toggle
- **PWA**: Installable, offline-capable via service worker
- **SEO**: JSON-LD local business schema, sitemap, robots.txt, Open Graph
- **Google Apps Script backend**: Full REST API (Products, Categories, Orders, Reviews, Settings) backed by Google Sheets, with JWT auth for admin routes

---

## 🏗️ Tech Stack

| Layer        | Technology                          |
|--------------|--------------------------------------|
| Frontend     | Next.js 15 (App Router), TypeScript |
| Styling      | TailwindCSS, Framer Motion          |
| State        | Zustand (cart, persisted)           |
| Backend      | Google Apps Script (REST API)       |
| Database     | Google Sheets                       |
| Image Store  | Google Drive                        |
| Auth         | JWT (HS256, signed in Apps Script)  |
| Hosting      | Vercel                              |
| Analytics    | Google Analytics 4                  |

---

## 📁 Project Structure

```
togocoffee/
├── app/
│   ├── (public)/menu/page.tsx     # Full menu page
│   ├── api/proxy/route.ts          # Proxy → Google Apps Script
│   ├── layout.tsx                  # Root layout, metadata, GA4, schema
│   ├── page.tsx                    # Homepage
│   ├── sitemap.ts
│   └── globals.css                 # Design system (CSS vars, dark mode)
├── components/
│   ├── layout/                     # Header, Footer
│   ├── home/                       # Hero, Featured, Rating, Location, Instagram
│   ├── menu/                       # ProductCard, ProductModal
│   └── cart/                       # CartDrawer, FloatingCartButton
├── lib/
│   ├── menu-data.ts                 # Full 70+ item menu (from your physical menu)
│   ├── cart-store.ts                # Zustand cart + WhatsApp message builder
│   ├── api.ts                       # API client (products, orders, auth…)
│   └── utils.ts                     # Helpers, SITE_CONFIG
├── types/index.ts                   # All TypeScript types
├── apps-script/
│   ├── Code.gs                      # REST API router
│   ├── Sheets.gs                    # Generic CRUD over Sheets
│   └── Auth.gs                      # JWT login/verify
├── public/
│   ├── manifest.json                # PWA manifest
│   ├── sw.js                        # Service worker
│   └── robots.txt
└── tailwind.config.ts                # Brand colors, fonts, animations
```

---

## 🚀 Deployment Guide

### 1. Google Sheets + Apps Script Backend

1. Create a new Google Sheet — name it `ToGoCoffee-DB`.
2. Open **Extensions → Apps Script**.
3. Create three files matching `apps-script/Code.gs`, `Sheets.gs`, `Auth.gs` in this repo and paste their contents in.
4. In the Apps Script editor, run `setupDatabase()` once (Sheets menu → select function → Run). This creates all sheets (`Products`, `Categories`, `Orders`, `Reviews`, `Settings`, `Users`, `Banners`, `Analytics`) with headers and seeds default settings.
5. Generate an admin password hash: edit `generatePasswordHash()` in `Auth.gs`, set your real password, run it, copy the logged hash.
6. Go to **Project Settings → Script Properties** and add:
   - `JWT_SECRET` → any long random string
   - `ADMIN_USERNAME` → your admin username
   - `ADMIN_PASSWORD_HASH` → the hash from step 5
7. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
8. Copy the deployment URL (ends in `/exec`) — this is your `NEXT_PUBLIC_API_URL`.
9. (Optional) Bulk-import your menu: use `lib/menu-data.ts` as reference and add rows to the `Products` and `Categories` sheets, or call the `POST /products` API for each item.

### 2. Google Drive (Image Storage)

1. Create a folder in Google Drive, e.g. `ToGoCoffee-Images`.
2. Share it as "Anyone with the link can view."
3. Upload product images; right-click → Get link → copy the file ID from the URL.
4. Public image URL format: `https://drive.google.com/uc?export=view&id=FILE_ID`
5. Paste this URL into the `imageUrl` field of each product row in the `Products` sheet.

### 3. Frontend (GitHub + Vercel)

```bash
# Clone / unzip this project, then:
cd togocoffee
npm install
cp .env.example .env.local
# Edit .env.local with your Apps Script URL, GA4 ID, site URL
npm run dev          # local dev at http://localhost:3000
```

**Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit: To Go Coffee platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/togocoffee.git
git push -u origin main
```

**Deploy to Vercel:**
1. Go to [vercel.com/new](https://vercel.com/new) and import your GitHub repo.
2. Add Environment Variables (same as `.env.local`):
   - `NEXT_PUBLIC_API_URL`
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_GA_ID`
   - `NEXT_PUBLIC_GSC_ID`
3. Deploy. Vercel auto-detects Next.js.
4. Add your custom domain (e.g. `togocoffee.in`) under Project → Settings → Domains.

### 4. Google Analytics 4

1. Create a GA4 property at [analytics.google.com](https://analytics.google.com).
2. Copy the Measurement ID (`G-XXXXXXXXXX`).
3. Set `NEXT_PUBLIC_GA_ID` in Vercel env vars and redeploy.

### 5. Google Search Console

1. Add your property at [search.google.com/search-console](https://search.google.com/search-console).
2. Verify via the HTML tag method — copy the content value into `NEXT_PUBLIC_GSC_ID`.
3. Submit `https://togocoffee.in/sitemap.xml`.

---

## 🎨 Design System

| Token       | Value     | Usage                  |
|-------------|-----------|-------------------------|
| `primary`   | `#8B0000` | CTAs, brand accents     |
| `secondary` | `#C89B3C` | Gold highlights, ratings|
| `coffee`    | `#4A2C2A` | Warm earthy backgrounds |
| `cream`     | `#FFF8F0` | Light mode background   |
| `dark`      | `#111827` | Dark mode background    |
| `success`   | `#22C55E` | Open status, confirmations |

Fonts: **Playfair Display** (headings) + **Inter** (body).

---

## 📋 Next Phases (build on request)

- **Phase 2**: Admin Panel UI (dashboard, product/order management, image uploader)
- **Phase 3**: Cart → Thank You page flow, order confirmation, order tracking
- **Phase 4**: PWA icon set generation, push notifications
- **Phase 5**: Bulk import/export, analytics dashboard, banner management

---

Built for **To Go Coffee**, Phoenix Market, Vesu, Surat. 📍
