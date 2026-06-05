# 🔗 URL Shortener

A production-inspired URL Shortener built with TypeScript, Express, PostgreSQL, Prisma, and Redis. Main focus to undersatnd how system design works for simple problems and how decision making drives a real world project.

## ✨ Features (-- V1.0)

* Generate short URLs using Base62 encoding
* Custom aliases
* Fast URL redirects
* Click tracking
* Analytics (24-hour and 7-day metrics)
* URL expiration
* Activate / deactivate links
* Soft delete support
* Redis caching
* Cache invalidation
* Rate limiting
* Interactive Swagger API documentation

---

## 🏗️ Architecture

```text
Client
  │
  ▼
Express API
  │
  ├── Redis (Cache)
  │
  ▼
PostgreSQL (Prisma)
```

### Redirect Flow

```text
Request
   │
   ▼
Redis Cache
   │
Hit? ── Yes ──► Redirect
   │
   No
   ▼
PostgreSQL
   │
   ▼
Cache Result
   │
   ▼
Redirect
```

---

## 🛠️ Tech Stack

| Technology | Purpose           |
| ---------- | ----------------- |
| TypeScript | Type Safety       |
| Express.js | API Framework     |
| PostgreSQL | Database          |
| Prisma     | ORM               |
| Redis      | Caching           |
| Swagger    | API Documentation |

---

## 📊 Analytics

Each redirect generates a ClickEvent record.

Available metrics:

* Total Clicks
* Last 24 Hours Clicks
* Last 7 Days Clicks

---

## 🚀 Getting Started

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

```env
DATABASE_URL=
REDIS_URL=
```

### Run Database Migrations

```bash
npx prisma migrate dev
```

### Start Server

```bash
npm run dev
```

---

## 📖 API Documentation

Swagger UI:

```text
http://localhost:3000/api-docs
```

---

## Current Issues
* Making 2 Db hits for storing storing Url(first hit to generate Id second hit to update shortcode)
* Simple and less reliable error handling
* A hit before getting url from shortCode as need to check whether shortCode is present or not(directly related to error handling)


## 🔮 Future Improvements (-- V2.0)

* Error handling improvement
* Snowflake ID generation to eliminate the second database write during URL creation
* QR code generation
* Custom domains
* User authentication
* Advanced analytics dashboard
* Distributed rate limiting

---

## 📌 Key Concepts Demonstrated

* REST API Design
* Database Modeling
* Redis Cache-Aside Pattern
* Cache Invalidation
* Rate Limiting
* URL Encoding (Base62)
* Soft Delete Strategy
* API Documentation with OpenAPI
* Analytics Event Tracking
