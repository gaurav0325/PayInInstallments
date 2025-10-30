# BA Installments Playground - Component Library

## 🧩 Component Overview

The BA Installments Playground uses a modular component architecture with reusable components that maintain consistency across all 9 payment models. Each component is built with TypeScript, Tailwind CSS, and follows BA design patterns.

---

## 🗂️ Component Categories

### Navigation & Layout
- [ProgressSteps](#progresssteps) - Multi-step flow indicator
- [SummaryCard](#summarycard) - Flight booking summary sidebar

### Form Components  
- [PlanPicker](#planpicker) - Instalment plan selection
- [IdentityForm](#identityform) - Spanish identity verification
- [CardForm](#cardform) - Payment card entry
- [PaymentMethodSelector](#paymentmethodselector) - Payment method choice

### Display Components
- [RulesList](#ruleslist) - Business rules with pass/fail status
- [AttributesTable](#attributestable) - Model key attributes comparison
- [TermsPanel](#termspanel) - Expandable terms and conditions

### Interaction Components
- [ProviderRedirect](#providerredirect) - Provider redirect simulation
- [Toasts](#toasts) - Global notification system

---

## 📋 Component Reference

### ProgressSteps

Multi-step flow indicator showing current progress through payment journey.

#### Props
```typescript
interface ProgressStepsProps {
  step: 1 | 2 | 3 | 4;
}
```

#### Usage
```tsx
import { ProgressSteps } from '@/components/ProgressSteps'

<ProgressSteps step={2} />
```

#### Features
- **4 predefined steps:** Select plan, Details/verification, Payment/3DS, Confirmation
- **Visual indicators:** Numbered circles with progress highlighting
- **Current step emphasis:** Active step highlighted in BA red
- **Responsive design:** Adapts to mobile screens

#### Styling
- Active steps: `bg-red-600` (BA red)
- Inactive steps: `bg-gray-300`
- Text emphasis: Current and completed steps darker

---

### PlanPicker

Interactive component for selecting instalment plans with real-time calculations.

#### Props
```typescript
interface PlanPickerProps {
  amount: number;
  onSelect: (selection: {
    months: number;
    mode: 'promo0' | 'fee2' | 'apr149';
  }) => void;
}
```

#### Usage
```tsx
import { PlanPicker } from '@/components/PlanPicker'

<PlanPicker 
  amount={180} 
  onSelect={(plan) => console.log('Selected:', plan)} 
/>
```

#### Features
- **Month selection:** 3, 6, 9, 12 month options
- **Pricing modes:** Promotional 0%, Fixed fee 2%, APR 14.9%
- **Real-time calculations:** Monthly payment, first payment, total cost
- **Interactive UI:** Radio buttons and highlighted selections
- **Calculation display:** Three-card layout showing payment breakdown

#### Internal State
```tsx
const [months, setMonths] = useState(3)
const [mode, setMode] = useState<'promo0'|'fee2'|'apr149'>('promo0')
```

#### Dependencies
- `calcTotals` from `@/lib/calc`

---

### IdentityForm

Spanish identity verification form with DNI/NIE validation.

#### Props
```typescript
interface IdentityFormProps {
  onContinue: (data: {
    idType: 'DNI' | 'NIE';
    idValue: string;
    mobile: string;
  }) => void;
}
```

#### Usage
```tsx
import { IdentityForm } from '@/components/IdentityForm'

<IdentityForm onContinue={(data) => console.log('Identity:', data)} />
```

#### Features
- **ID type selection:** DNI or NIE dropdown
- **Real-time validation:** Spanish ID format checking
- **Mobile validation:** Spanish mobile number format
- **Form state management:** Continue button enabled only when valid
- **Dynamic placeholders:** Changes based on selected ID type

#### Validation Rules
- **DNI:** 8 digits + letter (e.g., `12345678Z`)
- **NIE:** X/Y/Z + 7 digits + letter (e.g., `X1234567L`)  
- **Mobile:** Spanish format starting with 6 or 7 (e.g., `+34600123456`)

#### Dependencies
- `isDNI`, `isNIE`, `isEsMobile` from `@/lib/validators`

---

### CardForm

Payment card entry form with validation and formatting.

#### Props
```typescript
interface CardFormProps {
  onPay: (pan: string) => void;
}
```

#### Usage
```tsx
import { CardForm } from '@/components/CardForm'

<CardForm onPay={(pan) => console.log('Payment with:', pan)} />
```

#### Features
- **PAN input:** 16-digit card number with auto-formatting
- **Expiry formatting:** MM/YY format with auto-slash insertion
- **CVV validation:** 3-digit security code
- **Form completion checking:** Pay button enabled when all fields valid
- **Input restrictions:** Numeric only for PAN and CVV

#### Validation
- **PAN:** Exactly 16 digits
- **Expiry:** MM/YY format (5 characters total)
- **CVV:** Exactly 3 digits

#### Internal Logic
```tsx
const formatExpiry = (value: string) => {
  const nums = value.replace(/\D/g, '')
  if (nums.length >= 2) {
    return nums.slice(0,2) + '/' + nums.slice(2,4)
  }
  return nums
}
```

---

### PaymentMethodSelector

Radio button selector for payment methods.

#### Props
```typescript
interface PaymentMethod {
  id: string;
  name: string;
  description?: string;
}

interface PaymentMethodSelectorProps {
  methods: PaymentMethod[];
  onSelect: (methodId: string) => void;
}
```

#### Usage
```tsx
import { PaymentMethodSelector } from '@/components/PaymentMethodSelector'

const methods = [
  { id: 'card', name: 'Pay with card', description: 'Immediate payment' },
  { id: 'instalments', name: 'Pay in instalments' }
]

<PaymentMethodSelector methods={methods} onSelect={handleSelect} />
```

#### Features
- **Card-based layout:** Each method in bordered card
- **Selection state:** Visual feedback for selected option
- **Hover effects:** Interactive hover states

---

### SummaryCard

Flight booking summary displayed in sidebar.

#### Props
```typescript
interface SummaryCardProps {
  amount?: number; // Default: 180
}
```

#### Usage
```tsx
import { SummaryCard } from '@/components/SummaryCard'

<SummaryCard amount={180} />
```

#### Features
- **Flight details:** Madrid → Palma return journey
- **Travel dates:** Outbound and return dates
- **Passenger info:** 1 Adult, Economy class
- **Amount display:** Total ticket price
- **Simulation notice:** Clear demo disclaimer

#### Static Content
- Route: MAD → PMI (Madrid to Palma)
- Dates: 15 Sept - 22 Sept 2024
- Cabin: Economy class
- Warning: "This is a simulation. No real payment is taken."

---

### RulesList

Business rules display with pass/fail indicators.

#### Props
```typescript
interface Rule {
  label: string;
  passed: boolean;
  required: boolean;
}

interface RulesListProps {
  rules: Rule[];
}
```

#### Usage
```tsx
import { RulesList } from '@/components/RulesList'

const rules = [
  { label: 'Market: Spain', passed: true, required: true },
  { label: 'Return journey', passed: false, required: true }
]

<RulesList rules={rules} />
```

#### Features
- **Status indicators:** Green checkmark (✓), red cross (✗), question mark (?)
- **Color coding:** Green for passed, red for failed required, gray for optional
- **Required highlighting:** "Required" badge for failed mandatory rules
- **List layout:** Clean vertical list with consistent spacing

#### Status Logic
- **Passed:** Green background, checkmark icon
- **Failed + Required:** Red background, cross icon, "Required" badge
- **Failed + Optional:** Gray background, question icon
- **Required + Failed:** Red text emphasis

---

### AttributesTable

Key attributes comparison table for payment models.

#### Props
```typescript
interface Attribute {
  label: string;
  value: string | React.ReactNode;
}

interface AttributesTableProps {
  attributes: Attribute[];
}
```

#### Usage
```tsx
import { AttributesTable } from '@/components/AttributesTable'

const attributes = [
  { label: 'Who funds', value: 'BNPL provider' },
  { label: 'Credit risk', value: 'Provider bears risk' }
]

<AttributesTable attributes={attributes} />
```

#### Features
- **Two-column layout:** Label and value columns
- **Responsive table:** Horizontal scroll on mobile
- **Row styling:** Alternating row colors for readability
- **Flexible values:** Support for text or React components

---

### TermsPanel

Expandable panel for terms and conditions with dynamic loading.

#### Props
```typescript
interface TermsPanelProps {
  model: string;
  market?: string; // Default: 'ES'
}
```

#### Usage
```tsx
import { TermsPanel } from '@/components/TermsPanel'

<TermsPanel model="bnpl" market="ES" />
```

#### Features
- **Expand/collapse:** Click to toggle content visibility
- **Dynamic loading:** Fetches terms from API when expanded
- **Loading states:** Shows loading indicator while fetching
- **HTML rendering:** Supports HTML content in terms
- **Caching:** Only loads once per model/market combination

#### API Integration
```tsx
useEffect(() => {
  if (expanded && !terms) {
    fetch(`/api/terms?model=${model}&market=${market}`)
      .then(res => res.text())
      .then(html => setTerms(html))
  }
}, [expanded, model, market, terms])
```

---

### ProviderRedirect

Provider redirect simulation with progress animation.

#### Props
```typescript
interface ProviderRedirectProps {
  onComplete: (result: 'approved' | 'declined') => void;
  providerName?: string; // Default: 'Payment Provider'
}
```

#### Usage
```tsx
import { ProviderRedirect } from '@/components/ProviderRedirect'

<ProviderRedirect 
  providerName="Klarna"
  onComplete={(result) => console.log('Provider result:', result)} 
/>
```

#### Features
- **Full-screen overlay:** Modal-style presentation
- **Progress animation:** Animated progress bar (0-100%)
- **Realistic timing:** 1.5 second simulation duration
- **Provider branding:** Customizable provider name
- **Auto-completion:** Automatically calls onComplete when done

#### Animation Logic
```tsx
const timer = setInterval(() => {
  setProgress(prev => {
    if (prev >= 100) {
      setLoading(false)
      setTimeout(() => onComplete('approved'), 500)
      return 100
    }
    return prev + 10
  })
}, 150)
```

---

### Toasts

Global notification system with queue management.

#### API
```typescript
// Show toast function
showToast(type: 'success' | 'error' | 'info', message: string)

// Toast container component  
<ToastContainer />
```

#### Usage
```tsx
import { ToastContainer, showToast } from '@/components/Toasts'

// In layout or app root
<ToastContainer />

// Anywhere in app
showToast('success', 'Payment completed successfully!')
showToast('error', 'Payment failed. Please try again.')
```

#### Features
- **Global state:** Works across all components without prop drilling
- **Auto-dismiss:** 4-second automatic dismissal
- **Queue management:** Multiple toasts shown simultaneously
- **Type styling:** Different colors for success/error/info
- **Fixed positioning:** Top-right corner positioning

#### Toast Styling
- **Success:** Green background (`bg-green-50`, `border-green-200`)
- **Error:** Red background (`bg-red-50`, `border-red-200`)  
- **Info:** Blue background (`bg-blue-50`, `border-blue-200`)

---

## 🎨 Design System

### Color Palette
```css
/* BA Brand Colors */
--ba-red: #D7192D;      /* Primary actions */
--ba-orange: #EF8314;   /* Secondary actions */
--ba-yellow: #FACD08;   /* Warnings/accents */

/* Component Colors */
.btn-primary { @apply bg-red-600 hover:bg-red-700 text-white; }
.card { @apply bg-white border border-gray-200 rounded-2xl shadow-card; }
.badge { @apply inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs; }
```

### Typography Scale
- **xs:** 0.75rem (12px)
- **sm:** 0.875rem (14px)  
- **base:** 1rem (16px)
- **lg:** 1.125rem (18px)
- **xl:** 1.25rem (20px)
- **2xl:** 1.5rem (24px)

### Spacing System
- **Consistent spacing:** Using Tailwind's spacing scale (4px increments)
- **Component spacing:** `space-y-4` for vertical, `gap-4` for grid/flex
- **Card padding:** `p-4` or `p-5` for content cards
- **Form spacing:** `space-y-3` for form fields

### Border Radius
- **Standard:** `rounded-xl` (1rem)
- **Cards:** `rounded-2xl` (1.25rem)
- **Buttons:** `rounded-2xl` (1.25rem)
- **Inputs:** `rounded-xl` (1rem)

---

## 🔧 Common Patterns

### State Management Pattern
```tsx
const [step, setStep] = useState<1|2|3|4>(1)
const [loading, setLoading] = useState(false)
const [result, setResult] = useState<'approved'|'declined'|null>(null)
```

### Validation Pattern
```tsx
const [isValid, setIsValid] = useState(false)

useEffect(() => {
  setIsValid(/* validation logic */)
}, [formFields])

<button disabled={!isValid} className={isValid ? 'btn-primary' : 'btn-disabled'}>
  Continue
</button>
```

### API Integration Pattern
```tsx
const handleSubmit = async (data) => {
  setLoading(true)
  try {
    const response = await fetch('/api/endpoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    const result = await response.json()
    // Handle result
  } catch (error) {
    console.error('API Error:', error)
    showToast('error', 'Something went wrong')
  } finally {
    setLoading(false)
  }
}
```

### Conditional Rendering Pattern
```tsx
{step === 1 && <PlanPicker onSelect={handlePlanSelect} />}
{step === 2 && <IdentityForm onContinue={handleIdentity} />}
{step === 3 && <CardForm onPay={handlePayment} />}
{step === 4 && <ConfirmationScreen />}
```

---

## 🧪 Testing Components

### Cypress Testing
```typescript
// Test component interaction
cy.contains('Choose your instalment plan')
cy.get('[data-testid="plan-picker"]').should('be.visible')
cy.contains('3 months').click()
cy.contains('Continue').click()

// Test form validation
cy.get('input[placeholder="12345678Z"]').type('invalid')
cy.get('button[type="submit"]').should('be.disabled')
cy.get('input[placeholder="12345678Z"]').clear().type('12345678Z')
cy.get('button[type="submit"]').should('not.be.disabled')
```

### Component Testing Pattern
```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import { PlanPicker } from '@/components/PlanPicker'

test('PlanPicker calls onSelect when plan chosen', () => {
  const handleSelect = jest.fn()
  render(<PlanPicker amount={180} onSelect={handleSelect} />)
  
  fireEvent.click(screen.getByText('6 months'))
  fireEvent.click(screen.getByText('Continue'))
  
  expect(handleSelect).toHaveBeenCalledWith({
    months: 6,
    mode: 'promo0'
  })
})
```

---

## 📚 Best Practices

### Component Design
1. **Single responsibility:** Each component has one clear purpose
2. **Prop validation:** TypeScript interfaces for all props
3. **Default values:** Sensible defaults where appropriate
4. **Error boundaries:** Graceful handling of component errors

### Styling Guidelines
1. **Tailwind first:** Use Tailwind classes over custom CSS
2. **Consistent spacing:** Follow the 4px spacing scale
3. **Responsive design:** Mobile-first with responsive utilities
4. **Accessibility:** WCAG AA compliance with proper labels and focus

### State Management
1. **Local state first:** Use useState for component-specific state
2. **Prop drilling limits:** Pass callbacks for actions, not state
3. **Validation state:** Keep form validation state local to forms
4. **Loading states:** Show loading indicators for async operations

### Performance
1. **Avoid premature optimization:** Profile before optimizing
2. **Component memoization:** Use React.memo for expensive components
3. **Callback memoization:** Use useCallback for expensive handlers
4. **Bundle size:** Import only what you need

This component library documentation provides a complete reference for understanding, using, and extending the BA Installments Playground components.