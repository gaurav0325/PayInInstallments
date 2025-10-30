# BA Instalments Playground - Complete Project Context

## Project Overview
**Project Name**: BA Instalments Playground
**Location**: `C:\Gaurav\Gaurav CV et al\AI project\PayInInstalments`
**Purpose**: Interactive visualization and demonstration platform for Test Airlines instalment payment models
**Technology Stack**: Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion

## 📁 Project Structure

```
PayInInstalments/
├── app/                          # Next.js 14 App Router structure
│   ├── api/                      # API routes for payment processing
│   │   ├── eligibility/
│   │   ├── plan-quote/
│   │   ├── complete-3ds/
│   │   └── provider/
│   ├── models/                   # Payment model demonstration pages
│   │   ├── acquirer/
│   │   ├── bnpl/
│   │   ├── deferred/
│   │   ├── deposit-instalments/
│   │   ├── embedded-bnpl/
│   │   ├── hold-my-fare/
│   │   ├── hybrid/
│   │   ├── issuer-post/
│   │   ├── issuer-pre/
│   │   ├── merchant-fullauth/    # ✅ Recently modified
│   │   ├── merchant-mit/
│   │   └── psp/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/                   # React components
│   ├── CategorizedAttributesDiagram.tsx  # ✅ Recently scaled 1.5x
│   ├── EditableRulesList.tsx
│   ├── EnhancedNotesSection.tsx
│   ├── ExportWidget.tsx
│   ├── SequenceDiagram.tsx
│   ├── ProgressSteps.tsx
│   ├── PlanPicker.tsx
│   ├── CardForm.tsx
│   ├── SummaryCard.tsx
│   ├── TermsPanel.tsx
│   ├── RulesList.tsx
│   ├── PaymentMethodSelector.tsx
│   └── ... (other components)
├── lib/                          # Utility functions and types
│   ├── types.ts
│   ├── calc.ts
│   └── validators.ts
├── cypress/                      # E2E testing
├── node_modules/
├── .next/                        # Next.js build output
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── cypress.config.ts
└── PROJECT_CONTEXT.md           # This file
```

## 🎯 Recent Development Work

### Latest Enhancements (Current Session)

#### Comparison Table Enhancement
**Files Modified**: 
- Created `app/comparison/page.tsx` - Dedicated comparison page
- Enhanced `components/EditableComparisonTable.tsx` - Added icon with link to full page
- Status: ✅ **Completed**

**Features Added**:
- 🎯 Small icon next to "Instalment Models Comparison" heading
- 📄 Dedicated comparison page at `/comparison`
- 📊 Full InstalmentsComparisonTable with scrollbars and color coding
- 📤 Export functionality for Word and PDF formats
- 🔙 Back navigation to homepage
- 📋 Comprehensive legend and evaluation criteria

#### BNPL-Styled Diagram Standardization
**Files Modified**: 13+ model pages across `app/models/`
- Status: ✅ **Completed**

**Features Applied**:
- 🎨 Consistent CategorizedAttributesDiagram across all installment models
- 📏 Enhanced dimensions (600px height, 1200px viewBox)
- 🔤 Larger fonts (16px titles, 15px content)
- 🎯 Color-coded attributes (Green=BA pros, Red=cons, Gray=neutral)
- 📐 Professional styling (15px corners, 2px strokes)
- 📊 Better spacing (120px vertical between branches)

### Previous Development Work

#### Key Model Attributes Diagram Enhancements
**Files Modified**: `components/CategorizedAttributesDiagram.tsx`, `app/models/merchant-fullauth/page.tsx`

#### Phase 1: Initial Improvements
- Reduced overall diagram size to fit within container
- Positioned diagram for full visibility
- Removed pros/cons/neutral icons and export button
- Repositioned Key Model Attributes section below Purchase Summary

#### Phase 2: Size Optimization
- Increased diagram size from 700x480px to maintain readability
- Optimized viewBox and responsive scaling
- Cleaned up container padding and margins

#### Phase 3: Maximum Scale
- **Scaled entire diagram by 1.5x for maximum readability**
- SVG dimensions: `900x600` → `1350x900` 
- Canvas height: `520px` → `780px`
- Root node: `180x50` → `270x75`
- Branch nodes: `220x50` → `330x75`
- Child nodes: `240x40` → `360x60`
- Font sizes: `14px` → `21px`, `12px` → `18px`
- All coordinates and spacing scaled proportionally
- Diagram now extends beyond container boundaries as requested

