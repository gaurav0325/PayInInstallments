# Test Airlines Instalments Playground

A comprehensive demonstration of airline instalment payment models with Test Airlines style checkout flows. This interactive web application showcases all common payment models used in the airline industry, from BNPL to hybrid orchestrators.

## 🚀 Features

### Instalment Models Demonstrated
1. **BNPL (Partner Financed)** - Spain market with provider redirect
2. **PSP-Driven Instalments** - Embedded flow with payment processor
3. **Merchant-Financed Instalments** - Test Airlines owns deposit and recurring charges
4. **Acquirer-Driven Instalments** - Light redirect to acquirer widget
5. **Issuer Instalments (Pre-purchase)** - Bank modal triggered by BIN detection
6. **Issuer Instalments (Post-purchase)** - Post-checkout conversion banner
7. **Deferred Payment** - Pay later with zero charge today
8. **Deposit + Balance** - Deposit now, balance before travel
9. **Hybrid Orchestrator** - Rule-based routing across models

### Technical Features
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations (ready for implementation)
- **Responsive design** with mobile-first approach
- **Accessibility** WCAG AA compliant
- **Testing** with Cypress E2E tests

## 🛠️ Installation

1. **Clone and navigate to the project:**
   ```bash
   cd ba-instalments-playground
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3332](http://localhost:3332)

## 📁 Project Structure

```
ba-instalments-playground/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles with Tailwind
│   ├── layout.tsx               # Root layout with navigation
│   ├── page.tsx                 # Home page with model overview
│   ├── models/                  # Individual model pages
│   │   ├── bnpl/page.tsx       # BNPL flow
│   │   ├── psp/page.tsx        # PSP instalments
│   │   ├── merchant/page.tsx    # Merchant instalments
│   │   ├── acquirer/page.tsx    # Acquirer instalments
│   │   ├── issuer-pre/page.tsx  # Pre-purchase issuer
│   │   ├── issuer-post/page.tsx # Post-purchase issuer
│   │   ├── deferred/page.tsx    # Deferred payment
│   │   ├── deposit-balance/page.tsx # Deposit + balance
│   │   └── hybrid/page.tsx      # Hybrid orchestrator
│   └── api/                     # Backend API routes
│       ├── eligibility/         # Eligibility checking
│       ├── plan-quote/          # Plan quotation
│       ├── authorise/           # Payment authorisation
│       ├── complete-3ds/        # 3D Secure completion
│       ├── provider/            # Provider redirect handling
│       └── terms/               # Terms and conditions
├── components/                   # Reusable UI components
│   ├── ProgressSteps.tsx        # Multi-step flow indicator
│   ├── PlanPicker.tsx          # Instalment plan selector
│   ├── IdentityForm.tsx        # Spanish ID verification
│   ├── CardForm.tsx            # Payment card entry
│   ├── SummaryCard.tsx         # Flight booking summary
│   ├── ProviderRedirect.tsx    # Provider redirect simulation
│   ├── TermsPanel.tsx          # Expandable terms display
│   ├── RulesList.tsx           # Business rules checker
│   ├── AttributesTable.tsx     # Key attributes display
│   ├── PaymentMethodSelector.tsx # Payment method choice
│   └── Toasts.tsx              # Toast notifications
├── lib/                         # Utility libraries
│   ├── types.ts                # TypeScript type definitions
│   ├── calc.ts                 # Payment calculations
│   ├── validators.ts           # Input validation helpers
│   └── eligibility.ts          # Business rules engine
├── cypress/                     # E2E tests
│   └── e2e/
│       └── bnpl.cy.ts          # BNPL flow tests
└── public/                      # Static assets
    └── logos/                   # Brand logos (placeholders)
```

## 🎮 Usage

### Running the Application

**Development mode:**
```bash
npm run dev
```

**Production build:**
```bash
npm run build
npm start
```

### Testing

**Run Cypress E2E tests:**
```bash
npm run cy:open  # Interactive mode
npm run cy:run   # Headless mode
```

**Linting:**
```bash
npm run lint
```

### Demo Data

The application uses predefined demo data for consistent testing:

- **Flight:** Madrid (MAD) → Palma (PMI), Return, 1 Adult, Economy, €180
- **Customer:** Luis Garcia, Spanish resident
- **Cards:** Spanish bank cards (BBVA, Santander, CaixaBank for issuer flows)
- **Markets:** ES (Spain), UK, EU

## 🏗️ Architecture

### Component Architecture
- **Reusable components** for common UI patterns
- **Model-specific pages** with shared components
- **Progressive enhancement** for JavaScript-disabled users
- **Responsive design** with Tailwind CSS utilities

### API Design
- **RESTful endpoints** for payment operations
- **Stateless design** with session simulation
- **Error handling** with meaningful responses
- **Type safety** with TypeScript interfaces

### Business Logic
- **Rule-based eligibility** checking per model
- **Payment calculations** with multiple pricing modes
- **Validation helpers** for forms and inputs
- **State management** with React hooks

## 🔧 Configuration

### Environment Variables
Copy `.env.example` to `.env.local` and configure:

```bash
# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3332

