# Test Airlines Instalments Playground - Original Requirements

## Project Brief
Build a Test Airlines Instalments Playground (All Instalment Models) + Next.js Scaffold

You are a senior full‑stack engineer and product designer. Build a working, animated **web application** that demonstrates **all common airline/merchant instalment models** with a **Test Airlines style checkout**. Each model must have its own interactive page that takes the customer from **instalment selection** all the way to a **final payment confirmation** (simulated). Keep the UI simple and elegant with a **ChatGPT‑like** feel, but use Test Airlines/airline design cues.

## Scope Requirements

Create a multi‑page demo app called **Test Airlines Instalments Playground**. Include these instalment model pages:

### 1. BNPL / Partner‑Financed at Checkout (Iberia‑style)
- Provider redirect flow (Klarna-style)
- Spanish market focus
- DNI/NIE identity verification
- Credit assessment simulation

### 2. PSP‑Driven Instalments
- Split billing managed by PSP scheduler
- Embedded modal flow
- Network tokenization for MIT
- 3D Secure simulation

### 3. Merchant‑Financed Instalments
- Deposit and recurring charges owned by merchant
- Travel-date aligned scheduling
- MIT consent flows
- Test Airlines manages full customer relationship

### 4. Acquirer‑Driven Instalments
- Acquirer product manages splits
- Light redirect to acquirer widget
- Upfront settlement to merchant
- Acquirer handles risk and disputes

### 5. Issuer / Network Instalments
#### Pre‑purchase issuer/network instalments
- BIN detection triggers bank modal
- Real-time bank decisioning
- Bank manages SCA compliance

#### Post‑purchase conversion by issuer
- Informational banner post-checkout
- Customer initiates via bank portal
- No impact on merchant flow

### 6. Deferred Payment
- Pay later by N days (14/30/60)
- Zero charge today
- Payment authorization upfront
- Reminder system simulation

### 7. Deposit + Balance
- Deposit now (20%/30%/50%)
- Balance before travel
- Travel-date aware scheduling
- Prorated refund handling

### 8. Hybrid Orchestrator
- Rule‑based choice across the above
- Smart routing based on:
  - Market (ES/UK/EU)
  - Customer profile
  - Amount thresholds
  - Journey type
  - Card BIN eligibility

### Optional Features
- **Loyalty + Money** integration
- **Voucher + Instalments** combination

## Technical Requirements

### Tech Stack
- **Frontend:** Next.js 14 App Router, React 18, TypeScript
- **Styling:** Tailwind CSS with Test Airlines brand colors
- **Components:** shadcn/ui for inputs and modals
- **Animation:** Framer Motion for transitions and micro‑interactions
- **State:** XState per model, or a reducer fallback
- **Validation:** Zod for form validation
- **Tests:** Cypress e2e; Testing Library + Vitest for units
- **Backend:** Next API routes with in‑memory stubs. No real payments
- **Accessibility:** WCAG AA compliant

### Information Architecture
- **Nav:** Home, then a list of all models
- **Each model page:**
  - Flight summary header (origin, destination, dates, fare, traveller)
  - Payment method selector with **Pay in instalments** highlighted
  - The model‑specific **Instalments flow** (interactive)
  - **Terms and Conditions** panel (expand/collapse)
  - **Business rules and eligibility** section
  - **Key attributes** table
  - Footer note: *Simulation only. No real payment is taken*

## Data Model Requirements

### Core Interfaces
```typescript
interface Basket { 
  currency: string; 
  total: number; 
  isReturn: boolean; 
  market: 'ES'|'UK'|'EU'; 
}

interface FlightSummary { 
  from: string; 
  to: string; 
  depart: string; 
  return?: string; 
  pax: number; 
  cabin: 'Economy'|'Premium'|'Business'; 
}

interface Customer { 
  name: string; 
  email: string; 
  phone?: string; 
  residency?: 'ES'|'UK'|'Other'; 
  idType?: 'DNI'|'NIE'|'None'; 
  idValue?: string; 
}

interface PlanQuote { 
  months: number; 
  apr?: number; 
  feePct?: number; 
  firstPayment: number; 
  monthly: number; 
  totalToPay: number; 
}

type PaymentState = 'START'|'ELIGIBILITY'|'PLAN_PICK'|'IDENTITY'|'PAYMENT_METHOD'|'AUTH'|'3DS'|'PROVIDER'|'RESULT';

type ModelKey = 'bnpl'|'psp'|'merchant'|'acquirer'|'issuer-pre'|'issuer-post'|'deferred'|'deposit-balance'|'hybrid';
```

## API Contract Requirements

