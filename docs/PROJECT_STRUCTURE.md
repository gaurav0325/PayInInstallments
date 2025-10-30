# BA Installments Playground - Complete Project Structure

## 📁 Directory Structure

```
ba-instalments-playground/
├── 📄 README.md                     # Comprehensive documentation
├── 📄 package.json                  # Dependencies and scripts
├── 📄 next.config.mjs               # Next.js configuration
├── 📄 tsconfig.json                 # TypeScript configuration
├── 📄 tailwind.config.ts            # Tailwind CSS configuration
├── 📄 postcss.config.js             # PostCSS configuration
├── 📄 cypress.config.ts             # Cypress testing configuration
├── 📄 .eslintrc.cjs                 # ESLint configuration
├── 📄 .prettierrc                   # Prettier configuration
├── 📄 .env.example                  # Environment variables template
│
├── 🗂️ app/                          # Next.js 14 App Router
│   ├── 📄 layout.tsx               # Root layout with navigation
│   ├── 📄 page.tsx                 # Home page with model overview
│   ├── 📄 globals.css              # Global styles with Tailwind
│   │
│   ├── 🗂️ models/                  # Instalment model pages
│   │   ├── 🗂️ bnpl/
│   │   │   └── 📄 page.tsx         # BNPL Spain with provider redirect
│   │   ├── 🗂️ psp/
│   │   │   └── 📄 page.tsx         # PSP-driven embedded flow
│   │   ├── 🗂️ merchant/
│   │   │   └── 📄 page.tsx         # Merchant-financed instalments
│   │   ├── 🗂️ acquirer/
│   │   │   └── 📄 page.tsx         # Acquirer-driven light redirect
│   │   ├── 🗂️ issuer-pre/
│   │   │   └── 📄 page.tsx         # Pre-purchase bank instalments
│   │   ├── 🗂️ issuer-post/
│   │   │   └── 📄 page.tsx         # Post-purchase conversion
│   │   ├── 🗂️ deferred/
│   │   │   └── 📄 page.tsx         # Pay later by N days
│   │   ├── 🗂️ deposit-balance/
│   │   │   └── 📄 page.tsx         # Deposit now, balance before travel
│   │   └── 🗂️ hybrid/
│   │       └── 📄 page.tsx         # Smart routing orchestrator
│   │
│   └── 🗂️ api/                     # Backend API routes
│       ├── 🗂️ eligibility/
│       │   └── 📄 route.ts         # Business rules checking
│       ├── 🗂️ plan-quote/
│       │   └── 📄 route.ts         # Payment plan calculations
│       ├── 🗂️ authorise/
│       │   └── 📄 route.ts         # Payment authorization
│       ├── 🗂️ complete-3ds/
│       │   └── 📄 route.ts         # 3D Secure completion
│       ├── 🗂️ provider/
│       │   ├── 🗂️ start/
│       │   │   └── 📄 route.ts     # Provider redirect initiation
│       │   └── 🗂️ complete/
│       │       └── 📄 route.ts     # Provider callback handling
│       └── 🗂️ terms/
│           └── 📄 route.ts         # Terms and conditions API
│
├── 🗂️ components/                   # Reusable UI components
│   ├── 📄 ProgressSteps.tsx        # Multi-step flow indicator
│   ├── 📄 PlanPicker.tsx          # Instalment plan selector
│   ├── 📄 IdentityForm.tsx        # Spanish ID verification form
│   ├── 📄 CardForm.tsx            # Payment card entry form
│   ├── 📄 SummaryCard.tsx         # Flight booking summary
│   ├── 📄 ProviderRedirect.tsx    # Provider redirect simulation
│   ├── 📄 TermsPanel.tsx          # Expandable terms display
│   ├── 📄 RulesList.tsx           # Business rules with pass/fail
│   ├── 📄 AttributesTable.tsx     # Key attributes comparison
│   ├── 📄 PaymentMethodSelector.tsx # Payment method choice
│   └── 📄 Toasts.tsx              # Toast notifications system
│
├── 🗂️ lib/                         # Utility libraries
│   ├── 📄 types.ts                # TypeScript type definitions
│   ├── 📄 calc.ts                 # Payment calculations
│   ├── 📄 validators.ts           # Input validation helpers
│   └── 📄 eligibility.ts          # Business rules engine
│
├── 🗂️ cypress/                     # E2E testing
│   └── 🗂️ e2e/
│       └── 📄 bnpl.cy.ts          # BNPL flow comprehensive tests
│
├── 🗂️ docs/                       # Project documentation
│   ├── 📄 PROJECT_REQUIREMENTS.md # Original requirements
│   ├── 📄 PROJECT_STRUCTURE.md   # This file
│   ├── 📄 IMPLEMENTATION_LOG.md   # Development process log
│   ├── 📄 API_DOCUMENTATION.md   # API endpoints documentation
│   ├── 📄 COMPONENT_LIBRARY.md   # Component usage guide
│   └── 🗂️ diagrams/              # Flow diagrams (future)
│
└── 🗂️ public/                     # Static assets
    └── 🗂️ logos/                  # Brand logos (placeholders)
```

## 🏗️ Architecture Overview

