'use client'

import React from 'react'
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

export default function BNPLPage(){
  const amount = 320
  const [step,setStep]=useState<1|2|3|4>(1)
  const [result,setResult]=useState<'approved'|'declined'|null>(null)

  const rules = [
    { label: 'Maximum amount £1000', passed: amount <= 1000, required: true },
    { label: 'BNPL provider available', passed: true, required: true },
    { label: 'Credit check passed', passed: result === 'approved', required: true },
    { label: 'Valid email for notifications', passed: true, required: true },
    { label: 'Market supported', passed: true, required: true }
  ]

  const attributes = [
    { label: 'Who funds', value: 'BNPL partner (Klarna, Clearpay, PayPal)' },
    { label: 'Credit risk', value: 'BNPL partner bears all credit risk' },
    { label: 'Underwriting', value: 'Partner real-time credit assessment' },
    { label: 'Customer cost', value: 'Free if paid on time, fees by partner' },
    { label: 'First payment timing', value: 'Immediate or 2 weeks (partner dependent)' },
    { label: 'Integration type', value: 'Redirect to partner checkout flow' },
    { label: 'Data captured', value: 'Partner handles all customer data' },
    { label: 'SCA pattern', value: 'Partner manages SCA requirements' },
    { label: 'Settlement to Test Airlines', value: 'Immediate full payment minus commission' },
    { label: 'Refund handling', value: 'Coordinated between Test Airlines and partner' },
    { label: 'Chargeback liability', value: 'Partner handles chargebacks' },
    { label: 'Markets supported', value: 'UK, EU, US (partner dependent)' },
    { label: 'Dependencies', value: 'Partner availability and credit approval' }
  ]

  const paymentMethods = [
    {
      id: 'paypal-3',
      name: 'PayPal Pay in 3',
      description: '3 interest-free monthly payments',
    },
    {
      id: 'paypal-4',
      name: 'PayPal Pay in 4',
      description: '4 interest-free payments over 6 weeks'
    },
    {
      id: 'klarna',
      name: 'Pay with Klarna',
      description: 'Split into 3 interest-free payments'
    },
    {
      id: 'clearpay',
      name: 'Pay with Clearpay',
      description: 'Buy now, pay in 4 installments'
    },
    {
      id: 'card',
      name: 'Pay with card',
      description: 'Complete payment now'
    }
  ]

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="badge border-purple-200 bg-purple-50 text-purple-700">
            Model: BNPL (partner financed)
          </div>
          <div className="badge border-green-200 bg-green-50 text-green-700">
            Risk transfer
          </div>
        </div>

        <ProgressSteps step={step} onStepClick={(stepNumber) => setStep(stepNumber as 1|2|3|4)} />

        {step===1 && (
          <section className="card p-5">
            <h2 className="text-xl font-semibold mb-3">Choose your payment method</h2>
            <p className="text-sm text-gray-600 mb-4">
              Select a Buy Now Pay Later option or pay with card.
            </p>
            <PaymentMethodSelector 
              methods={paymentMethods}
              onSelect={(methodId) => {
                if (methodId !== 'card') {
                  setStep(2)
                }
              }}
            />
          </section>
        )}

        {step===2 && (
          <section className="card p-5">
            <h2 className="text-xl font-semibold mb-3">BNPL Application</h2>
            <p className="text-sm text-gray-600 mb-4">
              You'll be redirected to complete your application with the BNPL provider.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
              <div className="text-sm text-blue-800">
                <div className="font-medium mb-2">What happens next</div>
                <div className="space-y-1">
                  <div>✓ Redirect to partner checkout</div>
                  <div>⏱ Instant credit decision</div>
                  <div>📄 Set up payment schedule</div>
                  <div>↩ Return to complete booking</div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button className="btn-primary" onClick={() => setStep(3)}>
                Continue to BNPL partner
              </button>
            </div>
          </section>
        )}

        {step===3 && (
          <section className="card p-5">
            <h2 className="text-xl font-semibold mb-3">BNPL Application Result</h2>
            <p className="text-sm text-gray-600 mb-4">
              Complete the application process with your chosen BNPL provider.
            </p>
            
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
              <div className="text-sm text-amber-800">
                <div className="font-medium mb-1">🔄 Processing with partner</div>
                <div>Your application is being processed. You may need to provide additional information.</div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button className="btn-secondary" onClick={() => setResult('declined')}>
                Simulate Decline
              </button>
              <button className="btn-primary" onClick={() => {
                setResult('approved')
                setStep(4)
              }}>
                Simulate Approval
              </button>
            </div>
          </section>
        )}

        {step===4 && (
          <section className="card p-5">
            {result === 'approved' ? (
              <>
                <div className="flex items-center gap-2 text-green-600 mb-3">
                  <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-sm">✓</span>
                  <h2 className="text-xl font-semibold">BNPL Approved - Booking Confirmed</h2>
                </div>
                <div className="space-y-3 text-sm">
                  <p>Your BNPL application has been approved and your booking is confirmed.</p>
                  <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                    <div className="font-medium text-green-800">Payment Schedule</div>
                    <ul className="text-green-700 mt-1 space-y-1">
                      <li>• First payment: Today £{(amount/3).toFixed(2)}</li>
                      <li>• Second payment: In 30 days £{(amount/3).toFixed(2)}</li>
                      <li>• Final payment: In 60 days £{(amount/3).toFixed(2)}</li>
                      <li>• Manage payments in partner app</li>
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 text-red-600 mb-3">
                  <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center text-sm">✗</span>
                  <h2 className="text-xl font-semibold">BNPL Application Declined</h2>
                </div>
                <p className="text-sm text-gray-600">
                  Your BNPL application was not approved. Please try a different payment method.
                </p>
              </>
            )}
          </section>
        )}

        {/* BNPL Provider References */}
        <div className="bg-white rounded-2xl border border-blue-200 p-6">
          <h3 className="text-lg font-semibold mb-4 text-blue-900">🛒 Real BNPL Provider References</h3>
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
            <div className="border border-gray-200 rounded-lg p-4 border-blue-300 bg-blue-50">
              <div className="font-medium text-gray-900 mb-2">PayPal Pay in 3/4</div>
              <div className="text-sm text-gray-600 mb-3">Pay in 3 monthly payments or 4 payments over 6 weeks, interest-free</div>
              <a href="#" onClick={() => alert('Feature reference - actual implementation would redirect to PayPal')} className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1">
                View Integration <span className="text-xs">🔗</span>
              </a>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="font-medium text-gray-900 mb-2">Klarna</div>
              <div className="text-sm text-gray-600 mb-3">Pay in 3 interest-free installments or pay later in 30 days</div>
              <a href="#" onClick={() => alert('Feature reference - actual implementation would redirect to Klarna')} className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1">
                View Integration <span className="text-xs">🔗</span>
              </a>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="font-medium text-gray-900 mb-2">Clearpay</div>
              <div className="text-sm text-gray-600 mb-3">Shop now, pay later in 4 interest-free installments</div>
              <a href="#" onClick={() => alert('Feature reference - actual implementation would redirect to Clearpay')} className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1">
                View Integration <span className="text-xs">🔗</span>
              </a>
            </div>
          </div>
        </div>

        <TermsPanel model="bnpl" />

        <section className="card p-5">
          <h3 className="text-lg font-semibold mb-3">Business rules and eligibility</h3>
          <RulesList rules={rules} />
        </section>

        {/* Sequence Diagram */}
        <SequenceDiagram
          title="BNPL Partner Integration Flow Sequence"
          actors={['Customer', 'Test Airlines', 'BNPL Partner', 'Bank']}
          steps={[
            {
              from: 'Customer',
              to: 'Test Airlines',
              message: 'Select BNPL payment option',
              type: 'request'
            },
            {
              from: 'Test Airlines',
              to: 'Customer',
              message: 'Display BNPL providers',
              note: 'Show Klarna, Clearpay, PayPal options',
              type: 'response'
            },
            {
              from: 'Customer',
              to: 'Test Airlines',
              message: 'Choose BNPL provider',
              type: 'request'
            },
            {
              from: 'Test Airlines',
              to: 'BNPL Partner',
              message: 'Redirect to partner checkout',
              note: 'Pass booking amount and customer details',
              type: 'request'
            },
            {
              from: 'BNPL Partner',
              to: 'Customer',
              message: 'Show BNPL application form',
              note: 'Capture customer details for credit check',
              type: 'response'
            },
            {
              from: 'Customer',
              to: 'BNPL Partner',
              message: 'Submit BNPL application',
              type: 'request'
            },
            {
              from: 'BNPL Partner',
              to: 'BNPL Partner',
              message: 'Instant credit assessment',
              note: 'Real-time credit decision using partner algorithms',
              type: 'process'
            },
            {
              from: 'BNPL Partner',
              to: 'Customer',
              message: 'BNPL approval/decline decision',
              type: 'response'
            },
            {
              from: 'BNPL Partner',
              to: 'Test Airlines',
              message: `Pay merchant upfront (£${(amount * 0.97).toFixed(2)})`,
              note: 'Full amount minus commission (~3%)',
              type: 'request'
            },
            {
              from: 'BNPL Partner',
              to: 'Bank',
              message: 'Process merchant payment',
              type: 'request'
            },
            {
              from: 'Bank',
              to: 'Test Airlines',
              message: 'Settlement complete',
              type: 'response'
            },
            {
              from: 'BNPL Partner',
              to: 'Customer',
              message: 'Set up payment schedule',
              note: 'Customer manages repayments via partner app',
              type: 'process'
            }
          ]}
        />

        <div className="bg-white rounded-2xl border border-gray-200 p-4">
          <h3 className="text-lg font-semibold mb-3">Key Model Attributes</h3>
          <CategorizedAttributesDiagram 
            attributes={attributes} 
            title="Key Attributes"
            modelName="BNPL Integration"
          />
        </div>
      </div>

      <SummaryCard amount={amount} />
    </div>
  )
}