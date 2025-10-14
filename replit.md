# WanderLingo - AI Translation Companion

## Overview

WanderLingo is a web-based AI translation application designed for travelers. It provides instant camera-based translation of menus, signs, and documents, real-time chat interpretation, and a searchable translation library. The application emphasizes mobile-first design with offline capabilities and a clean, accessible user interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React with TypeScript**: Component-based UI built with React, leveraging TypeScript for type safety
- **Vite**: Modern build tool and development server with HMR (Hot Module Replacement)
- **Wouter**: Lightweight client-side routing library for navigation
- **SPA Architecture**: Single-page application with client-side routing

**UI & Styling**
- **Design System**: Custom design based on shadcn/ui components with Canva-inspired aesthetics (soft colors, subtle shadows)
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Theme System**: Built-in light/dark mode support with system preference detection
- **Typography**: Inter font for UI, JetBrains Mono for code/technical content
- **Mobile-First**: Responsive design prioritizing mobile experience

**State Management**
- **TanStack Query (React Query)**: Server state management with intelligent caching and refetching strategies
- **Local State**: Component-level state using React hooks
- **Theme Context**: Custom context provider for theme management

**Key Design Decisions**
- Chose shadcn/ui over pre-built component libraries for maximum customization flexibility
- Vite selected for superior developer experience and build performance compared to Create React App
- Wouter chosen over React Router for smaller bundle size and simpler API

### Backend Architecture

**Server Framework**
- **Express.js**: Minimal REST API server with TypeScript
- **Node.js**: JavaScript runtime environment
- **ES Modules**: Modern module system (type: "module" in package.json)

**API Structure**
- RESTful endpoints prefixed with `/api`
- Custom middleware for request logging and error handling
- Session-based architecture prepared (storage interface defined)

**Development Setup**
- Hot reload with tsx for TypeScript execution
- Vite integration for development mode
- Static file serving for production builds

**Storage Interface**
- Abstract storage interface (IStorage) for database operations
- In-memory implementation (MemStorage) as reference/development storage
- Prepared for database integration with user CRUD operations

**Key Design Decisions**
- Express chosen for simplicity and wide ecosystem support
- Storage abstraction allows swapping between in-memory and persistent databases without changing business logic
- Vite middleware integration enables seamless full-stack development experience

### External Dependencies

**Database & ORM**
- **Drizzle ORM**: Type-safe SQL query builder for PostgreSQL
- **Neon Database (@neondatabase/serverless)**: Serverless PostgreSQL provider
- **Schema**: User authentication schema with UUID primary keys
- **Migrations**: Configured with drizzle-kit for schema management

**UI Component Libraries**
- **Radix UI**: Comprehensive collection of unstyled, accessible UI primitives
  - Dialog, Dropdown, Popover, Accordion, Tabs, Toast, and 20+ other components
  - All components are WAI-ARIA compliant for accessibility
- **Lucide Icons**: Icon library for consistent iconography
- **class-variance-authority (CVA)**: Type-safe variant styling utility
- **cmdk**: Command palette component

**Payment Integration (Prepared)**
- **Stripe**: Payment processing with React Stripe.js and Stripe.js SDK
  - Checkout sessions for one-time and subscription payments
  - Customer portal for subscription management
  - Webhook integration expected for payment events

**Forms & Validation**
- **React Hook Form**: Performant form state management
- **Zod**: TypeScript-first schema validation
- **@hookform/resolvers**: Integration between React Hook Form and Zod

**Translation Services (Expected)**
- **OpenAI GPT-4o-mini**: Primary translation provider for menu analysis, allergen detection
- **DeepL API**: Optional fallback provider for bulk translations
- **Tesseract.js**: Browser-based OCR for image text extraction
- **Web Speech API**: Text-to-speech and speech-to-text capabilities
- **Whisper API**: Server-side speech-to-text processing

**Offline & PWA Capabilities (Planned)**
- **Service Worker**: Offline-first caching strategy
- **IndexedDB (idb)**: Client-side storage for translation library
- **Progressive Enhancement**: Core features work without JavaScript

**Analytics & Monitoring (Prepared)**
- **PostHog**: Product analytics and feature flags
- **Event Tracking**: User behavior and conversion funnel analysis

**Key Integration Decisions**
- Drizzle ORM chosen over Prisma for lighter weight and better PostgreSQL-specific features
- Neon Database selected for serverless architecture compatibility and generous free tier
- Radix UI provides accessible primitives without imposing design opinions
- Stripe integration prepared for freemium model (free tier with paid lifetime/subscription options)
- Multi-provider translation strategy ensures reliability and cost optimization
- Browser-based OCR (Tesseract.js) prioritized for privacy and reduced API costs