### Frontend Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                        Next.js 14 App Router               │
├─────────────────────────────────────────────────────────────┤
│  Layout (Navigation + Toasts)                              │
│  ├── Home Page (Model Overview)                            │
│  └── Model Pages                                           │
│      ├── BNPL (Spain + Provider Redirect)                 │
│      ├── PSP (Embedded + MIT)                             │
│      ├── Merchant (Deposit + Recurring)                   │
│      ├── Acquirer (Light Redirect)                        │
│      ├── Issuer Pre (BIN Detection + Modal)               │
│      ├── Issuer Post (Information Banner)                 │
│      ├── Deferred (Pay Later)                             │
│      ├── Deposit+Balance (Travel Aligned)                 │
│      └── Hybrid (Smart Routing)                           │
├─────────────────────────────────────────────────────────────┤
│                    Reusable Components                     │
│  ├── Forms (Identity, Card, Payment Method)               │
│  ├── Flow (Progress Steps, Provider Redirect)             │
│  ├── Display (Summary, Rules, Attributes)                 │
│  └── Interaction (Plan Picker, Terms Panel)               │
├─────────────────────────────────────────────────────────────┤
│                      Utility Layer                        │
│  ├── Business Logic (Eligibility, Calculations)           │
│  ├── Validation (Form Rules, Input Helpers)               │
│  └── Types (TypeScript Interfaces)                        │
└─────────────────────────────────────────────────────────────┘
```

### Backend API Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                     Next.js API Routes                     │
├─────────────────────────────────────────────────────────────┤
│  Business Logic APIs                                       │
│  ├── /api/eligibility (Rule Engine)                       │
│  ├── /api/plan-quote (Calculations)                       │
│  └── /api/terms (Content Management)                      │
├─────────────────────────────────────────────────────────────┤
│  Payment Simulation APIs                                   │
│  ├── /api/authorise (Payment Processing)                  │
│  ├── /api/complete-3ds (SCA Simulation)                   │
│  ├── /api/provider/start (Redirect Init)                  │
│  └── /api/provider/complete (Callback)                    │
├─────────────────────────────────────────────────────────────┤
│                   Shared Utilities                        │
│  ├── Eligibility Engine                                   │
│  ├── Payment Calculations                                 │
│  ├── Validation Rules                                     │
│  └── Mock Data Generation                                 │
└─────────────────────────────────────────────────────────────┘
```

## 📦 Component Dependencies

### Core Dependencies
```json
{
  "next": "14.2.5",           // React framework
  "react": "18.3.1",          // UI library
  "typescript": "5.5.4",      // Type safety
  "tailwindcss": "3.4.10",    // Styling
  "zod": "3.23.8",            // Validation
  "framer-motion": "11.2.6",  // Animations (future)
  "xstate": "5.13.0"          // State management (future)
}
```

### Development Dependencies
```json
{
  "cypress": "13.12.0",           // E2E testing
  "@testing-library/react": "14.3.1", // Unit testing
  "eslint": "^8.57.0",            // Code linting
  "prettier": "latest",           // Code formatting
  "autoprefixer": "10.4.19",      // CSS processing
  "postcss": "8.4.38"            // CSS processing
}
```

## 🔄 Data Flow

### Payment Flow State Machine
```
START
  ↓
ELIGIBILITY_CHECK
  ↓
PAYMENT_METHOD_SELECTION
  ↓
PLAN_SELECTION (if instalments)
  ↓
IDENTITY_VERIFICATION (model-specific)
  ↓
PAYMENT_DETAILS
  ↓
AUTHORIZATION
  ↓
3DS_AUTHENTICATION (if required)
  ↓
PROVIDER_PROCESSING (if redirect)
  ↓
CONFIRMATION
```

### API Request Flow
```
Frontend Component
  ↓
API Route Handler
  ↓
Business Logic Layer
  ↓
Validation & Processing
  ↓
Mock Response Generation
  ↓
Response to Frontend
  ↓
UI State Update
```

## 🧪 Testing Structure

### E2E Testing (Cypress)
- **Complete user journeys** for each payment model
- **Form validation** testing across all inputs
- **Error handling** scenarios for failed payments
- **Responsive design** testing across viewports
- **Accessibility** testing with screen readers

### Unit Testing (Future)
- **Component rendering** tests
- **Business logic** validation
- **API endpoint** testing
- **Utility function** coverage
- **Form validation** rules

## 🚀 Build & Deployment

### Development
```bash
npm run dev     # Start development server (port 3332)
npm run lint    # Run ESLint
npm run cy:open # Open Cypress testing
```

### Production
```bash
npm run build   # Create production build
npm start       # Start production server (port 3332)
npm run cy:run  # Run headless E2E tests
```

## 🔧 Configuration Files

### Next.js (next.config.mjs)
- Server Actions enabled by default
- TypeScript strict mode
- Image optimization
- API route handling

### Tailwind (tailwind.config.ts)
- BA brand colors (red, orange, yellow)
- Custom utilities for cards, buttons, badges
- Responsive design breakpoints
- Component-specific classes

### TypeScript (tsconfig.json)
- Strict type checking enabled
- Path mapping for imports (@/*)
- Next.js plugin integration
- Modern ES modules

### Cypress (cypress.config.ts)
- Base URL: http://localhost:3332
- Viewport: 1280x720
- No video recording (faster tests)
- E2E testing configuration

## 📊 Performance Considerations

### Bundle Optimization
- **Code splitting** by route (Next.js automatic)
- **Component lazy loading** for model pages
- **Tree shaking** for unused code
- **Image optimization** with Next.js Image

### Runtime Performance
- **Server-side rendering** for initial load
- **Client-side navigation** for subsequent pages
- **API route caching** for static content
- **Component memoization** where beneficial

## 🔒 Security Implementation

### Frontend Security
- **Input sanitization** with Zod validation
- **XSS prevention** with React's built-in protection
- **CSRF protection** with Next.js API routes
- **Content Security Policy** ready for implementation

### API Security
- **Rate limiting** ready for implementation
- **Input validation** on all endpoints
- **Error handling** without information leakage
- **Mock data** only - no real payment processing

This structure provides a solid foundation for understanding and extending the BA Installments Playground application.