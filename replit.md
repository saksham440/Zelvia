# Overview

This is a full-stack e-commerce application called "Zelvia" - a premium online shopping platform built with React (frontend) and Express.js (backend). The application presents curated product categories with external affiliate links to Amazon, providing a marketplace-style shopping experience focused on quality products from trusted brands.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **React 18** with TypeScript for the main application framework
- **Vite** as the build tool and development server for fast hot-reloading and optimized builds
- **Wouter** for client-side routing instead of React Router for a lighter footprint
- **TanStack Query** for server state management and data fetching
- **shadcn/ui** component library built on Radix UI primitives for consistent, accessible UI components
- **Tailwind CSS** for utility-first styling with custom design tokens and CSS variables
- **Class Variance Authority** for component variant management

## Backend Architecture  
- **Express.js** server with TypeScript for API handling
- **In-memory storage** implementation with interface-based design for easy database migration
- **Modular route system** with centralized error handling middleware
- **Development/Production** environment configuration with different server setups

## Database Design
- **Drizzle ORM** configured for PostgreSQL with Neon Database integration
- **Schema definitions** for newsletters and chat messages tables
- **Zod validation** schemas integrated with Drizzle for type-safe data validation
- Database migrations managed through Drizzle Kit

## Component Architecture
- **Atomic design** approach with reusable UI components
- **Feature-based components** including Categories, Hero, Reviews, Newsletter, LiveChat
- **Responsive design** with mobile-first approach and comprehensive breakpoint handling
- **Accessibility features** with proper ARIA labels and keyboard navigation support

## Development Tooling
- **TypeScript** with strict type checking across frontend, backend, and shared modules
- **ESLint and Prettier** implied through shadcn/ui setup for code quality
- **Path aliases** configured for clean imports (@/, @shared/, @assets/)
- **PostCSS and Autoprefixer** for CSS processing

# External Dependencies

## Database & ORM
- **Neon Database** - Serverless PostgreSQL database (via @neondatabase/serverless)
- **Drizzle ORM** - Type-safe ORM with PostgreSQL dialect
- **Drizzle Kit** - Database toolkit for migrations and schema management

## UI & Styling
- **Radix UI** - Comprehensive set of accessible UI primitives (20+ components)
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library for consistent iconography
- **Embla Carousel** - Touch-friendly carousel component

## State Management & Data Fetching  
- **TanStack React Query** - Powerful data synchronization for React
- **React Hook Form** - Forms with easy validation (@hookform/resolvers)
- **Wouter** - Minimalist routing library

## Development & Build Tools
- **Vite** - Next generation frontend build tool
- **TypeScript** - Static type checker
- **esbuild** - Fast JavaScript bundler for production builds
- **@replit/vite-plugin** - Replit-specific development enhancements

## External Services
- **Amazon Affiliate Links** - Product recommendations redirect to Amazon with affiliate tracking
- **Google Fonts** - Custom typography (Inter and Poppins font families)
- **Unsplash** - High-quality product category images

## Validation & Utilities
- **Zod** - TypeScript-first schema validation
- **date-fns** - Modern JavaScript date utility library
- **clsx & tailwind-merge** - Utility for conditional CSS classes
- **nanoid** - URL-friendly unique string ID generator