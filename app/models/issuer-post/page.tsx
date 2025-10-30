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

export default function IssuerPostPage(){
  const amount = 180
  const [step,setStep]=useState<1|2|3|4>(1)
  const [result,setResult]=useState<'approved'|'declined'|null>(null)

  const rules = [
    { label: 'Payment completed successfully', passed: result === 'approved', required: true },
    { label: 'Eligible card type', passed: true, required: false },
    { label: 'Bank offers post-purchase instalments', passed: true, required: false },
    { label: 'Customer can access bank portal', passed: true, required: false }
  ]

  const attributes = [
    { label: 'Who funds', value: 'Customer\'s bank (post-purchase conversion)' },
    { label: 'Credit risk', value: 'Bank underwrites existing transaction' },
    { label: 'Underwriting', value: 'Bank\'s existing customer risk models' },
    { label: 'Customer cost', value: 'Bank\'s standard instalment fees/interest' },
    { label: 'First payment timing', value: 'Next statement cycle (varies by bank)' },
    { label: 'Integration type', value: 'Informational banner, external bank portal' },
    { label: 'Data captured', value: 'None - pure informational flow' },
    { label: 'SCA pattern', value: 'Customer authenticates with bank directly' },
    { label: 'Settlement to BA', value: 'Already completed at full amount' },
    { label: 'Refund handling', value: 'Standard refunds, bank handles adjustments' },
    { label: 'Chargeback liability', value: 'Standard merchant rules apply' },
    { label: 'Markets supported', value: 'Depends on bank partnerships and features' },
    { label: 'Dependencies', value: 'Bank portal links, customer education' }
  ]

  const paymentMethods = [
    {
      id: 'card',
      name: 'Pay with card',
      description: 'Complete payment now, convert to instalments later with your bank'
    }
  ]

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="badge border-cyan-200 bg-cyan-50 text-cyan-700">
            Model: Issuer instalments (post-purchase conversion)
          </div>
          <div className="badge border-gray-200 bg-gray-50 text-gray-700">
            Informational
          </div>
        </div>

        <ProgressSteps step={step} onStepClick={(stepNumber) => setStep(stepNumber as 1|2|3|4)} />

        {step===1 && (
          <section className="card p-5">
            <h2 className="text-xl font-semibold mb-3">Payment method</h2>
            <p className="text-sm text-gray-600 mb-4">
              Complete your payment normally. After checkout, you may be able to convert to instalments through your bank.
            </p>
            <PaymentMethodSelector 
              methods={paymentMethods}
              onSelect={() => setStep(2)}
            />
          </section>
        )}

        {step===2 && (
          <section className="card p-5">
            <h2 className="text-xl font-semibold mb-3">Payment details</h2>
            <p className="text-sm text-gray-600 mb-4">
              Complete your payment. We'll show you instalment options after checkout.
            </p>
            <CardForm onPay={() => {
              setResult('approved')
              setStep(3)
            }} />
          </section>
        )}

        {step===3 && (
          <section className="card p-5">
            <div className="flex items-center gap-2 text-green-600 mb-3">
              <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-sm">✓</span>
              <h2 className="text-xl font-semibold">Payment completed</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Your payment has been processed successfully.
            </p>
            <div className="flex justify-end">
              <button className="btn-primary" onClick={() => setStep(4)}>
                Continue to confirmation
              </button>
            </div>
          </section>
        )}

        {step===4 && (
          <>
            <section className="card p-5">
              <div className="flex items-center gap-2 text-green-600 mb-3">
                <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-sm">✓</span>
                <h2 className="text-xl font-semibold">Booking confirmed</h2>
              </div>
              <p className="text-sm text-gray-600">
                Your flight has been booked and payment processed.
              </p>
            </section>

            <section className="card p-5 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  $
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">💳 Convert to instalments with your bank</h3>
                  <p className="text-sm text-gray-700 mb-3">
                    Many banks allow you to convert recent purchases to monthly instalments. Check your banking app or website.
                  </p>
                  <div className="space-y-2">
                    <div className="text-xs text-gray-600">Popular bank options:</div>
                    <div className="flex flex-wrap gap-2">
                      <a href="#" className="inline-flex items-center gap-1 text-xs bg-white border border-gray-200 rounded-lg px-2 py-1 hover:border-blue-300 transition">
                        <span>🏦</span>
                        <span>HSBC Instalments</span>
                      </a>
                      <a href="#" className="inline-flex items-center gap-1 text-xs bg-white border border-gray-200 rounded-lg px-2 py-1 hover:border-blue-300 transition">
                        <span>🏦</span>
                        <span>Barclays Plan</span>
                      </a>
                      <a href="#" className="inline-flex items-center gap-1 text-xs bg-white border border-gray-200 rounded-lg px-2 py-1 hover:border-blue-300 transition">
                        <span>🏦</span>
                        <span>Lloyds PayPlan</span>
                      </a>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-3">
                    Transaction reference: TXN-{Date.now().toString().slice(-8)}
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Airline References */}
        <div className="bg-white rounded-2xl border border-blue-200 p-6">
          <h3 className="text-lg font-semibold mb-4 text-blue-900">✈️ Real Airline References</h3>
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="font-medium text-gray-900 mb-2">Japan Airlines (JAL)</div>
              <div className="text-sm text-gray-600 mb-3">Post-purchase instalment conversion available through Japanese bank partnerships</div>
              <a href="#" onClick={() => alert("Feature reference - actual implementation would link to payment page")} className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1">
                        View Feature <span className="text-xs">🔗</span>
                      </a>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="font-medium text-gray-900 mb-2">All Nippon Airways (ANA)</div>
              <div className="text-sm text-gray-600 mb-3">Information-only model directing customers to their bank for instalment conversion</div>
              <a href="#" onClick={() => alert("Feature reference - actual implementation would link to payment page")} className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1">
                        View Feature <span className="text-xs">🔗</span>
                      </a>
            </div>
          </div>
        </div>

        <TermsPanel model="issuer-post" />

        <section className="card p-5">
          <h3 className="text-lg font-semibold mb-3">Business rules and eligibility</h3>
          <RulesList rules={rules} />
        </section>

        {/* Sequence Diagram */}
        <SequenceDiagram
          title="Issuer Post-Purchase Conversion Flow Sequence"
          actors={['Customer', 'BA', 'Bank Portal']}
          steps={[
            {
              from: 'Customer',
              to: 'BA',
              message: 'Select card payment option',
              type: 'request'
            },
            {
              from: 'Customer',
              to: 'BA',
              message: 'Submit card details and complete payment',
              note: `Full payment of €${amount.toFixed(2)}`,
              type: 'request'
            },
            {
              from: 'BA',
              to: 'BA',
              message: 'Process standard card payment',
              note: 'Normal payment processing - full amount charged',
              type: 'process'
            },
            {
              from: 'BA',
              to: 'Customer',
              message: 'Payment confirmed - Booking complete',
              type: 'response'
            },
            {
              from: 'BA',
              to: 'Customer',
              message: 'Display post-purchase instalment banner',
              note: 'Show informational banner about bank instalment options',
              type: 'response'
            },
            {
              from: 'Customer',
              to: 'Customer',
              message: 'Customer views instalment conversion options',
              note: 'Self-service decision to convert payment to instalments',
              type: 'process'
            },
            {
              from: 'Customer',
              to: 'Bank Portal',
              message: 'Access bank website/app independently',
              note: 'Customer navigates to their banking platform',
              type: 'request'
            },
            {
              from: 'Bank Portal',
              to: 'Customer',
              message: 'Display recent transactions',
              note: 'Show transaction history including BA payment',
              type: 'response'
            },
            {
              from: 'Customer',
              to: 'Bank Portal',
              message: 'Select BA transaction for conversion',
              note: 'Choose to convert payment to instalments',
              type: 'request'
            },
            {
              from: 'Bank Portal',
              to: 'Customer',
              message: 'Present instalment plan options',
              note: 'Bank-specific terms, fees, and payment schedule',
              type: 'response'
            },
            {
              from: 'Customer',
              to: 'Bank Portal',
              message: 'Accept instalment conversion terms',
              type: 'request'
            },
            {
              from: 'Bank Portal',
              to: 'Bank Portal',
              message: 'Convert payment to instalment plan',
              note: 'Bank manages instalment schedule and collections',
              type: 'process'
            },
            {
              from: 'Bank Portal',
              to: 'Customer',
              message: 'Instalment plan confirmation',
              note: 'Payment converted to monthly instalments',
              type: 'response'
            }
          ]}
        />

        <div className="bg-white rounded-2xl border border-gray-200 p-4">
          <h3 className="text-lg font-semibold mb-3">Key Model Attributes</h3>
          <CategorizedAttributesDiagram 
            attributes={attributes} 
            title="Key Attributes"
            modelName="Issuer Post-Auth"
          />
        </div>
      </div>

      <SummaryCard amount={amount} />
    </div>
  )
}