## 🚀 Running Development Servers

The application supports multiple concurrent development servers on different ports:

### Active Development Servers
- **Primary**: Port 3332 (default in package.json)
- **Network accessible**: Multiple servers running with `-H 0.0.0.0` flag
- **Recent activity**: Servers on ports 3334, 3335, 3336, 3337, 3338, 3339, 3340

### Commands
```bash
npm run dev          # Default server on port 3332
npm run dev:https    # HTTPS server on port 3332
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint
npm run test         # Vitest
npm run cy:open      # Cypress UI
npm run cy:run       # Cypress headless
```

## 🏗️ Technology Stack Details

### Frontend Framework
- **Next.js 14.2.5** with App Router
- **React 18.3.1** with TypeScript
- **Tailwind CSS 3.4.10** for styling
- **Framer Motion 11.2.6** for animations

### Development Tools
- **TypeScript 5.5.4** for type safety
- **ESLint** with Next.js configuration
- **Cypress 13.12.0** for E2E testing
- **Vitest 1.6.0** for unit testing

### Key Libraries
- **class-variance-authority** for component variants
- **lucide-react** for icons
- **xstate** for state management
- **zod** for schema validation

## 🎨 Component Architecture

### Core Components
1. **CategorizedAttributesDiagram** - Interactive SVG diagrams for model attributes
2. **SequenceDiagram** - Payment flow visualization
3. **ProgressSteps** - Multi-step form navigation
4. **EditableRulesList** - Dynamic business rules management
5. **EnhancedNotesSection** - Contextual help and documentation

### Payment Model Pages
Each model in `/app/models/` demonstrates different instalment approaches:
- **merchant-fullauth**: Single authorization with staged captures
- **merchant-mit**: Merchant-initiated transaction model
- **bnpl**: Buy Now Pay Later integration
- **acquirer**: Acquirer-managed instalment processing
- And 7+ other specialized models

## 🔧 Development Configuration

### TypeScript Configuration
- Strict mode enabled
- Path mapping for clean imports
- Next.js App Router support

### Tailwind CSS
- Custom design system
- Responsive utilities
- Component-specific styling

### ESLint Rules
- Next.js recommended rules
- TypeScript integration
- Custom project rules

## 📊 Key Features

### Interactive Diagrams
- **Responsive SVG visualizations**
- **Color-coded attribute categorization**
- **Dynamic sizing and positioning**
- **Export capabilities** (selectively removed from some components)

### Multi-Model Support
- **10+ payment models** with unique characteristics
- **Comparative analysis** between models
- **Real-world airline references**
- **Business rules validation**

### Development Experience
- **Hot reload** on multiple ports
- **TypeScript error checking**
- **Automated testing** with Cypress and Vitest
- **Responsive design** for all screen sizes

## 🎯 Current State

### Recently Completed
✅ Key Model Attributes diagram scaled 1.5x for optimal readability
✅ Diagram positioning and container optimization  
✅ UI cleanup (removed unnecessary elements)
✅ Multi-port development server configuration
✅ **Comparison table enhancement with dedicated page**
✅ **BNPL-styled diagrams standardized across all models**
✅ **Export functionality for Word/PDF formats**
✅ **Navigation improvements with icon linking**

### Active Development
- Multiple development servers running concurrently on ports 3334-3343
- Real-time updates and testing across different environments
- Component refinement and user experience improvements
- Comprehensive project documentation maintained

## 💾 Backup and Version Control

### Important Files to Preserve
- **All component files** in `/components/`
- **Model pages** in `/app/models/`
- **Configuration files**: package.json, tsconfig.json, tailwind.config.ts
- **Custom styling** and utilities in `/lib/`

### Development Environment
- **Node.js** project with npm package management
- **Next.js** development and production builds
- **Multiple concurrent servers** for testing and development
- **TypeScript compilation** and type checking

---

**Last Updated**: September 7, 2025
**Status**: ✅ All major enhancements completed - Comparison page, BNPL diagrams, and documentation up-to-date
**Latest Achievements**: 
- ✅ Dedicated comparison page with export functionality
- ✅ BNPL-styled diagrams standardized across all 13+ models
- ✅ Enhanced navigation and user experience
- ✅ Comprehensive project documentation maintained