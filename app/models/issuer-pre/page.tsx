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

export default function IssuerPrePage(){
  const amount = 180
  const [step,setStep]=useState<1|2|3|4>(1)
  const [showBankModal,setShowBankModal]=useState(false)
  const [cardBIN,setCardBIN]=useState('')
  const [instalmentEligible,setInstalmentEligible]=useState(false)
  const [result,setResult]=useState<'approved'|'declined'|null>(null)

  const rules = [
    { label: 'Eligible card BIN detected', passed: instalmentEligible, required: true },
    { label: 'Issuer supports instalments', passed: instalmentEligible, required: true },
    { label: 'Customer bank account eligible', passed: result === 'approved', required: true },
    { label: 'Transaction amount suitable', passed: amount >= 50, required: true },
    { label: 'Market regulatory approval', passed: true, required: true }
  ]

  const attributes = [
    { label: 'Who funds', value: 'Spanish banks (BBVA, Santander, CaixaBank)' },
    { label: 'Credit risk', value: 'Full issuer credit risk and assessment' },
    { label: 'Underwriting', value: 'Bank\'s credit decisioning in real-time' },
    { label: 'Customer cost', value: 'Per issuer\'s standard instalment terms' },
    { label: 'First payment timing', value: 'Per bank policy (today or deferred)' },
    { label: 'Integration type', value: 'Bank modal triggered by BIN detection' },
    { label: 'Data captured', value: 'Minimal - instalment preference only' },
    { label: 'SCA pattern', value: 'Bank handles all SCA requirements' },
    { label: 'Settlement to BA', value: 'Full amount settled immediately' },
    { label: 'Refund handling', value: 'Standard merchant refunds, bank adjusts' },
    { label: 'Chargeback liability', value: 'Standard merchant chargeback rules' },
    { label: 'Markets supported', value: 'Per issuer coverage and regulatory approval' },
    { label: 'Dependencies', value: 'Issuer partnership, BIN range configuration' }
  ]

  const paymentMethods = [
    {
      id: 'card',
      name: 'Pay with card',
      description: 'Enter your card details to check instalment availability'
    }
  ]

  const handleCardInput = (pan: string) => {
    const bin = pan.substring(0, 6)
    setCardBIN(bin)
    
    // Simulate BIN check for Spanish bank cards
    const eligibleBINs = ['424242', '543210', '552100'] // BBVA, Santander, CaixaBank BINs
    const eligible = eligibleBINs.some(b => bin.startsWith(b.substring(0, 4)))
    setInstalmentEligible(eligible)

    if (eligible) {
      setTimeout(() => setShowBankModal(true), 500)
    } else {
      setStep(4)
      setResult('declined')
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="badge border-teal-200 bg-teal-50 text-teal-700">
            Model: Bank instalments (BBVA, Santander, etc.)
          </div>
          <div className="badge border-purple-200 bg-purple-50 text-purple-700">
            Bank modal
          </div>
        </div>

        <ProgressSteps step={step} onStepClick={(stepNumber) => setStep(stepNumber as 1|2|3|4)} />

        {step===1 && (
          <section className="card p-5">
            <h2 className="text-xl font-semibold mb-3">Payment method</h2>
            <p className="text-sm text-gray-600 mb-4">
              Enter your card details. If your bank offers instalments, you'll see options automatically.
            </p>
            <PaymentMethodSelector 
              methods={paymentMethods}
              onSelect={() => setStep(2)}
            />
          </section>
        )}

        {step===2 && (
          <section className="card p-5">
            <h2 className="text-xl font-semibold mb-3">Card details</h2>
            <p className="text-sm text-gray-600 mb-4">
              We'll check if your card is eligible for bank instalments.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
              <div className="text-sm text-blue-800">
                <div className="font-medium mb-1">How it works</div>
                <div>If your bank supports instalments for this purchase, you'll see a popup from your bank where you can choose your preferred plan.</div>
              </div>
            </div>
            <CardForm onPay={handleCardInput} />
          </section>
        )}

        {step===3 && (
          <section className="card p-5">
            <h2 className="text-xl font-semibold mb-3">Bank instalment options</h2>
            <p className="text-sm text-gray-600 mb-4">
              Your bank has confirmed instalment availability for this transaction.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="text-sm text-green-800">
                <div className="font-medium mb-2">Bank instalments activated</div>
                <div>Your bank will convert this payment to instalments according to your selected terms. The full amount is paid to BA immediately.</div>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button className="btn-primary" onClick={() => {
                setResult('approved')
                setStep(4)
              }}>
                Complete payment
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
                  <h2 className="text-xl font-semibold">Payment completed with bank instalments</h2>
                </div>
                <div className="space-y-3 text-sm">
                  <p>Your payment has been processed successfully with bank instalments.</p>
                  <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                    <div className="font-medium text-green-800">What happens next</div>
                    <ul className="text-green-700 mt-1 space-y-1">
                      <li>• BA receives full payment immediately</li>
                      <li>• Your bank manages instalment billing</li>
                      <li>• Check your bank app for instalment details</li>
                      <li>• Standard refund process applies</li>
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 text-amber-600 mb-3">
                  <span className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center text-sm">i</span>
                  <h2 className="text-xl font-semibold">Bank instalments not available</h2>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Your card doesn't support instalments for this transaction. You can complete payment normally.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                  <div className="text-sm text-blue-800">
                    <div className="font-medium mb-1">Alternative options</div>
                    <div>Consider other instalment models like BNPL or merchant instalments that may be available.</div>
                  </div>
                </div>
              </>
            )}
          </section>
        )}

        {/* Airline References */}
        <div className="bg-white rounded-2xl border border-blue-200 p-6">
          <h3 className="text-lg font-semibold mb-4 text-blue-900">✈️ Real Airline References</h3>
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="font-medium text-gray-900 mb-2">Cathay Pacific</div>
              <div className="text-sm text-gray-600 mb-3">Bank-issued card instalment plans offered at checkout for premium routes</div>
              <a href="#" onClick={() => alert("Feature reference - actual implementation would link to payment page")} className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1">
                        View Feature <span className="text-xs">🔗</span>
                      </a>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="font-medium text-gray-900 mb-2">Singapore Airlines</div>
              <div className="text-sm text-gray-600 mb-3">Partnership with DBS and OCBC for integrated instalment payment options</div>
              <a href="#" onClick={() => alert("Feature reference - actual implementation would link to payment page")} className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1">
                        View Feature <span className="text-xs">🔗</span>
                      </a>
            </div>
          </div>
        </div>

        <TermsPanel model="issuer-pre" />

        <section className="card p-5">
          <h3 className="text-lg font-semibold mb-3">Business rules and eligibility</h3>
          <RulesList rules={rules} />
        </section>

        {/* Sequence Diagram */}
        <SequenceDiagram
          title="Issuer Pre-Purchase BIN Detection Flow Sequence"
          actors={['Customer', 'BA', 'Bank', 'Acquirer']}
          steps={[
            {
              from: 'Customer',
              to: 'BA',
              message: 'Select card payment option',
              type: 'request' as const
            },
            {
              from: 'Customer',
              to: 'BA',
              message: 'Enter card details (PAN)',
              note: 'Customer types card number',
              type: 'request' as const
            },
            {
              from: 'BA',
              to: 'BA',
              message: 'Extract BIN from card number',
              note: `Analyze first 6 digits: ${cardBIN || 'BIN detection'}`,
              type: 'process'
            },
            {
              from: 'BA',
              to: 'BA',
              message: 'Check BIN against eligible ranges',
              note: 'Lookup configured bank partnerships',
              type: 'process'
            },
            {
              from: 'BA',
              to: 'Bank',
              message: 'Query instalment availability',
              note: 'Real-time eligibility check with issuer',
              type: 'request' as const
            },
            {
              from: 'Bank',
              to: 'BA',
              message: instalmentEligible ? 'Instalment options available' : 'No instalment options',
              note: instalmentEligible ? 'Return available plans and terms' : 'Card not eligible for instalments',
              type: 'response' as const
            },
            ...(instalmentEligible ? [
              {
                from: 'BA',
                to: 'Customer',
                message: 'Display bank modal with instalment options',
                note: 'Show bank-branded interface with terms',
                type: 'response' as const
              },
              {
                from: 'Customer',
                to: 'Bank',
                message: 'Select preferred instalment plan',
                note: `Choose from 3-month, 6-month options`,
                type: 'request' as const
              },
              {
                from: 'Bank',
                to: 'Customer',
                message: 'Confirm instalment terms',
                type: 'response' as const
              },
              {
                from: 'Customer',
                to: 'Bank',
                message: 'Accept instalment plan',
                type: 'request' as const
              },
              {
                from: 'Bank',
                to: 'Acquirer',
                message: `Process full payment to BA (€${amount.toFixed(2)})`,
                note: 'Bank pays BA immediately, manages customer instalments',
                type: 'request' as const
              },
              {
                from: 'Acquirer',
                to: 'BA',
                message: 'Payment settlement complete',
                type: 'response' as const
              },
              {
                from: 'Bank',
                to: 'Customer',
                message: 'Set up instalment billing schedule',
                note: 'Bank manages ongoing collection from customer',
                type: 'process' as const
              }
            ] : [
              {
                from: 'BA',
                to: 'Customer',
                message: 'Continue with standard payment',
                note: 'No instalment options available for this card',
                type: 'response' as const
              }
            ])
          ]}
        />

        <div className="bg-white rounded-2xl border border-gray-200 p-4">
          <h3 className="text-lg font-semibold mb-3">Key Model Attributes</h3>
          <CategorizedAttributesDiagram 
            attributes={attributes} 
            title="Key Attributes"
            modelName="Issuer Pre-Auth"
          />
        </div>
      </div>

      <SummaryCard amount={amount} />

      {showBankModal && (
        <div className="fixed inset-0 bg-black/30 grid place-items-center">
          <div className="card p-6 bg-white max-w-md w-full mx-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">BANK</div>
              <div className="text-lg font-semibold">Your Bank Installments</div>
            </div>
            <div className="text-sm text-gray-600 mb-4">
              Your bank offers instalments for this €{amount} purchase.
            </div>
            <div className="space-y-3 mb-4">
              <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input type="radio" name="bank-plan" defaultChecked />
                <div>
                  <div className="font-medium">3 months</div>
                  <div className="text-xs text-gray-500">€{(amount/3).toFixed(2)}/month, 0% interest</div>
                </div>
              </label>
              <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input type="radio" name="bank-plan" />
                <div>
                  <div className="font-medium">6 months</div>
                  <div className="text-xs text-gray-500">€{(amount/6).toFixed(2)}/month, 2.9% APR</div>
                </div>
              </label>
            </div>
            <div className="flex gap-2">
              <button 
                className="flex-1 btn bg-gray-200 text-gray-700"
                onClick={() => {
                  setShowBankModal(false)
                  setResult('declined')
                  setStep(4)
                }}
              >
                No thanks
              </button>
              <button 
                className="flex-1 btn-primary"
                onClick={() => {
                  setShowBankModal(false)
                  setStep(3)
                }}
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}