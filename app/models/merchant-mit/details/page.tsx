'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, Pause, RotateCcw } from 'lucide-react';

export default function MerchantMITDetailsPage() {
  const [activeFlow, setActiveFlow] = useState<'cit' | 'mit' | null>('cit');
  const [animationStep, setAnimationStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Clean Header */}
      <div className="border-b border-gray-200 sticky top-0 z-40 bg-white/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link
            href="/models/merchant-mit"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Demo</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Title Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-semibold text-gray-900 mb-4">
            Merchant Financed MIT Instalments
          </h1>
          <p className="text-lg text-gray-600">
            Complete system architecture and payment flow from Test Airlines business perspective
          </p>
        </div>

        {/* Flow Controls */}
        <div className="mb-8 flex items-center gap-4">
          <button
            onClick={() => setActiveFlow('cit')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeFlow === 'cit'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Initial Payment (CIT)
          </button>
          <button
            onClick={() => setActiveFlow('mit')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeFlow === 'mit'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Recurring Payment (MIT)
          </button>
        </div>

        {/* Interactive System Architecture Diagram */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-12 border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            System Architecture & Payment Flow
          </h2>

          {activeFlow === 'cit' && <CITFlowDiagram />}
          {activeFlow === 'mit' && <MITFlowDiagram />}
        </div>

        {/* System Components Detail */}
        <div className="space-y-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-900">System Components</h2>

          <SystemComponentDetail
            title="Test Airlines Payment Page"
            color="blue"
            icon="💳"
            description="Customer-facing payment interface"
            responsibilities={[
              'Display available instalment plans based on booking amount',
              'Show monthly payment breakdown and schedule',
              'Present terms and conditions for MIT agreement',
              'Collect payment method details',
              'Display message: "Your payment will be debited according to the selected instalment schedule"',
              'Initiate 3DS2 authentication flow'
            ]}
            technicalDetails={[
              'Built with Next.js/React',
              'Integrated with NPP via REST API',
              'CyberSource SDK for tokenization',
              'Real-time plan calculation',
              'SCA compliance built-in'
            ]}
          />

          <SystemComponentDetail
            title="NPP (New Payment Platform) - Instalment Engine"
            color="purple"
            icon="⚙️"
            description="Core instalment management system within Test Airlines"
            responsibilities={[
              'Business Rules Engine: Determine eligible instalment options',
              'Calculate deposit amount (10-25% of total)',
              'Generate payment schedule (monthly instalments)',
              'Store instalment plan configuration',
              'Trigger MIT on due dates via scheduler',
              'Manage payment state machine (Pending → Active → Completed)',
              'Handle failed payment retries and notifications',
              'Revenue recognition and accounting integration'
            ]}
            technicalDetails={[
              'Node.js/Java microservices',
              'PostgreSQL for plan storage',
              'Redis for caching and distributed locks',
              'Cron scheduler for MIT triggering',
              'Token vault integration',
              'Event-driven architecture',
              'API endpoints for XPP integration'
            ]}
            businessRules={[
              'Minimum booking: £500',
              'Maximum booking: £10,000',
              'Deposit: 10-25% of total',
              'Instalments: 2-12 months',
              'Final payment: 7 days before departure',
              'Retry logic: 3 attempts over 5 days'
            ]}
          />

          <SystemComponentDetail
            title="XPP (Payment Orchestrator)"
            color="indigo"
            icon="🔄"
            description="Intelligent payment routing and orchestration layer"
            responsibilities={[
              'Route payment requests to appropriate PSP (CyberSource)',
              'Abstract PSP-specific logic from NPP',
              'Handle PSP failover and redundancy',
              'Normalize payment responses across PSPs',
              'Manage payment method routing rules',
              'Transaction logging and monitoring',
              'Retry orchestration for failed payments',
              'Webhook management from PSPs'
            ]}
            technicalDetails={[
              'API Gateway pattern',
              'Multi-PSP support',
              'Circuit breaker implementation',
              'Real-time monitoring dashboard',
              'Webhook receiver and router',
              'Transaction reconciliation',
              'Idempotency key management'
            ]}
          />

          <SystemComponentDetail
            title="CyberSource PSP"
            color="orange"
            icon="🏦"
            description="Payment Service Provider for transaction processing"
            responsibilities={[
              'Network tokenization (Visa/Mastercard tokens)',
              'Process CIT with 3DS2 authentication',
              'Execute MIT transactions using stored tokens',
              'Fraud screening via Decision Manager',
              'Authorization and capture processing',
              'Token lifecycle management (expiry, updates)',
              'Send payment status webhooks to XPP',
              'PCI DSS compliance and security'
            ]}
            technicalDetails={[
              'CyberSource REST API v2',
              'Network Token Service',
              '3DS2 authentication server',
              'Decision Manager for fraud',
              'Secure Acceptance integration',
              'Token Management Service',
              'Webhook notifications'
            ]}
            apiExamples={[
              {
                type: 'CIT Request',
                code: `{
  "processingInformation": {
    "commerceIndicator": "internet",
    "authorizationOptions": {
      "initiator": {
        "type": "customer",
        "credentialStoredOnFile": "true"
      }
    }
  },
  "orderInformation": {
    "amountDetails": {
      "totalAmount": "120.00",
      "currency": "GBP"
    }
  }
}`
              },
              {
                type: 'MIT Request',
                code: `{
  "processingInformation": {
    "commerceIndicator": "recurring",
    "authorizationOptions": {
      "initiator": {
        "type": "merchant",
        "merchantInitiatedTransaction": {
          "reason": "instalment"
        }
      }
    }
  },
  "paymentInformation": {
    "customer": {
      "customerId": "network_token_id"
    }
  }
}`
              }
            ]}
          />

          <SystemComponentDetail
            title="Amadeus GDS"
            color="teal"
            icon="✈️"
            description="Global Distribution System for reservations"
            responsibilities={[
              'Create PNR with instalment payment flag',
              'Track payment schedule against booking',
              'Validate payment timeline vs departure date',
              'Manage ticket issuance timing',
              'Handle booking amendments with instalment impact',
              'Queue management for payment follow-ups',
              'Cancellation and refund coordination'
            ]}
            technicalDetails={[
              'Amadeus SOAP/REST APIs',
              'PNR remarks for instalment tracking',
              'Queue category management',
              'Cryptic command integration',
              'Real-time availability checks'
            ]}
          />
        </div>

        {/* CIT vs MIT Comparison */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">CIT vs MIT: Key Differences</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <ComparisonCard
              title="CIT (Customer-Initiated Transaction)"
              badge="Initial Payment"
              color="green"
              items={[
                { label: 'Trigger', value: 'Customer action on payment page' },
                { label: 'Authentication', value: 'SCA Required (3DS2)' },
                { label: 'Customer Message', value: '"Future payments will be debited automatically"' },
                { label: 'Flow', value: 'Payment Page → NPP → XPP → CyberSource → Card Network' },
                { label: 'Purpose', value: 'Initial deposit + create network token' },
                { label: 'Consent', value: 'Explicit MIT agreement required' }
              ]}
            />

            <ComparisonCard
              title="MIT (Merchant-Initiated Transaction)"
              badge="Recurring Payment"
              color="blue"
              items={[
                { label: 'Trigger', value: 'NPP scheduler on due date' },
                { label: 'Authentication', value: 'No SCA Required' },
                { label: 'Customer Message', value: 'Email: "Payment processed successfully"' },
                { label: 'Flow', value: 'NPP Scheduler → XPP → CyberSource → Card Network' },
                { label: 'Purpose', value: 'Monthly instalment collection' },
                { label: 'Consent', value: 'Uses existing MIT agreement from CIT' }
              ]}
            />
          </div>
        </div>

        {/* Technical Implementation Notes */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-amber-900 mb-4">Critical Implementation Notes</h3>
          <ul className="space-y-2 text-sm text-amber-800">
            <li>• <strong>Idempotency:</strong> All payment requests must include unique transaction IDs to prevent duplicate charges</li>
            <li>• <strong>Token Security:</strong> Network tokens stored in encrypted vault, never in application database</li>
            <li>• <strong>State Management:</strong> Use distributed locks (Redis) when processing instalments to avoid race conditions</li>
            <li>• <strong>Retry Logic:</strong> Exponential backoff with maximum 3 attempts over 5 days</li>
            <li>• <strong>Reconciliation:</strong> Daily reconciliation between NPP, XPP, and CyberSource transaction logs</li>
            <li>• <strong>Monitoring:</strong> Real-time alerts for failed MITs, token expiry, and system errors</li>
          </ul>
        </div>

      </div>
    </div>
  );
}

// CIT Flow Diagram Component
function CITFlowDiagram() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-green-700 mb-2">Initial Payment Flow (CIT)</h3>
        <p className="text-sm text-gray-600">Customer initiates first payment with Strong Customer Authentication</p>
      </div>

      <div className="space-y-4">
        {/* Step 1: Customer on Payment Page */}
        <FlowStep
          number="1"
          system="Payment Page"
          color="blue"
          title="Customer Selects Instalment Plan"
          details={[
            'Customer views booking total: £480',
            'NPP calculates available plans: 3, 6, or 12 months',
            'Customer selects 6-month plan',
            'Display: Deposit £120 today, then £60/month × 5',
            'Message shown: "Your card will be charged £60 on the 15th of each month for 5 months"'
          ]}
          dataFlow="POST /npp/api/calculate-plans → Returns: [{months: 3, deposit: 160}, {months: 6, deposit: 120}, ...]"
        />

        {/* Step 2: Business Rules Check */}
        <FlowStep
          number="2"
          system="NPP - Business Rules Engine"
          color="purple"
          title="Eligibility Check & Plan Generation"
          details={[
            'Check booking amount: £480 ✓ (Min £500 ✗ - adjust rules or show error)',
            'Check departure date: 45 days ahead ✓',
            'Check customer location: UK ✓',
            'Check card type: Visa ✓',
            'Generate instalment schedule with due dates',
            'Create instalment plan record in database'
          ]}
          dataFlow="Internal rules engine → Plan ID: INS-2024-001"
        />

        {/* Step 3: Customer Enters Payment Details */}
        <FlowStep
          number="3"
          system="Payment Page"
          color="blue"
          title="Payment Method Collection"
          details={[
            'Customer enters card details: 4242 4242 4242 4242',
            'Accept MIT agreement checkbox',
            'Terms: "I authorize Test Airlines to charge my card according to the instalment schedule"',
            'Click "Pay Deposit" button',
            'Initiate 3DS2 authentication flow'
          ]}
          dataFlow="Card data tokenized by CyberSource SDK (browser-side)"
        />

        {/* Step 4: 3DS2 Authentication */}
        <FlowStep
          number="4"
          system="CyberSource - 3DS2"
          color="orange"
          title="Strong Customer Authentication"
          details={[
            'Customer redirected to bank 3DS2 page',
            'Enter OTP or biometric authentication',
            '3DS2 authentication successful',
            'Authentication result returned to payment page',
            'Network token created by CyberSource'
          ]}
          dataFlow="3DS2 auth → Token: tok_visa_xxxx1234"
        />

        {/* Step 5: CIT Authorization */}
        <FlowStep
          number="5"
          system="NPP → XPP → CyberSource"
          color="purple"
          title="Process CIT Authorization"
          details={[
            'NPP sends payment request to XPP',
            'XPP routes to CyberSource with CIT parameters',
            'CyberSource processes authorization (£120)',
            'CyberSource creates network token for future MITs',
            'Authorization approved',
            'Token stored in NPP Token Vault'
          ]}
          dataFlow="POST /xpp/api/authorize → Transaction ID: TXN-CIT-001 → Status: APPROVED"
        />

        {/* Step 6: Capture & Booking */}
        <FlowStep
          number="6"
          system="NPP + Amadeus"
          color="purple"
          title="Capture Payment & Create Booking"
          details={[
            'Capture £120 from authorization',
            'Update instalment plan status: ACTIVE',
            'Create PNR in Amadeus with instalment flag',
            'Schedule next MIT for 30 days later',
            'Send confirmation email to customer',
            'Display booking reference: ABC123'
          ]}
          dataFlow="PNR: ABC123 | Instalment Plan: INS-2024-001 | Next MIT: 2024-02-15"
        />
      </div>
    </div>
  );
}

// MIT Flow Diagram Component
function MITFlowDiagram() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-blue-700 mb-2">Recurring Payment Flow (MIT)</h3>
        <p className="text-sm text-gray-600">Automated monthly payment without customer interaction</p>
      </div>

      <div className="space-y-4">
        {/* Step 1: Scheduler Trigger */}
        <FlowStep
          number="1"
          system="NPP - MIT Scheduler"
          color="purple"
          title="Identify Due Instalments"
          details={[
            'Cron job runs daily at 02:00 UTC',
            'Query database for instalments due today',
            'Find plan INS-2024-001: £60 due on 2024-02-15',
            'Verify booking still active in Amadeus',
            'Retrieve stored network token from vault',
            'Prepare MIT payment request'
          ]}
          dataFlow="SELECT * FROM instalments WHERE due_date = CURRENT_DATE AND status = 'PENDING'"
        />

        {/* Step 2: Pre-notification */}
        <FlowStep
          number="2"
          system="NPP - Notifications"
          color="purple"
          title="Customer Pre-Notification"
          details={[
            'Send reminder email 3 days before: "Upcoming payment on Feb 15"',
            'SMS notification (if enabled): "£60 will be charged in 3 days"',
            'Allow customer to update payment method if needed',
            'Check for sufficient funds (optional pre-auth check)'
          ]}
          dataFlow="Email sent via SendGrid | SMS via Twilio"
        />

        {/* Step 3: MIT Execution */}
        <FlowStep
          number="3"
          system="NPP → XPP → CyberSource"
          color="indigo"
          title="Execute MIT Transaction"
          details={[
            'NPP sends MIT request to XPP',
            'XPP adds routing logic and idempotency key',
            'XPP forwards to CyberSource with MIT parameters',
            'commerceIndicator: "recurring"',
            'initiator: "merchant"',
            'reason: "instalment"',
            'previousTransactionId: TXN-CIT-001 (original CIT)'
          ]}
          dataFlow="POST /xpp/api/charge → MIT Transaction ID: TXN-MIT-002"
        />

        {/* Step 4: Authorization */}
        <FlowStep
          number="4"
          system="CyberSource → Card Network"
          color="orange"
          title="Process MIT Authorization"
          details={[
            'CyberSource sends MIT auth to Visa network',
            'No 3DS2 required (MIT exemption)',
            'Card issuer approves transaction',
            'Authorization code received: 123456',
            'Webhook sent to XPP: Payment successful'
          ]}
          dataFlow="Authorization successful | Amount: £60.00 | Auth Code: 123456"
        />

        {/* Step 5: Success Handling */}
        <FlowStep
          number="5"
          system="NPP - Payment Processing"
          color="purple"
          title="Update Records & Notify"
          details={[
            'Update instalment record: status = PAID',
            'Update plan: payments_completed = 2/6',
            'Capture funds (if not auto-captured)',
            'Update PNR in Amadeus with payment',
            'Send success email: "Payment processed: £60"',
            'Schedule next MIT for March 15'
          ]}
          dataFlow="Instalment 2/6 completed | Next MIT scheduled: 2024-03-15"
        />

        {/* Step 6: Failure Handling (if applicable) */}
        <FlowStep
          number="6"
          system="NPP - Retry Logic"
          color="red"
          title="Handle Failed Payment (If Occurs)"
          details={[
            'If MIT fails: Log failure reason',
            'Schedule retry #1 in 24 hours',
            'Send failed payment email to customer',
            'After 3 failed attempts: Escalate to manual review',
            'Cancel booking if payment not received after 5 days',
            'Process refund for previously paid instalments'
          ]}
          dataFlow="Retry attempt 1/3 | Next retry: 2024-02-16 02:00"
        />
      </div>
    </div>
  );
}