### Required API Endpoints
- `POST /api/eligibility` → `{ model, basket, customer } => { eligible, reasons[], requiredFields[] }`
- `POST /api/plan-quote` → `{ model, basket, months, mode } => PlanQuote`
- `POST /api/authorise` → simulate CIT/MIT; may require 3D Secure
- `POST /api/3ds/complete` → resolves auth
- `POST /api/provider/start` → returns a fake provider URL and payload
- `POST /api/provider/complete` → success or decline
- `GET  /api/terms?model=…&market=…` → returns HTML/markdown for T&Cs

## Sample Data Requirements

### Demo Flight
- **Route:** Madrid (MAD) → Palma (PMI)
- **Type:** Return journey
- **Passenger:** 1 Adult, Economy class
- **Amount:** €180.00

### Demo Customer
- **Name:** Luis Garcia
- **Email:** luis.garcia.test@example.com
- **Phone:** +34 600 123 456
- **IDs:** DNI `12345678Z`, NIE `X1234567L`

### Test Cards
- **Visa:** 4111111111111111
- **Mastercard:** 5555555555554444
- **Markets:** ES, UK, EU

## Compliance Requirements

### Security & PCI-DSS
- **No PAN storage** - cards masked after entry
- **Demo mode only** - no real payment processing
- **SCA simulation** where required
- **MIT consent** clear language and schedule display

### Privacy & GDPR
- **Minimal data collection** for demo purposes
- **Clear consent flows** for payment storage
- **Provider privacy policies** linked where relevant
- **Simulate consent collection**

## Business Rules Requirements

Each model must implement specific eligibility rules:

### BNPL Rules
- Market: Spain only
- Return journey required
- Minimum basket €45
- Spanish residency (DNI/NIE)
- Spain-issued Visa/Mastercard preferred

### PSP Rules
- Valid payment card
- EU/UK markets eligible
- Basic fraud checks
- 3D Secure authentication

### Merchant Rules
- Email address required
- Minimum basket €45
- MIT consent mandatory
- Travel date validation

### Acquirer Rules
- Market: EU/UK eligible
- Minimum €100 for Spain
- Acquirer service availability
- Card scheme support

### Issuer Rules
- Eligible card BIN detection
- Bank instalment support
- Transaction amount suitable
- Market regulatory approval

### Deferred Rules
- Maximum €1000
- Valid payment method
- Email for reminders
- Payment authorization

### Deposit+Balance Rules
- Return journey required
- Travel date allows plan
- Valid payment card
- Email notifications

### Hybrid Rules
- Market analysis
- Amount thresholds
- Journey type validation
- Card eligibility checks
- Rule priority ordering

## User Experience Requirements

### Design System
- **Test Airlines Red (#D7192D)** - Primary actions
- **Test Airlines Orange (#EF8314)** - Secondary actions  
- **Test Airlines Yellow (#FACD08)** - Warnings/accents
- **Clean typography** with proper hierarchy
- **Rounded corners** and **soft shadows**
- **Generous whitespace**

### Accessibility
- **WCAG AA compliance**
- **Keyboard navigation**
- **Screen reader support**
- **High contrast ratios**
- **Clear error messages**
- **Focus indicators**

### Responsive Design
- **Mobile-first** approach
- **Tablet optimization**
- **Desktop enhancement**
- **Touch-friendly** interactions
- **Fast loading** on all devices

## Testing Requirements

### E2E Testing (Cypress)
- **Complete user journeys** for each model
- **Form validation** testing
- **Error scenarios** handling
- **Payment flows** simulation
- **Cross-browser** compatibility

### Unit Testing
- **Component testing** with Testing Library
- **Business logic** validation
- **API endpoint** testing
- **Utility functions** coverage
- **Form validation** rules

## Documentation Requirements

### Technical Documentation
- **Setup and installation** guide
- **Architecture overview**
- **API documentation**
- **Component library** documentation
- **Testing strategy**

### Business Documentation
- **Model comparison** tables
- **Business rules** explanations
- **Compliance considerations**
- **Market requirements**
- **Integration patterns**

## Success Criteria

### Functional Requirements
✅ All 9 instalment models implemented with complete flows
✅ Interactive payment journeys from selection to confirmation
✅ Business rules engine with eligibility checking
✅ API simulation with realistic responses
✅ Responsive design across devices
✅ Accessibility compliance (WCAG AA)

### Technical Requirements
✅ Next.js 14 with TypeScript
✅ Tailwind CSS with Test Airlines branding
✅ Component-based architecture
✅ API routes for backend simulation
✅ E2E testing with Cypress
✅ Production-ready build

### User Experience Requirements
✅ Clean, intuitive interface design
✅ Smooth animations and transitions
✅ Clear progress indicators
✅ Helpful error messages
✅ Comprehensive documentation
✅ Demo data for testing

This project successfully demonstrates all common airline instalment payment models in a production-quality web application that can serve as both a learning tool and a reference implementation for payment integration patterns.