# Test Airlines Instalments Playground - Project Documentation

## Project Overview
**Project Name:** Test Airlines Instalments Playground  
**Port:** 3332 (localhost:3332)  
**Framework:** Next.js 14 with App Router  
**Language:** TypeScript  
**Styling:** Tailwind CSS  
**Animations:** Framer Motion  
**Sound Effects:** Web Audio API  

## Technical Architecture

### Core Technologies
- **Next.js 14.2.5** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library for React
- **React 18+** - Latest React features
- **Web Audio API** - Mac/Apple-style sound effects

### Project Structure
```
PayInInstalments/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Main homepage with model cards
│   ├── models/                   # Individual instalment model pages
│   │   ├── merchant-fullauth/    # Merchant full auth model
│   │   ├── merchant-mit/         # Merchant MIT model
│   │   ├── bnpl/                 # BNPL model
│   │   ├── embedded-bnpl/        # Embedded BNPL model
│   │   ├── psp/                  # PSP driven model
│   │   ├── acquirer/             # Acquirer driven model
│   │   ├── issuer-pre/           # Bank driven pre-purchase
│   │   ├── issuer-post/          # Bank driven post-purchase
│   │   ├── deferred/             # Deferred payment model
│   │   ├── deposit-instalments/  # Deposit system model
│   │   └── hybrid/               # Hybrid router model
│   └── api/                      # API routes
│       ├── terms/                # T&Cs API endpoint
│       ├── authorise/            # Payment authorization
│       ├── provider/             # BNPL provider endpoints
│       └── ...
├── components/                   # React components
│   ├── EnhancedNotesSection.tsx  # Advanced notes system
│   ├── NavigationHeader.tsx      # Navigation header
│   ├── TranslateText.tsx         # Multi-language translation
│   ├── PictorialSequenceDiagram.tsx # Visual sequence diagrams
│   ├── AddNoteIcon.tsx           # Quick note addition
│   ├── InstalmentsComparisonTable.tsx # Model comparison
│   └── ...
├── utils/                        # Utility functions
│   ├── soundManager.ts           # Mac-style sound effects
│   └── ...
├── docs/                         # Documentation
│   ├── AMADEUS_IMPLEMENTATION.md # Amadeus integration details
│   ├── BA_HOLIDAYS_EXTENSION.md  # Test Airlines Holidays extension
│   ├── IBERIA_CARDS_PROPOSAL.md  # Iberia Cards proposal
│   └── ...
└── cypress/                      # E2E testing
    └── e2e/                      # Test specifications
```

## Functional Requirements

### Core Features
1. **Multi-Model Instalment System** - Support for 11 different instalment models
2. **Apple-Style UX** - Modern, polished user interface with micro-animations
3. **Advanced Notes System** - Persistent, categorized notes with auto-completion
4. **Multi-language Support** - Translation for Spanish and Portuguese content
5. **Visual Flow Diagrams** - Pictorial sequence diagrams for payment flows
6. **Sound Feedback** - Mac-style audio feedback for user interactions
7. **Responsive Design** - Mobile-first responsive layout

### Instalment Models Supported
1. **Merchant-Financed (Full Auth)** - Single authorization with staged captures
2. **Merchant-Financed (MIT)** - Initial CIT + monthly MIT debits
3. **BNPL Partners** - Third-party BNPL provider financing
4. **Embedded BNPL** - Merchant-embedded BNPL with multiple providers
5. **PSP Driven** - Payment processor managed instalments
6. **Acquirer Driven** - Payment acquirer managed instalments
7. **Bank Driven (Pre-purchase)** - Card issuer pre-purchase instalments
8. **Bank Driven (Post-purchase)** - Card issuer post-purchase conversion
9. **Deferred Payment** - Pay later without instalments
10. **Deposit System** - Deposit + balance instalments
11. **Hybrid Router** - Smart routing system

## Technical Requirements

### Dependencies
```json
{
  "dependencies": {
    "next": "14.2.5",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "framer-motion": "^11.0.0",
    "tailwindcss": "^3.4.0",
    "@types/node": "^20.14.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "typescript": "^5.4.0"
  }
}
```

### Environment Configuration
- **Port:** 3332 (configured in package.json dev script)
- **Node.js Version:** 18+ recommended
- **Development Mode:** Hot reload enabled
- **Production:** Static export ready

