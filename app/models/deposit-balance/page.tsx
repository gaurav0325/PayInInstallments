'use client'
import { EnhancedNotesSection } from "@/components/EnhancedNotesSection"
import { SequenceDiagram } from '@/components/SequenceDiagram'
import { useState } from 'react'
import { ProgressSteps } from '@/components/ProgressSteps'
import { CardForm } from '@/components/CardForm'
import { SummaryCard } from '@/components/SummaryCard'
import { TermsPanel } from '@/components/TermsPanel'
import { RulesList } from '@/components/RulesList'
import { CategorizedAttributesDiagram } from '@/components/CategorizedAttributesDiagram'
import { PaymentMethodSelector } from '@/components/PaymentMethodSelector'
import { calcDepositBalance } from '@/lib/calc'

export default function DepositBalancePage(){
  const amount = 180
  const [step,setStep]=useState<1|2|3|4>(1)
  const [depositPercent,setDepositPercent]=useState(20)
  const [result,setResult]=useState<'approved'|'declined'|null>(null)
  const schedule = calcDepositBalance(amount, depositPercent)

  const travelDate = new Date()
  travelDate.setDate(travelDate.getDate() + 45) // 45 days from now
  const balanceDueDate = new Date(travelDate)
  balanceDueDate.setDate(balanceDueDate.getDate() - 7) // 7 days before travel

  const rules = [
    { label: 'Return journey required', passed: true, required: true },
    { label: 'Travel date allows deposit plan', passed: true, required: true },
    { label: 'Valid payment card', passed: true, required: true },
    { label: 'Email for notifications', passed: true, required: true },
    { label: 'Deposit payment successful', passed: result === 'approved', required: true }
  ]

  const attributes = [
    { label: 'Who funds', value: 'Merchant (Test Airlines) with customer deposit' },
    { label: 'Credit risk', value: 'Reduced risk due to deposit, balance risk remains' },
    { label: 'Underwriting', value: 'Basic checks, deposit reduces exposure' },
    { label: 'Customer cost', value: 'No additional fees typically' },
    { label: 'First payment timing', value: 'Deposit today, balance before travel' },
    { label: 'Integration type', value: 'Embedded in checkout flow' },
    { label: 'Data captured', value: 'Card details, travel dates, email' },
    { label: 'SCA pattern', value: 'CIT for deposit, MIT for balance' },
    { label: 'Settlement to Test Airlines', value: 'Deposit now, balance on due date' },
    { label: 'Refund handling', value: 'Prorated based on payments made' },
    { label: 'Chargeback liability', value: 'Standard merchant rules apply' },
    { label: 'Markets supported', value: 'Global for leisure travel bookings' },
    { label: 'Dependencies', value: 'Travel date tracking, reminder systems' }
  ]

  const paymentMethods = [
    {
      id: 'card',
      name: 'Pay with card',
      description: 'Immediate full payment'
    },
    {
      id: 'deposit',
      name: 'Deposit + Balance',
      description: `Pay ${depositPercent}% deposit now, remaining balance before travel`,
    }
  ]

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="badge border-emerald-200 bg-emerald-50 text-emerald-700">
            Model: Deposit + balance (deposit now, balance before travel)
          </div>
          <div className="badge border-blue-200 bg-blue-50 text-blue-700">
            Travel aligned
          </div>
        </div>

        <ProgressSteps step={step} onStepClick={(stepNumber) => setStep(stepNumber as 1|2|3|4)} />

        {step===1 && (
          <section className="card p-5">
            <h2 className="text-xl font-semibold mb-3">Choose your payment method</h2>
            <PaymentMethodSelector 
              methods={paymentMethods}
              onSelect={(methodId) => {
                if (methodId === 'deposit') {
                  setStep(2)
                }
              }}
            />
          </section>
        )}

        {step===2 && (
          <section className="card p-5">
            <h2 className="text-xl font-semibold mb-3">Deposit + balance plan</h2>
            <p className="text-sm text-gray-600 mb-4">
              Secure your booking with a deposit today. Pay the balance before your travel date.
            </p>
            
            <div className="space-y-3 mb-4">
              {[20, 30, 50].map(percent => {
                const sched = calcDepositBalance(amount, percent)
                return (
                  <label key={percent} className={`card p-4 cursor-pointer border-2 transition-colors ${
                    depositPercent === percent ? 'border-emerald-600 bg-emerald-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="deposit-percent"
                        checked={depositPercent === percent}
                        onChange={() => setDepositPercent(percent)}
                      />
                      <div className="flex-1">
                        <div className="font-medium">{percent}% deposit</div>
                        <div className="text-sm text-gray-600">
                          €{sched.deposit.toFixed(2)} now, €{sched.balance.toFixed(2)} later
                        </div>
                      </div>
                    </div>
                  </label>
                )
              })}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
              <div className="text-sm text-blue-800">
                <div className="font-medium mb-2">📅 Payment timeline</div>
                <div className="space-y-1">
                  <div>• Today: €{schedule.deposit.toFixed(2)} deposit</div>
                  <div>• By {balanceDueDate.toLocaleDateString()}: €{schedule.balance.toFixed(2)} balance</div>
                  <div>• Travel date: {travelDate.toLocaleDateString()}</div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button className="btn-primary" onClick={() => setStep(3)}>
                Continue with deposit plan
              </button>
            </div>
          </section>
        )}

        {step===3 && (
          <section className="card p-5">
            <h2 className="text-xl font-semibold mb-3">Pay deposit</h2>
            <p className="text-sm text-gray-600 mb-4">
              Pay your €{schedule.deposit.toFixed(2)} deposit now to secure your booking.
            </p>
            
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
              <div className="text-sm text-amber-800">
                <div className="font-medium mb-1">💳 Card storage consent</div>
                <div>
                  We'll securely store your card to collect the balance payment automatically 
                  on {balanceDueDate.toLocaleDateString()}. You can update payment method anytime.
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="card p-4 bg-emerald-50 border-emerald-200">
                <div className="text-sm text-emerald-600">Charging today</div>
                <div className="text-2xl font-semibold text-emerald-800">€{schedule.deposit.toFixed(2)}</div>
              </div>
              <div className="card p-4">
                <div className="text-sm text-gray-600">Due {balanceDueDate.toLocaleDateString()}</div>
                <div className="text-2xl font-semibold">€{schedule.balance.toFixed(2)}</div>
              </div>
            </div>

            <CardForm onPay={() => {
              setResult('approved')
              setStep(4)
            }} />
          </section>
        )}

        {step===4 && (
          <section className="card p-5">
            {result === 'approved' ? (
              <>
                <div className="flex items-center gap-2 text-green-600 mb-3">
                  <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-sm">✓</span>
                  <h2 className="text-xl font-semibold">Deposit paid - Booking secured</h2>
                </div>
                <div className="space-y-3 text-sm">
                  <p>Your deposit has been processed and booking confirmed.</p>
                  <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                    <div className="font-medium text-green-800">Payment plan summary</div>
                    <div className="text-green-700 mt-1 space-y-1">
                      <div>✓ Deposit paid: €{schedule.deposit.toFixed(2)}</div>
                      <div>📅 Balance due: €{schedule.balance.toFixed(2)} by {balanceDueDate.toLocaleDateString()}</div>
                      <div>✈️ Travel date: {travelDate.toLocaleDateString()}</div>
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                    <div className="text-sm text-blue-800">
                      <div className="font-medium mb-1">What happens next</div>
                      <ul className="space-y-1">
                        <li>• We'll email you reminders before balance due date</li>
                        <li>• Balance will be charged automatically to your saved card</li>
                        <li>• You can pay balance early or update payment method in "My Bookings"</li>
                        <li>• Full refund protection applies until balance payment</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-red-600">Deposit payment failed.</div>
            )}
          </section>
        )}

        <TermsPanel model="deposit-balance" />

        <section className="card p-5">
          <h3 className="text-lg font-semibold mb-3">Business rules and eligibility</h3>
          <RulesList rules={rules} />
        </section>

        {/* Sequence Diagram */}
        <SequenceDiagram
          title="Deposit + Balance Payment Flow Sequence"
          actors={['Customer', 'Test Airlines', 'Acquirer', 'Bank']}
          steps={[
            {
              from: 'Customer',
              to: 'Test Airlines',
              message: 'Select deposit + balance payment option',
              type: 'request'
            },
            {
              from: 'Test Airlines',
              to: 'Customer',
              message: 'Display deposit percentage options',
              note: `Choose from ${[20, 30, 50].join('%, ')}% deposit options`,
              type: 'response'
            },
            {
              from: 'Customer',
              to: 'Test Airlines',
              message: `Choose ${depositPercent}% deposit plan`,
              type: 'request'
            },
            {
              from: 'Customer',
              to: 'Test Airlines',
              message: 'Submit card details for deposit payment',
              note: `Pay €${schedule.deposit.toFixed(2)} deposit now`,
              type: 'request'
            },
            {
              from: 'Test Airlines',
              to: 'Acquirer',
              message: 'Process deposit payment',
              note: `Charge €${schedule.deposit.toFixed(2)} immediately`,
              type: 'request'
            },
            {
              from: 'Acquirer',
              to: 'Bank',
              message: 'Process deposit charge',
              type: 'request'
            },
            {
              from: 'Bank',
              to: 'Acquirer',
              message: 'Deposit payment approved',
              type: 'response'
            },
            {
              from: 'Acquirer',
              to: 'Test Airlines',
              message: 'Deposit payment confirmation',
              type: 'response'
            },
            {
              from: 'Test Airlines',
              to: 'Customer',
              message: 'Booking confirmed - Deposit received',
              note: 'Store card details securely for balance payment',
              type: 'response'
            },
            {
              from: 'Test Airlines',
              to: 'Customer',
              message: 'Send balance payment reminders',
              note: 'Email reminders before travel date',
              type: 'process'
            },
            {
              from: 'Test Airlines',
              to: 'Acquirer',
              message: `Charge balance before service (€${schedule.balance.toFixed(2)})`,
              note: `Due ${balanceDueDate.toLocaleDateString()} - 7 days before travel`,
              type: 'request'
            },
            {
              from: 'Acquirer',
              to: 'Bank',
              message: 'Process balance payment (MIT)',
              type: 'request'
            },
            {
              from: 'Bank',
              to: 'Acquirer',
              message: 'Balance payment processed',
              type: 'response'
            },
            {
              from: 'Acquirer',
              to: 'Test Airlines',
              message: 'Balance payment settlement complete',
              type: 'response'
            }
          ]}
        />

        <div className="bg-white rounded-2xl border border-gray-200 p-4">
          <h3 className="text-lg font-semibold mb-3">Key Model Attributes</h3>
          <CategorizedAttributesDiagram 
            attributes={attributes} 
            title="Key Attributes"
            modelName="Deposit Balance"
          />
        </div>
      </div>

      <SummaryCard amount={amount} />
    </div>
  )
}