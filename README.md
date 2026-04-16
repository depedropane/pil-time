# 🎨 Portfolio Web App

Modern, production-ready portfolio application built with **Next.js 16**, **TypeScript**, **Tailwind CSS**, and **Supabase**.

## ✨ Features

### 🔐 Authentication
- User registration with email
- Email/password login
- Secure session management (SSR compatible)
- Protected routes with middleware
- Profile management

### 📋 Project Management
- **Create** projects with title, description, and image URL
- **Read** all projects in a beautiful grid layout
- **Update** project details
- **Delete** projects with confirmation
- Real-time data refresh

### 🎨 Modern UI/UX
- Clean, minimalist design (Vercel/Linear style)
- Fully responsive (mobile-first)
- Smooth animations and hover effects
- Loading skeletons for better UX
- Empty states with helpful messages
- Reusable component library

### 🚀 Performance
- Server Components for optimal performance
- Client Components only when necessary
- Optimized images and lazy loading
- Fast page transitions
- SEO optimized

## 📦 Tech Stack

Frontend:
- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- lucide-react (Icons)

Backend/Auth:
- Supabase (PostgreSQL Database)
- Supabase Auth (Email/Password)
- @supabase/ssr (SSR compatible)

## 🚀 Quick Start

### 1. Clone & Install
```bash
npm install
```

### 2. Setup Supabase
See [SETUP.md](./SETUP.md) for detailed Supabase configuration.

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Landing page (public)
│   ├── auth/
│   │   ├── login/page.tsx       # Login page
│   │   └── register/page.tsx    # Register page
│   └── dashboard/               # Protected routes
│       ├── layout.tsx           # Dashboard layout with sidebar
│       ├── page.tsx             # Dashboard overview
│       ├── projects/page.tsx    # Project CRUD
│       └── profile/page.tsx     # Profile settings
├── components/
│   ├── ui/                      # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── EmptyState.tsx
│   │   ├── Skeleton.tsx
│   │   └── Toast.tsx
│   └── shared/                  # Shared layout components
│       ├── DashboardNavbar.tsx
│       └── DashboardSidebar.tsx
├── hooks/
│   ├── useAuth.ts               # Authentication logic
│   └── useProjects.ts           # Project CRUD operations
├── lib/
│   ├── supabase/
│   │   ├── client.ts            # Browser client
│   │   ├── server.ts            # Server client
│   │   └── middleware.ts        # Route protection
│   └── constants.ts             # App constants
├── types/
│   └── index.ts                 # TypeScript interfaces
└── middleware.ts                # Next.js middleware
```

## 🔗 Routes

### Public Routes
- `/` - Landing page
- `/login` - Login form
- `/register` - Registration form

### Protected Routes (Authentication Required)
- `/dashboard` - Dashboard overview
- `/dashboard/projects` - Project management (CRUD)
- `/dashboard/profile` - Profile settings

## 🎯 Components

All UI components are built with Tailwind CSS:
- Button (variants: primary, secondary, ghost, danger)
- Input (with labels, errors, helper text)
- Card (base container)
- Modal (for forms/dialogs)
- EmptyState (for empty data)
- Skeleton (loading placeholders)
- Toast (notifications)

## 🚀 Deployment

Deploy to Vercel with one click:
1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy!

## 📝 Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

## 📚 Documentation

- [Setup Guide](./SETUP.md) - Detailed Supabase setup
- [Next.js Docs](https://nextjs.org)
- [Supabase Docs](https://supabase.com/docs)

## 📄 License

MIT

