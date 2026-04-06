# UniPath — University Consulting Platform

A production-quality full-stack web application for a university consulting firm that helps students apply to universities abroad.

## 🌍 Live Preview

Deploy to Vercel in one click (see [Deployment](#-deployment) section below).

---

## ✨ Features

- **Public Landing Page** — Modern SaaS-style design with Hero, Services, How It Works, Testimonials, and CTA sections
- **Student Inquiry Form** (`/apply`) — Validated form with React Hook Form + Zod, loading states, and success/error feedback
- **Admin Dashboard** (`/admin`) — View all inquiries in a table, update status inline, delete entries
- **Inquiry Details Page** (`/admin/inquiries/[id]`) — Full inquiry details with status management
- **Status System** — New → Contacted → In Progress → Closed
- **REST API** — Full CRUD endpoints for inquiries
- **MongoDB** — Persistent data storage with Mongoose and connection caching

---

## 🛠 Tech Stack

| Layer       | Technology                              |
|-------------|------------------------------------------|
| Framework   | Next.js 15 (App Router) + TypeScript     |
| Styling     | Tailwind CSS                             |
| Forms       | React Hook Form + Zod validation         |
| Database    | MongoDB + Mongoose                       |
| Deployment  | Vercel                                   |

---

## 📁 Project Structure

```
├── app/
│   ├── page.tsx                      # Public landing page
│   ├── apply/page.tsx                # Student inquiry form
│   ├── admin/page.tsx                # Admin dashboard
│   ├── admin/inquiries/[id]/page.tsx # Inquiry detail view
│   ├── api/inquiries/route.ts        # POST + GET all inquiries
│   └── api/inquiries/[id]/route.ts   # GET + PATCH + DELETE single inquiry
├── components/
│   ├── Navbar.tsx                    # Responsive navigation bar
│   ├── Hero.tsx                      # Hero section
│   ├── Services.tsx                  # Services section
│   ├── HowItWorks.tsx                # Step-by-step process
│   ├── Testimonials.tsx              # Student testimonials
│   └── InquiryForm.tsx               # Validated application form
├── lib/
│   └── db.ts                         # MongoDB connection with caching
├── models/
│   └── Inquiry.ts                    # Mongoose schema + model
└── .env.example                      # Environment variable template
```

---

## 🚀 Setup Instructions

### Prerequisites

- Node.js 18+
- MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### 1. Clone the Repository

```bash
git clone https://github.com/kusal2002/unipath2.git
cd unipath2
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your MongoDB connection string:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/unipath
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📡 API Reference

| Method   | Endpoint                  | Description              |
|----------|---------------------------|--------------------------|
| `GET`    | `/api/inquiries`          | Get all inquiries        |
| `POST`   | `/api/inquiries`          | Create a new inquiry     |
| `GET`    | `/api/inquiries/:id`      | Get inquiry by ID        |
| `PATCH`  | `/api/inquiries/:id`      | Update inquiry status    |
| `DELETE` | `/api/inquiries/:id`      | Delete an inquiry        |

### Inquiry Status Values

- `New` (default)
- `Contacted`
- `In Progress`
- `Closed`

---

## ☁️ Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add `MONGODB_URI` in **Project Settings → Environment Variables**
4. Deploy!

---

## 🔑 Key Architecture Decisions

- **Connection Caching** (`lib/db.ts`): Mongoose connection is cached on the global object to prevent re-connecting on every API call in development (hot reload) and serverless environments.
- **App Router API Routes**: Each route file exports named HTTP method handlers (`GET`, `POST`, `PATCH`, `DELETE`) following Next.js 15 conventions.
- **Zod + React Hook Form**: Schema-first validation approach ensures form data is validated on the client before submission, with clear error messages per field.
- **Lean Queries**: MongoDB queries use `.lean()` to return plain JavaScript objects instead of Mongoose documents, improving performance.
