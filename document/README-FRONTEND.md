# PathPilot Frontend

React 18 + TypeScript + Vite + Tailwind CSS frontend for PathPilot.

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
npm install
```

### Development
```bash
# Start frontend development server
npm run dev:frontend

# Start backend development server (separate terminal)
npm run dev
```

### Build
```bash
# Build frontend for production
npm run build:frontend

# Preview production build
npm run preview:frontend
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx
│   └── index.ts
├── pages/              # Page components
│   ├── LandingPage.tsx
│   └── index.ts
├── styles/             # Global styles and CSS
│   └── index.css
├── api/                # Backend API (Hono)
├── shared/             # Shared types and utilities
├── App.tsx             # Main App component
└── main.tsx           # React entry point
```

## Technology Stack

### Frontend
- **React 18** - UI library with modern features
- **TypeScript** - Type safety and better DX
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Popular icon library

### Styling
- **Tailwind CSS** - Configured with custom color palette
- **PostCSS** - CSS processing with autoprefixer
- **Custom Components** - Reusable button, card, input styles

### Development Tools
- **ESLint** - Code linting and formatting
- **TypeScript** - Static type checking
- **Vite HMR** - Hot module replacement for fast development

## Configuration

### Vite Config (`vite.config.ts`)
- React plugin enabled
- Path aliases configured (`@/`, `@components/`, etc.)
- Build optimization with chunk splitting
- Development server on port 3000

### TypeScript Config (`tsconfig.json`)
- Modern ES2020 target
- React JSX support
- Strict type checking enabled
- Path mapping for clean imports

### Tailwind Config (`tailwind.config.js`)
- Custom color palette (primary, secondary, success, warning, error)
- Extended spacing and typography
- Custom animations and keyframes
- Optimized for component classes

## Deployment

The project is configured for Cloudflare deployment:

1. **Build**: `npm run build:frontend`
2. **Output**: Static files in `dist/` directory
3. **Cloudflare Pages**: Auto-deploy from git repository
4. **Environment**: Production optimizations enabled

## Development Guidelines

### File Naming
- Components: PascalCase (e.g., `Header.tsx`)
- Pages: PascalCase with "Page" suffix (e.g., `LandingPage.tsx`)
- Utilities: camelCase (e.g., `apiHelpers.ts`)

### Import Organization
```typescript
// External libraries
import React from 'react'
import { FaIcon } from 'react-icons/fa'

// Internal components
import { Header } from '@components'
import { LandingPage } from '@pages'

// Types and utilities
import type { User } from '@shared/types'
```

### Component Structure
```typescript
import React from 'react'

interface ComponentProps {
  title: string
  optional?: boolean
}

export const Component: React.FC<ComponentProps> = ({ 
  title, 
  optional = false 
}) => {
  return (
    <div className="component-class">
      {title}
    </div>
  )
}

export default Component
```

## Available Scripts

- `npm run dev:frontend` - Start Vite dev server
- `npm run build:frontend` - Build for production  
- `npm run preview:frontend` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking