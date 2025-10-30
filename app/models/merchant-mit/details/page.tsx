'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronDown, ChevronRight } from 'lucide-react';

export default function MerchantMITDetailsPage() {
  const [activeSection, setActiveSection] = useState<string | null>('overview');

  return (
    <div className="min-h-screen bg-white">
      {/* Clean Header */}
      <div className="border-b border-gray-200 sticky top-0 z-40 bg-white/95 backdrop-blur">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link
            href="/models/merchant-mit"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Demo</span>
          </Link>
        </div>
      </div>

      {/* Main Content - ChatGPT Style */}
      <div className="max-w-3xl mx-auto px-6 py-12">

        {/* Title Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-semibold text-gray-900 mb-4">
            Merchant Financed MIT Instalments
          </h1>
          <p className="text-lg text-gray-600">
            Technical documentation for implementing instalment payments with MIT (Merchant-Initiated Transactions)
          </p>
        </div>

        {/* Conversational Sections */}
        <div className="space-y-8">

          <ConversationBlock
            title="What is Merchant-Financed MIT?"
            isActive={activeSection === 'overview'}
            onToggle={() => setActiveSection(activeSection === 'overview' ? null : 'overview')}
          >
            <p className="text-gray-700 leading-relaxed mb-4">
              Merchant-financed instalments using Merchant-Initiated Transactions (MIT) is a payment model where Test Airlines owns and manages the entire instalment lifecycle. Unlike BNPL partners, Test Airlines directly finances the customer and collects payments over time.
            </p>

            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">Key Concept</h4>
              <p className="text-sm text-gray-700">
                The first payment requires <strong>Customer-Initiated Transaction (CIT)</strong> with Strong Customer Authentication (SCA/3DS2). Subsequent payments use <strong>Merchant-Initiated Transactions (MIT)</strong> - automated charges that don't require customer interaction.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4">
              <FeaturePill icon="💰" label="Revenue Control" />
              <FeaturePill icon="🔒" label="MIT Compliance" />
              <FeaturePill icon="📊" label="Full Visibility" />
            </div>
          </ConversationBlock>

          <ConversationBlock
            title="System Architecture"
            isActive={activeSection === 'architecture'}
            onToggle={() => setActiveSection(activeSection === 'architecture' ? null : 'architecture')}
          >
            <p className="text-gray-700 leading-relaxed mb-6">
              The solution involves four main systems working together:
            </p>

            <div className="space-y-3">
              <SystemCard
                emoji="🎨"
                title="Test Airlines Frontend"
                description="Customer-facing web application"
                details={[
                  'Instalment plan selection UI',
                  'Payment method tokenization',
                  'SCA/3DS2 authentication flow',
                  'Booking confirmation display'
                ]}
              />

              <SystemCard
                emoji="⚙️"
                title="Test Airlines Backend"
                description="Core instalment engine and orchestration"
                details={[
                  'Payment schedule calculation',
                  'MIT transaction triggering',
                  'Token vault management',
                  'Retry logic and fallback handling'
                ]}
              />

              <SystemCard
                emoji="💳"
                title="CyberSource PSP"
                description="Payment gateway and tokenization"
                details={[
                  'Network tokenization',
                  'CIT authorization (initial)',
                  'MIT transactions (recurring)',
                  'Fraud screening and 3DS2'
                ]}
              />

              <SystemCard
                emoji="✈️"
                title="Amadeus GDS"
                description="Reservation and ticketing system"
                details={[
                  'PNR creation with instalment flag',
                  'Payment timeline validation',
                  'Ticket issuance timing',
                  'Queue management'
                ]}
              />
            </div>
          </ConversationBlock>

          <ConversationBlock
            title="Payment Flow"
            isActive={activeSection === 'flow'}
            onToggle={() => setActiveSection(activeSection === 'flow' ? null : 'flow')}
          >
            <p className="text-gray-700 leading-relaxed mb-6">
              Here's how the payment journey works from start to finish:
            </p>

            <div className="space-y-6">
              <FlowPhase
                phase="Initial Payment (CIT)"
                steps={[
                  { num: 1, title: 'Customer Checkout', desc: 'Customer selects instalment plan and enters payment details' },
                  { num: 2, title: 'Schedule Calculation', desc: 'Backend calculates deposit and monthly instalments' },
                  { num: 3, title: '3DS2 Authentication', desc: 'Customer completes Strong Customer Authentication' },
                  { num: 4, title: 'Tokenization', desc: 'CyberSource creates network token for future payments' },
                  { num: 5, title: 'First Charge', desc: 'Deposit payment authorized and captured' },
                  { num: 6, title: 'Booking Created', desc: 'PNR created in Amadeus with instalment flag' }
                ]}
              />

              <FlowPhase
                phase="Recurring Payments (MIT)"
                steps={[
                  { num: 7, title: 'Schedule Trigger', desc: 'Cron job identifies instalments due for payment' },
                  { num: 8, title: 'MIT Execution', desc: 'Automated charge using stored token (no customer action)' },
                  { num: 9, title: 'PNR Update', desc: 'Amadeus PNR updated with payment status' },
                  { num: 10, title: 'Customer Notification', desc: 'Email/SMS sent confirming successful payment' }
                ]}
              />
            </div>
          </ConversationBlock>

          <ConversationBlock
            title="CIT vs MIT Configuration"
            isActive={activeSection === 'citMit'}
            onToggle={() => setActiveSection(activeSection === 'citMit' ? null : 'citMit')}
          >
            <p className="text-gray-700 leading-relaxed mb-6">
              Understanding the difference between CIT and MIT is crucial for implementation:
            </p>

            <ComparisonTable
              leftTitle="CIT (Customer-Initiated)"
              leftBadge="Initial Payment"
              leftItems={[
                { label: 'Authentication', value: 'SCA Required (3DS2)' },
                { label: 'Customer Action', value: 'Active participation needed' },
                { label: 'Use Case', value: 'First deposit payment' },
                { label: 'Tokenization', value: 'Network token created' },
                { label: 'CyberSource Field', value: 'commerceIndicator: internet' }
              ]}
              rightTitle="MIT (Merchant-Initiated)"
              rightBadge="Recurring Payments"
              rightItems={[
                { label: 'Authentication', value: 'No SCA Required' },
                { label: 'Customer Action', value: 'Fully automated' },
                { label: 'Use Case', value: 'Monthly instalments' },
                { label: 'Tokenization', value: 'Uses existing token' },
                { label: 'CyberSource Field', value: 'commerceIndicator: recurring' }
              ]}
            />

            <div className="bg-gray-50 rounded-lg p-5 mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">CyberSource API Example</h4>
              <pre className="text-xs font-mono text-gray-700 overflow-x-auto">
{`// CIT (Initial Payment)
{
  "processingInformation": {
    "commerceIndicator": "internet",
    "authorizationOptions": {
      "initiator": {
        "type": "customer",
        "credentialStoredOnFile": "true"
      }
    }
  }
}

// MIT (Recurring Payment)
{
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
  }
}`}
              </pre>
            </div>
          </ConversationBlock>

          <ConversationBlock
            title="Instalment Engine"
            isActive={activeSection === 'engine'}
            onToggle={() => setActiveSection(activeSection === 'engine' ? null : 'engine')}
          >
            <p className="text-gray-700 leading-relaxed mb-6">
              The instalment engine is the heart of the system. Here are the core components:
            </p>

            <div className="grid gap-4">
              <EngineComponent
                title="Schedule Calculator"
                description="Calculates payment splits based on business rules"
                items={[
                  'Deposit amount (10-25% of total)',
                  'Monthly instalment distribution',
                  'Interest calculation if applicable',
                  'Due date computation',
                ]}
              />

              <EngineComponent
                title="Payment Orchestrator"
                description="Manages the payment execution lifecycle"
                items={[
                  'Identifies due payments via cron',
                  'Triggers MIT transactions',
                  'Handles retry logic on failures',
                  'Sends customer notifications',
                ]}
              />

              <EngineComponent
                title="Token Vault"
                description="Securely stores payment tokens"
                items={[
                  'Network token storage (PCI compliant)',
                  'Token-to-booking association',
                  'Expiry and update handling',
                  'Encryption at rest',
                ]}
              />

              <EngineComponent
                title="State Machine"
                description="Tracks instalment lifecycle"
                items={[
                  'States: Pending → Active → Completed',
                  'Failed payment workflows',
                  'Cancellation handling',
                  'Refund processing',
                ]}
              />
            </div>

            <div className="bg-gray-50 rounded-lg p-5 mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">Database Schema</h4>
              <pre className="text-xs font-mono text-gray-700 overflow-x-auto">
{`CREATE TABLE instalment_plans (
  id UUID PRIMARY KEY,
  booking_id VARCHAR(10) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  number_of_instalments INT NOT NULL,
  payment_token_id VARCHAR(255) NOT NULL,
  status VARCHAR(20) NOT NULL
);

CREATE TABLE instalments (
  id UUID PRIMARY KEY,
  plan_id UUID REFERENCES instalment_plans(id),
  amount DECIMAL(10,2) NOT NULL,
  due_date DATE NOT NULL,
  status VARCHAR(20) NOT NULL,
  retry_count INT DEFAULT 0
);`}
              </pre>
            </div>
          </ConversationBlock>

          <ConversationBlock
            title="Business Rules"
            isActive={activeSection === 'rules'}
            onToggle={() => setActiveSection(activeSection === 'rules' ? null : 'rules')}
          >
            <p className="text-gray-700 leading-relaxed mb-6">
              Configure these rules to control how instalments work:
            </p>

            <div className="space-y-4">
              <RuleCategory
                title="Eligibility"
                rules={[
                  { name: 'Minimum Amount', value: '£500', configurable: true },
                  { name: 'Maximum Amount', value: '£10,000', configurable: true },
                  { name: 'Advance Booking', value: '30 days before departure', configurable: true },
                  { name: 'Card Types', value: 'Visa, Mastercard', configurable: true }
                ]}
              />

              <RuleCategory
                title="Payments"
                rules={[
                  { name: 'Deposit', value: '10-25% of total', configurable: true },
                  { name: 'Instalments', value: '2-12 months', configurable: true },
                  { name: 'Final Payment', value: '7 days before departure', configurable: true },
                  { name: 'Interest Rate', value: '0% APR', configurable: true }
                ]}
              />

              <RuleCategory
                title="Processing"
                rules={[
                  { name: 'Retry Attempts', value: '3 times over 5 days', configurable: true },
                  { name: 'Payment Window', value: '02:00-04:00 UTC', configurable: true },
                  { name: 'Late Fee', value: '£15 per failure', configurable: true },
                  { name: 'Reminders', value: '3 days before due', configurable: true }
                ]}
              />
            </div>
          </ConversationBlock>

          <ConversationBlock
            title="Technical Requirements"
            isActive={activeSection === 'requirements'}
            onToggle={() => setActiveSection(activeSection === 'requirements' ? null : 'requirements')}
          >
            <p className="text-gray-700 leading-relaxed mb-6">
              Here's what you need to implement this solution:
            </p>

            <div className="space-y-4">
              <RequirementSection
                title="Infrastructure"
                items={[
                  'High-availability servers (99.9% uptime)',
                  'Load balancers for traffic distribution',
                  'Redis for caching and session management',
                  'PostgreSQL with replication',
                  'Message queue (RabbitMQ/Kafka)'
                ]}
              />

              <RequirementSection
                title="Security"
                items={[
                  'PCI DSS Level 1 compliance',
                  'TLS 1.2+ for all communications',
                  'Token vault encryption at rest',
                  'GDPR compliance for customer data',
                  'Regular security audits'
                ]}
              />

              <RequirementSection
                title="Integrations"
                items={[
                  'CyberSource REST API v2',
                  'Amadeus SOAP/REST APIs',
                  '3DS2 authentication server',
                  'Email/SMS notification services',
                  'Fraud detection service'
                ]}
              />
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 mt-6">
              <h4 className="font-semibold text-amber-900 mb-3">⚠️ Critical Considerations</h4>
              <ul className="space-y-2 text-sm text-amber-800">
                <li>• <strong>Idempotency:</strong> All MIT transactions must be idempotent to prevent duplicate charges</li>
                <li>• <strong>Retry Logic:</strong> Implement exponential backoff for failed payments</li>
                <li>• <strong>Token Lifecycle:</strong> Handle token expiry and Account Updater responses</li>
                <li>• <strong>State Management:</strong> Use distributed locks to prevent race conditions</li>
                <li>• <strong>Failure Scenarios:</strong> Plan for gateway downtime, timeouts, and network issues</li>
              </ul>
            </div>
          </ConversationBlock>

          <ConversationBlock
            title="Testing Checklist"
            isActive={activeSection === 'testing'}
            onToggle={() => setActiveSection(activeSection === 'testing' ? null : 'testing')}
          >
            <p className="text-gray-700 leading-relaxed mb-6">
              Ensure you test these scenarios before going live:
            </p>

            <div className="space-y-2">
              {[
                'End-to-end CIT flow with 3DS2 authentication',
                'MIT execution with stored tokens',
                'Failed payment retry logic',
                'Token expiry and refresh handling',
                'Cancellation and refund workflows',
                'Edge cases (partial payments, amendments)',
                'Load testing for peak booking periods',
                'Security testing (OWASP Top 10)',
                'PCI DSS compliance validation',
                'Disaster recovery procedures'
              ].map((item, idx) => (
                <ChecklistItem key={idx} text={item} />
              ))}
            </div>
          </ConversationBlock>

        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="text-center text-sm text-gray-500">
            <p>For questions or support, contact your technical team.</p>
          </div>
        </div>

      </div>
    </div>
  );
}

// Conversation Block Component
function ConversationBlock({
  title,
  children,
  isActive,
  onToggle
}: {
  title: string;
  children: React.ReactNode;
  isActive: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="group">
      <button
        onClick={onToggle}
        className="w-full text-left"
      >
        <div className="flex items-start gap-3 group-hover:opacity-80 transition">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mt-1">
            {isActive ? (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-600" />
            )}
          </div>
          <div className="flex-1 pt-1">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">{title}</h2>
          </div>
        </div>
      </button>

      {isActive && (
        <div className="ml-11 mt-4 text-gray-700">
          {children}
        </div>
      )}
    </div>
  );
}

// Feature Pill Component
function FeaturePill({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-full px-3 py-2 text-center text-sm">
      <span className="mr-1">{icon}</span>
      <span className="text-gray-700">{label}</span>
    </div>
  );
}

// System Card Component
function SystemCard({
  emoji,
  title,
  description,
  details
}: {
  emoji: string;
  title: string;
  description: string;
  details: string[];
}) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">{emoji}</span>
        <div>
          <h4 className="font-semibold text-gray-900">{title}</h4>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      <ul className="ml-11 space-y-1 text-sm text-gray-700">
        {details.map((detail, idx) => (
          <li key={idx}>• {detail}</li>
        ))}
      </ul>
    </div>
  );
}

// Flow Phase Component
function FlowPhase({
  phase,
  steps
}: {
  phase: string;
  steps: Array<{ num: number; title: string; desc: string }>;
}) {
  return (
    <div>
      <h4 className="font-semibold text-gray-900 mb-3">{phase}</h4>
      <div className="space-y-2">
        {steps.map((step) => (
          <div key={step.num} className="flex gap-3 pl-2">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-semibold">
              {step.num}
            </div>
            <div className="flex-1 pb-3 border-b border-gray-100 last:border-0">
              <div className="font-medium text-gray-900 text-sm">{step.title}</div>
              <div className="text-sm text-gray-600 mt-0.5">{step.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Comparison Table Component
function ComparisonTable({
  leftTitle,
  leftBadge,
  leftItems,
  rightTitle,
  rightBadge,
  rightItems
}: {
  leftTitle: string;
  leftBadge: string;
  leftItems: Array<{ label: string; value: string }>;
  rightTitle: string;
  rightBadge: string;
  rightItems: Array<{ label: string; value: string }>;
}) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-900">{leftTitle}</h4>
          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">{leftBadge}</span>
        </div>
        <div className="space-y-2">
          {leftItems.map((item, idx) => (
            <div key={idx} className="text-sm">
              <div className="text-gray-600">{item.label}</div>
              <div className="font-medium text-gray-900">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-900">{rightTitle}</h4>
          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">{rightBadge}</span>
        </div>
        <div className="space-y-2">
          {rightItems.map((item, idx) => (
            <div key={idx} className="text-sm">
              <div className="text-gray-600">{item.label}</div>
              <div className="font-medium text-gray-900">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Engine Component Card
function EngineComponent({
  title,
  description,
  items
}: {
  title: string;
  description: string;
  items: string[];
}) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
      <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
      <p className="text-sm text-gray-600 mb-3">{description}</p>
      <ul className="space-y-1 text-sm text-gray-700">
        {items.map((item, idx) => (
          <li key={idx}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}

// Rule Category Component
function RuleCategory({
  title,
  rules
}: {
  title: string;
  rules: Array<{ name: string; value: string; configurable: boolean }>;
}) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h4 className="font-semibold text-gray-900 mb-3">{title}</h4>
      <div className="space-y-2">
        {rules.map((rule, idx) => (
          <div key={idx} className="flex items-center justify-between text-sm">
            <span className="text-gray-700">{rule.name}</span>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900">{rule.value}</span>
              {rule.configurable && (
                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">Config</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Requirement Section Component
function RequirementSection({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
      <ul className="space-y-1 text-sm text-gray-700">
        {items.map((item, idx) => (
          <li key={idx}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}

// Checklist Item Component
function ChecklistItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-700 py-2 px-3 bg-gray-50 rounded hover:bg-gray-100 transition">
      <div className="w-4 h-4 rounded border-2 border-gray-300 flex-shrink-0" />
      <span>{text}</span>
    </div>
  );
}