# Demo settings
DEMO_MODE=true
SIMULATE_DELAYS=true
```

### Tailwind Configuration
The `tailwind.config.ts` includes:
- **BA brand colours** (red, orange, yellow)
- **Custom border radius** for modern design
- **Card shadow** utilities
- **Component-specific** utility classes

## 📊 Model Comparison

| Model | Integration | Risk | Funding | SCA Pattern |
|-------|-------------|------|---------|-------------|
| BNPL | Redirect | Provider | Provider | Provider manages |
| PSP | Embedded | Merchant | Merchant via PSP | CIT + MIT |
| Merchant | Embedded | Merchant | Merchant | CIT + MIT |
| Acquirer | Light redirect | Shared | Acquirer | Acquirer manages |
| Issuer (Pre) | Bank modal | Issuer | Issuer | Bank manages |
| Issuer (Post) | Informational | N/A | Customer | Post-purchase |
| Deferred | Embedded | Merchant | Merchant | CIT deferred |
| Deposit + Balance | Embedded | Reduced | Merchant | CIT + MIT |
| Hybrid | Dynamic | Variable | Variable | Per model |

## 🚦 Business Rules

Each model implements specific eligibility rules:

- **Market restrictions** (e.g., BNPL Spain-only)
- **Amount thresholds** (e.g., €45 minimum)
- **Journey requirements** (e.g., return journey for deposit+balance)
- **Card eligibility** (e.g., BIN ranges for issuer instalments)
- **Identity verification** (e.g., Spanish DNI/NIE for BNPL)

## 🔒 Security & Compliance

### PCI-DSS Compliance
- **No PAN storage** - cards masked after entry
- **Demo mode only** - no real payment processing
- **Secure forms** with client-side validation
- **HTTPS enforcement** in production

### Data Privacy
- **Minimal data collection** for demo purposes
- **Clear consent flows** for payment storage
- **GDPR considerations** in form design
- **Provider privacy policies** linked where applicable

### Strong Customer Authentication (SCA)
- **3D Secure simulation** for card payments
- **MIT consent** for recurring payments
- **Biometric authentication** ready (future enhancement)
- **Exemption handling** per model requirements

## 🎨 Design System

### Colors
- **BA Red (#D7192D)** - Primary actions, brand elements
- **BA Orange (#EF8314)** - Secondary actions, highlights  
- **BA Yellow (#FACD08)** - Warnings, accent elements
- **Gray scale** - Text hierarchy, backgrounds

### Typography
- **Font weights** - Regular (400), Medium (500), Semibold (600), Bold (700)
- **Size scale** - xs, sm, base, lg, xl, 2xl, 3xl
- **Line heights** - Optimized for readability

### Components
- **Cards** - Consistent elevation and radius
- **Buttons** - Primary, secondary, disabled states
- **Forms** - Validation states, accessibility labels
- **Badges** - Status indicators, model tags

## 🌍 Internationalization

Ready for multi-market expansion:
- **Market-specific rules** in eligibility engine
- **Localized content** in terms API
- **Currency formatting** utilities
- **Date formatting** per locale
- **Language detection** hooks (future)

## 📈 Performance

### Optimization Strategies
- **Component lazy loading** for model pages
- **API route caching** for static content
- **Image optimisation** with Next.js Image
- **Bundle analysis** with webpack-bundle-analyser
- **Core Web Vitals** optimisation

### Monitoring Points
- **Page load times** per model
- **Form completion rates** in flows
- **API response times** for calculations
- **Error rates** per payment method
- **Conversion funnels** per model

## 🚀 Deployment

### Vercel
```bash
npm run build
```

Deploy to Vercel with automatic CI/CD:
- **Preview deployments** for pull requests
- **Production deployment** from main branch
- **Environment variables** configured in dashboard
- **Analytics** and performance monitoring included

### Other Platforms
Compatible with any Node.js hosting:
- **Netlify** - Static export mode
- **Railway** - Full-stack deployment
- **AWS/Azure/GCP** - Container deployment
- **Self-hosted** - PM2 or Docker

## 🧪 Testing Strategy

### E2E Testing (Cypress)
- **Complete user journeys** for each model
- **Form validation** testing
- **Error handling** scenarios
- **Cross-browser** compatibility
- **Mobile responsive** testing

### Unit Testing (Future)
- **Component testing** with Testing Library
- **Business logic** validation
- **API endpoint** testing
- **Utility function** coverage

## 🤝 Contributing

This is a demonstration project. For extending or adapting:

1. **Fork the repository**
2. **Create feature branch** (`git checkout -b feature/new-model`)
3. **Follow existing patterns** in components and pages
4. **Add tests** for new functionality
5. **Update documentation** as needed
6. **Submit pull request** with clear description

## 📝 License

This project is for demonstration purposes. All airline industry payment model implementations are simplified for educational use.

## 🆘 Support

For questions about payment models or technical implementation:
- **Review the code** - Fully commented and structured
- **Check API responses** - All endpoints documented
- **Run tests** - Comprehensive E2E coverage
- **Inspect components** - Reusable and well-documented

---

**⚠️ Important:** This is a simulation only. No real payments are processed. All payment flows are for demonstration and learning purposes.