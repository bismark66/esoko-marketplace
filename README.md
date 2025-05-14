# Esoko Market Place Project

A modern, high-performance agricultural e-commerce platform built with Vite, React, and TypeScript.

## Table of Contents
- [Esoko Market Place Project](#esoko-market-place-project)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
    - [Core Features](#core-features)
    - [Performance Optimizations](#performance-optimizations)
  - [Tech Stack](#tech-stack)
    - [Frontend](#frontend)
    - [State Management](#state-management)
    - [Backend Integration](#backend-integration)
    - [Testing](#testing)
    - [DevOps](#devops)
  - [Architecture](#architecture)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
- [Clone the repository](#clone-the-repository)
- [Navigate to project directory](#navigate-to-project-directory)
- [Install dependencies](#install-dependencies)
- [or](#or)
- [Copy environment variables](#copy-environment-variables)
- [Start development server](#start-development-server)
- [or](#or-1)
- [ENV variables](#env-variables)
- [Start development server](#start-development-server-1)
- [Build for production](#build-for-production)
- [Preview production build locally](#preview-production-build-locally)
- [Run tests](#run-tests)
- [Run linter](#run-linter)
- [Format code](#format-code)
- [Run all tests](#run-all-tests)
- [Run tests in watch mode](#run-tests-in-watch-mode)
- [Generate coverage report](#generate-coverage-report)
- [Build Docker image](#build-docker-image)
- [Run container](#run-container)

## Features

### Core Features
⚡️ Lightning-fast development with Vite  
🛒 Complete shopping cart with persistence  
💳 Secure payment processing (Mobile Money & Credit Cards)  
📱 Fully responsive design  
🔍 Advanced product search and filtering  
👤 JWT-based user authentication  
📦 Order tracking system  
📊 Admin dashboard (coming soon)

### Performance Optimizations
- Code splitting with React.lazy
- Image optimization
- Memoized components
- Efficient state management
- Progressive Web App ready

## Tech Stack

### Frontend
- **Vite** (Build tool)
- **React 18** (UI Library)
- **TypeScript** (Type checking)
- **TanStack Query** (Data fetching)
- **React Router 6** (Routing)
- **Tailwind CSS** (Styling)
- **React Hook Form** (Forms)
- **Zod** (Validation)
- **Axios** (HTTP client)

### State Management
- Context API (Auth, Cart)
- useReducer (Complex state logic)

### Backend Integration
- RESTful API (JSON)
- JWT Authentication

### Testing
- Vitest (Unit testing)
- React Testing Library
- Mock Service Worker (API mocking)

### DevOps
- Docker (Containerization)
- GitHub Actions (CI/CD)
- Nginx (Production server)
- Sentry (Error monitoring)

## Architecture
esoko-marketplace/
├── src/
│ ├── assets/ # Static assets
│ ├── components/ # Reusable components
│ ├── context/ # Global state
│ ├── hooks/ # Custom hooks
│ ├── pages/ # Route components
│ ├── services/ # API services
│ ├── styles/ # Global styles
│ ├── types/ # Type definitions
│ ├── utils/ # Utility functions
│ ├── App.tsx # Main app component
│ └── main.tsx # Entry point
├── public/ # Public assets
├── .env.example # Environment variables template
├── vite.config.ts # Vite configuration
└── tsconfig.json # TypeScript configuration

## Getting Started

### Prerequisites

- Node.js v18+
- npm v9+ or yarn v1.22+
- Git

### Installation

```bash
# Clone the repository
git clone git@github.com:esoko-ghana/esoko-marketplace.git

# Navigate to project directory
cd esoko-marketplace

# Install dependencies
npm install
# or
yarn install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
# or
yarn dev

Development server runs on http://localhost:5173


# ENV variables
VITE_API_BASE_URL=



# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run tests
npm run test

# Run linter
npm run lint

# Format code
npm run format

# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage

# Build Docker image
docker build -t esoko-marketplace .

# Run container
docker run -p 5173:80 esoko-marketplace