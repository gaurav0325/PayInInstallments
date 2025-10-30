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
import { calcDeferredSchedule } from '@/lib/calc'

export default function DeferredPage(){
  const amount = 180
  const [step,setStep]=useState<1|2|3|4>(1)
  const [deferDays,setDeferDays]=useState(30)
  const [result,setResult]=useState<'approved'|'declined'|null>(null)
  const schedule = calcDeferredSchedule(amount, deferDays)

  const rules = [
    { label: 'Maximum amount €1000', passed: amount <= 1000, required: true },
    { label: 'Valid payment card', passed: true, required: true },
    { label: 'Email for reminders', passed: true, required: true },
    { label: 'Payment authorisation successful', passed: result === 'approved', required: true },
    { label: 'Deferred payment service available', passed: true, required: true }
  ]

  const attributes = [
    { label: 'Who funds', value: 'Merchant (BA) extends credit temporarily' },
    { label: 'Credit risk', value: 'Full merchant risk with basic screening' },
    { label: 'Underwriting', value: 'Fraud checks and payment method validation' },
    { label: 'Customer cost', value: 'Typically free if paid on time' },
    { label: 'First payment timing', value: 'Deferred by agreed number of days' },
    { label: 'Integration type', value: 'Embedded in checkout flow' },
    { label: 'Data captured', value: 'Card details, email for notifications' },
    { label: 'SCA pattern', value: 'Authorize now, charge later (CIT)' },
    { label: 'Settlement to BA', value: 'BA receives payment on due date' },
    { label: 'Refund handling', value: 'Standard refund process applies' },
    { label: 'Chargeback liability', value: 'Standard merchant chargeback rules' },
    { label: 'Markets supported', value: 'Global, subject to regulatory limits' },
    { label: 'Dependencies', value: 'Payment authorisation, reminder system' }
  ]

  const paymentMethods = [
    {
      id: 'card',
      name: 'Pay with card',
      description: 'Immediate full payment'
    },
    {
      id: 'deferred',
      name: 'Pay later',
      description: `Pay nothing today, full amount due in ${deferDays} days`,
    }
  ]

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="badge border-green-200 bg-green-50 text-green-700">
            Model: Deferred payment (pay later by N days)
          </div>
          <div className="badge border-orange-200 bg-orange-50 text-orange-700">
            Zero today
          </div>
        </div>

        <ProgressSteps step={step} onStepClick={(stepNumber) => setStep(stepNumber as 1|2|3|4)} />

        {step===1 && (
          <section className="card p-5">
            <h2 className="text-xl font-semibold mb-3">Choose your payment method</h2>
            <PaymentMethodSelector 
              methods={paymentMethods}
              onSelect={(methodId) => {
                if (methodId === 'deferred') {
                  setStep(2)
                }
              }}
            />
          </section>
        )}

        {step===2 && (
          <section className="card p-5">
            <h2 className="text-xl font-semibold mb-3">Pay later options</h2>
            <p className="text-sm text-gray-600 mb-4">
              Choose when you'd like to pay for your booking.
            </p>
            
            <div className="space-y-3 mb-4">
              {[14, 30, 60].map(days => {
                const sched = calcDeferredSchedule(amount, days)
                return (
                  <label key={days} className={`card p-4 cursor-pointer border-2 transition-colors ${
                    deferDays === days ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="defer-period"
                        checked={deferDays === days}
                        onChange={() => setDeferDays(days)}
                      />
                      <div className="flex-1">
                        <div className="font-medium">Pay in {days} days</div>
                        <div className="text-sm text-gray-600">Due date: {new Date(sched.dueDate).toLocaleDateString()}</div>
                      </div>
                      <div className="text-xl font-semibold">€{amount.toFixed(2)}</div>
                    </div>
                  </label>
                )
              })}
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
              <div className="text-sm text-amber-800">
                <div className="font-medium mb-1">📅 Payment reminder</div>
                <div>We'll send email reminders 7, 3, and 1 day before your payment is due. No charges today!</div>
              </div>
            </div>

            <div className="flex justify-end">
              <button className="btn-primary" onClick={() => setStep(3)}>
                Continue with pay later
              </button>
            </div>
          </section>
        )}

        {step===3 && (
          <section className="card p-5">
            <h2 className="text-xl font-semibold mb-3">Payment authorisation</h2>
            <p className="text-sm text-gray-600 mb-4">
              We need to authorize your payment method. You won't be charged until {new Date(schedule.dueDate).toLocaleDateString()}.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
              <div className="text-sm text-blue-800">
                <div className="font-medium mb-2">Your payment schedule</div>
                <div className="space-y-1">
                  <div>✓ Today: €0.00 (booking confirmed)</div>
                  <div>📅 {new Date(schedule.dueDate).toLocaleDateString()}: €{amount.toFixed(2)} (full payment)</div>
                </div>
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
                  <h2 className="text-xl font-semibold">Booking confirmed - Pay later activated</h2>
                </div>
                <div className="space-y-3 text-sm">
                  <p>Your booking is confirmed and pay later plan is active.</p>
                  <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                    <div className="font-medium text-green-800">What happens next</div>
                    <ul className="text-green-700 mt-1 space-y-1">
                      <li>• No charge today - booking is secured</li>
                      <li>• Payment due: {new Date(schedule.dueDate).toLocaleDateString()}</li>
                      <li>• Email reminders before due date</li>
                      <li>• Card will be charged automatically</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                    <div className="text-xs text-amber-700">
                      <strong>Important:</strong> If payment fails on the due date, your booking may be cancelled and fees may apply.
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-red-600">Payment authorisation failed.</div>
            )}
          </section>
        )}

        {/* Airline References */}
        <div className="bg-white rounded-2xl border border-blue-200 p-6">
          <h3 className="text-lg font-semibold mb-4 text-blue-900">✈️ Real Airline References</h3>
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="font-medium text-gray-900 mb-2">Wizz Air</div>
              <div className="text-sm text-gray-600 mb-3">Pay later option with 30-day deferred payment for seasonal bookings</div>
              <a href="#" onClick={() => alert('Feature reference - actual implementation would link to payment page')} className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1">
                        View Feature <span className="text-xs">🔗</span>
                      </a>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="font-medium text-gray-900 mb-2">Frontier Airlines</div>
              <div className="text-sm text-gray-600 mb-3">Deferred payment plans allowing customers to book now and pay closer to travel date</div>
              <a href="#" onClick={() => alert('Feature reference - actual implementation would link to payment page')} className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1">
                        View Feature <span className="text-xs">🔗</span>
                      </a>
            </div>
          </div>
        </div>

        <TermsPanel model="deferred" />

        <section className="card p-5">
          <h3 className="text-lg font-semibold mb-3">Business rules and eligibility</h3>
          <RulesList rules={rules} />
        </section>

        {/* Sequence Diagram */}
        <SequenceDiagram
          title="Deferred Payment Flow Sequence"
          actors={['Customer', 'BA', 'Acquirer', 'Bank']}
          steps={[
            {
              from: 'Customer',
              to: 'BA',
              message: 'Select deferred payment option',
              type: 'request'
            },
            {
              from: 'BA',
              to: 'Customer',
              message: 'Display deferred payment terms',
              note: `Choose from ${[14, 30, 60].join(', ')} day deferral options`,
              type: 'response'
            },
            {
              from: 'Customer',
              to: 'BA',
              message: `Choose ${deferDays}-day deferral period`,
              type: 'request'
            },
            {
              from: 'BA',
              to: 'Acquirer',
              message: 'Submit card details for authorisation',
              note: 'Zero amount authorisation to validate payment method',
              type: 'request'
            },
            {
              from: 'Acquirer',
              to: 'Bank',
              message: 'Process authorisation request',
              type: 'request'
            },
            {
              from: 'Bank',
              to: 'Acquirer',
              message: 'Authorization approved (€0.00)',
              type: 'response'
            },
            {
              from: 'Acquirer',
              to: 'BA',
              message: 'Authorization confirmation',
              type: 'response'
            },
            {
              from: 'BA',
              to: 'Customer',
              message: 'Booking confirmed - Payment deferred',
              note: `Payment due in ${deferDays} days`,
              type: 'response'
            },
            {
              from: 'BA',
              to: 'Customer',
              message: 'Send payment reminders',
              note: 'Email reminders sent 7, 3, and 1 days before due date',
              type: 'process'
            },
            {
              from: 'BA',
              to: 'Acquirer',
              message: `Charge full amount on due date (€${amount.toFixed(2)})`,
              note: 'Automated charge processing on scheduled date',
              type: 'request'
            },
            {
              from: 'Acquirer',
              to: 'Bank',
              message: 'Process deferred payment charge',
              type: 'request'
            },
            {
              from: 'Bank',
              to: 'Acquirer',
              message: 'Payment processed successfully',
              type: 'response'
            },
            {
              from: 'Acquirer',
              to: 'BA',
              message: 'Payment settlement complete',
              type: 'response'
            }
          ]}
        />

        <div className="bg-white rounded-2xl border border-gray-200 p-4">
          <h3 className="text-lg font-semibold mb-3">Key Model Attributes</h3>
          <CategorizedAttributesDiagram 
            attributes={attributes} 
            title="Key Attributes"
            modelName="Deferred Payment"
          />
        </div>
      </div>

      <SummaryCard amount={amount} />
    </div>
  )
}