// Flow Step Component
function FlowStep({
  number,
  system,
  color,
  title,
  details,
  dataFlow
}: {
  number: string;
  system: string;
  color: string;
  title: string;
  details: string[];
  dataFlow: string;
}) {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200',
    purple: 'bg-purple-50 border-purple-200',
    indigo: 'bg-indigo-50 border-indigo-200',
    orange: 'bg-orange-50 border-orange-200',
    green: 'bg-green-50 border-green-200',
    red: 'bg-red-50 border-red-200',
    teal: 'bg-teal-50 border-teal-200',
  }[color];

  return (
    <div className={`${colorClasses} border-2 rounded-xl p-5`}>
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-${color}-200 flex items-center justify-center font-bold text-${color}-900`}>
          {number}
        </div>
        <div className="flex-1">
          <div className="mb-2">
            <span className={`px-2 py-1 bg-${color}-200 text-${color}-900 text-xs rounded-full font-semibold`}>
              {system}
            </span>
          </div>
          <h4 className="font-semibold text-gray-900 mb-3">{title}</h4>
          <ul className="space-y-1.5 mb-3">
            {details.map((detail, idx) => (
              <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-gray-400 mt-1">•</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
          <div className="bg-white/60 rounded p-3 border border-gray-200">
            <div className="text-xs font-mono text-gray-600">{dataFlow}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// System Component Detail Component
function SystemComponentDetail({
  title,
  color,
  icon,
  description,
  responsibilities,
  technicalDetails,
  businessRules,
  apiExamples
}: {
  title: string;
  color: string;
  icon: string;
  description: string;
  responsibilities: string[];
  technicalDetails: string[];
  businessRules?: string[];
  apiExamples?: Array<{ type: string; code: string }>;
}) {
  const colorClasses = {
    blue: 'border-blue-300',
    purple: 'border-purple-300',
    indigo: 'border-indigo-300',
    orange: 'border-orange-300',
    teal: 'border-teal-300',
  }[color];

  return (
    <div className={`border-l-4 ${colorClasses} bg-white rounded-r-xl p-6 shadow-sm`}>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{icon}</span>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Responsibilities</h4>
          <ul className="space-y-1.5">
            {responsibilities.map((item, idx) => (
              <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-blue-500 mt-1">▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Technical Details</h4>
          <ul className="space-y-1.5">
            {technicalDetails.map((item, idx) => (
              <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-purple-500 mt-1">▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {businessRules && (
        <div className="mt-4 bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">Business Rules</h4>
          <div className="grid md:grid-cols-2 gap-2">
            {businessRules.map((rule, idx) => (
              <div key={idx} className="text-sm text-gray-700">
                • {rule}
              </div>
            ))}
          </div>
        </div>
      )}

      {apiExamples && (
        <div className="mt-4 space-y-3">
          {apiExamples.map((example, idx) => (
            <div key={idx}>
              <h4 className="font-semibold text-gray-900 mb-2 text-sm">{example.type}</h4>
              <pre className="bg-gray-50 rounded p-3 overflow-x-auto text-xs font-mono text-gray-700 border border-gray-200">
                {example.code}
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Comparison Card Component
function ComparisonCard({
  title,
  badge,
  color,
  items
}: {
  title: string;
  badge: string;
  color: string;
  items: Array<{ label: string; value: string }>;
}) {
  const colorClasses = {
    green: 'bg-green-50 border-green-200',
    blue: 'bg-blue-50 border-blue-200',
  }[color];

  return (
    <div className={`${colorClasses} border-2 rounded-xl p-5`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <span className={`px-3 py-1 bg-${color}-100 text-${color}-700 text-xs rounded-full font-semibold`}>
          {badge}
        </span>
      </div>
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="border-b border-gray-200 pb-2 last:border-0">
            <div className="text-xs font-semibold text-gray-600 mb-1">{item.label}</div>
            <div className="text-sm text-gray-900">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