### Performance Characteristics
- **Initial Load:** ~2-9 seconds (development mode)
- **Route Navigation:** Sub-second transitions
- **Animation Performance:** 60fps with Framer Motion
- **Bundle Size:** Optimized with Next.js automatic code splitting

## Current Implementation Status

### ✅ Completed Features
1. **Enhanced Home Page** with Apple-style animations
2. **Navigation System** with proper model routing
3. **Notes System** with categorization and persistence
4. **Sound Effects** using Web Audio API
5. **Translation Components** for multi-language support
6. **Pictorial Sequence Diagrams** for visual flows
7. **Responsive Design** across all device sizes
8. **Terms & Conditions** API with market localization

### 🚧 In Progress
1. **Simulation Warning Removal** - Cleaning up demo references
2. **T&Cs Conversion** to bullet points format
3. **Model Page Enhancements** with back navigation
4. **Apple UX Polish** across all components

### 📋 Pending Tasks
1. Convert sequence diagrams to pictorial format in model pages
2. Make model sections rearrangeable within categories
3. Add back navigation to model steps
4. Ensure test card data in all payment options
5. Add prominent Model Attributes sidebar
6. Fix curved bracket representation
7. Populate missing T&Cs for all models

## Development Workflow

### Starting the Application
```bash
cd "C:/Gaurav/Gaurav CV et al/AI project/PayInInstalments"
npm install
npm run dev
# Application available at http://localhost:3332
```

### Code Style Guidelines
- **TypeScript Strict Mode** enabled
- **ESLint** for code quality
- **Tailwind CSS** for styling (no custom CSS)
- **Framer Motion** for animations
- **Apple Design Principles** - Clean, minimal, polished

### Testing
- **Manual Testing** via browser at localhost:3332
- **Cypress E2E Tests** for critical user flows
- **Type Safety** enforced by TypeScript

## Security Considerations
- **No Real Payments** - Simulation environment only
- **Test Data Only** - No production payment processing
- **Local Development** - No external APIs in dev mode
- **HTTPS Ready** - Production deployment ready

## Deployment Notes
- **Static Export** capable for CDN deployment
- **Vercel Ready** - Optimized for Vercel deployment
- **Environment Variables** configured for different environments
- **Build Size** optimized with tree-shaking

## Key Files and Their Purposes

### Core Application Files
- `app/page.tsx` - Main landing page with model cards and animations
- `components/EnhancedNotesSection.tsx` - Advanced notes system with AI features
- `components/NavigationHeader.tsx` - Main navigation with responsive design
- `utils/soundManager.ts` - Mac-style sound effects implementation

### API Endpoints
- `/api/terms` - Dynamic T&Cs based on model and market
- `/api/authorise` - Payment authorization simulation
- `/api/provider/complete` - BNPL provider completion handling

### Model Pages
Each model has its own page under `/models/{model-name}/` with:
- Payment flow visualization
- Terms & conditions display
- Interactive payment forms
- Sequence diagrams
- Back navigation (pending)

## Browser Compatibility
- **Chrome 88+** (full Web Audio API support)
- **Firefox 78+** (full feature support)
- **Safari 14+** (full feature support)
- **Edge 88+** (full feature support)

## Performance Metrics
- **Lighthouse Score:** 90+ (development target)
- **Core Web Vitals:** Green across all metrics
- **Bundle Size:** <500KB initial load
- **Animation Performance:** Consistent 60fps

## Project Context
This is an internal demonstration application for Test Airlines to explore various instalment payment models. The application serves as a playground for testing different payment flows, user experiences, and integration patterns with various payment providers including BNPL partners, acquirers, and card issuers.

## Recent Changes Log
- **2025-09-04:** Enhanced Apple UX styling, implemented sound effects
- **2025-09-04:** Added advanced notes system with categorization
- **2025-09-04:** Implemented multi-language translation support
- **2025-09-04:** Created pictorial sequence diagram components
- **2025-09-04:** Fixed navigation sync and header positioning

## Next Development Phase
Focus on completing the remaining UI/UX enhancements, ensuring all model pages have consistent Apple-style design, and implementing the remaining functional requirements including model attributes sidebar and enhanced T&Cs system.