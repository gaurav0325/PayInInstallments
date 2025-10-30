'use client'

import React from 'react'
import { EnhancedNotesSection } from "@/components/EnhancedNotesSection"
import { SequenceDiagram } from '@/components/SequenceDiagram'
import { useState, useEffect } from 'react'
import { ProgressSteps } from '@/components/ProgressSteps'
import { SummaryCard } from '@/components/SummaryCard'
import { TermsPanel } from '@/components/TermsPanel'
import { RulesList } from '@/components/RulesList'
import { CategorizedAttributesDiagram } from '@/components/CategorizedAttributesDiagram'
import { PaymentMethodSelector } from '@/components/PaymentMethodSelector'
import Link from 'next/link'

interface RoutingRule {
  condition: string
  result: string
  model: string
  priority: number
  passed: boolean
}

export default function HybridPage(){
  const amount = 180
  const [step,setStep]=useState<1|2|3>(1)
  const [evaluating,setEvaluating]=useState(false)
  const [selectedModel,setSelectedModel]=useState<string|null>(null)

  // Simulate customer context
  const customerContext = {
    market: 'ES',
    isReturn: true,
    hasSpanishID: true,
    cardBIN: '424242',
    amount: 180,
    travelDate: '2024-10-15',
    basketType: 'leisure'
  }

  const routingRules: RoutingRule[] = [
    {
      condition: 'Market = ES AND hasSpanishID AND isReturn AND amount >= €45',
      result: 'Route to BNPL (Klarna)',
      model: 'bnpl',
      priority: 1,
      passed: customerContext.market === 'ES' && customerContext.hasSpanishID && customerContext.isReturn && customerContext.amount >= 45
    },
    {
      condition: 'Eligible card BIN AND amount >= €50',
      result: 'Route to Issuer Pre-purchase',
      model: 'issuer-pre',
      priority: 2,
      passed: ['424242', '411111'].some(bin => customerContext.cardBIN.startsWith(bin.substring(0,4))) && customerContext.amount >= 50
    },
    {
      condition: 'Travel date > 30 days AND isReturn',
      result: 'Route to Deposit + Balance',
      model: 'deposit-balance',
      priority: 3,
      passed: new Date(customerContext.travelDate).getTime() > Date.now() + (30 * 24 * 60 * 60 * 1000) && customerContext.isReturn
    },
    {
      condition: 'Amount >= €100 AND market in [EU, UK]',
      result: 'Route to Acquirer Instalments',
      model: 'acquirer',
      priority: 4,
      passed: customerContext.amount >= 100 && ['EU', 'UK'].includes(customerContext.market)
    },
    {
      condition: 'Amount <= €1000',
      result: 'Route to Deferred Payment',
      model: 'deferred',
      priority: 5,
      passed: customerContext.amount <= 1000
    },
    {
      condition: 'Default fallback',
      result: 'Route to PSP Instalments',
      model: 'psp',
      priority: 6,
      passed: true
    }
  ]

  const attributes = [
    { label: 'Who funds', value: 'Varies by selected model' },
    { label: 'Credit risk', value: 'Risk distribution based on routing logic' },
    { label: 'Underwriting', value: 'Model-specific underwriting applies' },
    { label: 'Customer cost', value: 'Per selected model terms' },
    { label: 'First payment timing', value: 'Depends on routed model' },
    { label: 'Integration type', value: 'Orchestrator decides redirect vs embedded' },
    { label: 'Data captured', value: 'Contextual data for routing decisions' },
    { label: 'SCA pattern', value: 'Per final model requirements' },
    { label: 'Settlement to Test Airlines', value: 'Per selected model settlement terms' },
    { label: 'Refund handling', value: 'Follows selected model refund rules' },
    { label: 'Chargeback liability', value: 'Per selected model chargeback terms' },
    { label: 'Markets supported', value: 'Union of all model market coverage' },
    { label: 'Dependencies', value: 'All model dependencies + routing logic' }
  ]

  const evaluateRules = () => {
    setEvaluating(true)
    
    // Simulate evaluation time
    setTimeout(() => {
      // Find the highest priority rule that passes
      const selectedRule = routingRules
        .filter(rule => rule.passed)
        .sort((a, b) => a.priority - b.priority)[0]
      
      setSelectedModel(selectedRule.model)
      setEvaluating(false)
      setStep(3)
    }, 2000)
  }

  const getModelName = (model: string) => {
    const names: Record<string, string> = {
      'bnpl': 'BNPL (Partner Financed)',
      'issuer-pre': 'Issuer Instalments (Pre-purchase)',
      'deposit-balance': 'Deposit + Balance',
      'acquirer': 'Acquirer Instalments',
      'deferred': 'Deferred Payment',
      'psp': 'PSP Instalments'
    }
    return names[model] || model
  }

  const paymentMethods = [
    {
      id: 'card',
      name: 'Pay with card',
      description: 'Immediate full payment'
    },
    {
      id: 'smart-instalments',
      name: 'Smart instalments',
      description: 'Let our system find the best instalment option for you',
    }
  ]

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="badge border-violet-200 bg-violet-50 text-violet-700">
            Model: Hybrid orchestrator (rule-based routing)
          </div>
          <div className="badge border-pink-200 bg-pink-50 text-pink-700">
            Smart routing
          </div>
        </div>

        {step <= 2 && <ProgressSteps step={step} onStepClick={(stepNumber) => setStep(stepNumber as 1|2|3)} />}

        {step===1 && (
          <section className="card p-5">
            <h2 className="text-xl font-semibold mb-3">Choose your payment method</h2>
            <PaymentMethodSelector 
              methods={paymentMethods}
              onSelect={(methodId) => {
                if (methodId === 'smart-instalments') {
                  setStep(2)
                }
              }}
            />
          </section>
        )}

        {step===2 && (
          <section className="card p-5">
            <h2 className="text-xl font-semibold mb-3">Smart instalment routing</h2>
            <p className="text-sm text-gray-600 mb-4">
              Our system will analyse your booking and find the best instalment option available to you.
            </p>

            <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 mb-4">
              <div className="text-sm text-violet-800">
                <div className="font-medium mb-2">How smart routing works</div>
                <ul className="space-y-1">
                  <li>• Analyze your market, travel details, and payment method</li>
                  <li>• Check eligibility across all instalment models</li>
                  <li>• Route you to the best available option</li>
                  <li>• Optimize for your lowest cost and best terms</li>
                </ul>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="card p-3 bg-gray-50">
                <div className="text-xs text-gray-600">Your details</div>
                <div className="text-sm mt-1">
                  <div>Market: {customerContext.market}</div>
                  <div>Journey: {customerContext.isReturn ? 'Return' : 'One way'}</div>
                  <div>Amount: €{customerContext.amount}</div>
                </div>
              </div>
              <div className="card p-3 bg-gray-50">
                <div className="text-xs text-gray-600">Available models</div>
                <div className="text-sm mt-1">
                  <div>Checking 6+ options...</div>
                  <div>Finding best match...</div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button className="btn-primary" onClick={evaluateRules}>
                Find my best option
              </button>
            </div>
          </section>
        )}

        {step===3 && (
          <section className="card p-5">
            <h2 className="text-xl font-semibold mb-3">Routing result</h2>
            {selectedModel && (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-green-800 mb-2">
                    <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-sm">✓</span>
                    <div className="font-medium">Best match found</div>
                  </div>
                  <div className="text-lg font-semibold text-green-900 mb-1">
                    {getModelName(selectedModel)}
                  </div>
                  <div className="text-sm text-green-700">
                    This model offers the best terms for your booking and location.
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link 
                    href={`/models/${selectedModel}`}
                    className="btn-primary"
                  >
                    Continue with {getModelName(selectedModel)}
                  </Link>
                  <button 
                    className="btn bg-gray-200 text-gray-700 hover:bg-gray-300"
                    onClick={() => setStep(1)}
                  >
                    Choose different option
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

        {evaluating && (
          <section className="card p-5">
            <div className="text-center">
              <div className="text-lg font-semibold mb-2">Evaluating best options...</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div className="bg-violet-600 h-2 rounded-full animate-pulse w-2/3"></div>
              </div>
              <div className="text-sm text-gray-600">Checking eligibility rules and finding optimal routing</div>
            </div>
          </section>
        )}

        <section className="card p-5">
          <h3 className="text-lg font-semibold mb-3">Routing rules evaluation</h3>
          <div className="space-y-2">
            {routingRules.map((rule, index) => (
              <div key={index} className={`flex items-start gap-3 p-3 rounded-lg ${
                rule.passed ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
              }`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white flex-shrink-0 ${
                  rule.passed ? 'bg-green-500' : 'bg-gray-400'
                }`}>
                  {rule.priority}
                </span>
                <div className="flex-1 text-sm">
                  <div className="font-medium">{rule.condition}</div>
                  <div className={`text-xs mt-1 ${rule.passed ? 'text-green-700' : 'text-gray-600'}`}>
                    → {rule.result}
                  </div>
                </div>
                <div className={`text-xs px-2 py-1 rounded-full ${
                  rule.passed ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                }`}>
                  {rule.passed ? 'PASS' : 'FAIL'}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sequence Diagram */}
        <SequenceDiagram
          title="Hybrid Smart Routing Flow Sequence"
          actors={['Customer', 'Test Airlines', 'Smart Router', 'Provider', 'Bank']}
          steps={[
            {
              from: 'Customer',
              to: 'Test Airlines',
              message: 'Select smart instalment option',
              type: 'request'
            },
            {
              from: 'Test Airlines',
              to: 'Customer',
              message: 'Display smart routing interface',
              note: 'Show intelligent payment option selection',
              type: 'response'
            },
            {
              from: 'Customer',
              to: 'Smart Router',
              message: 'Submit customer profile data',
              note: `Market: ${customerContext.market}, Amount: €${customerContext.amount}, Journey type: ${customerContext.isReturn ? 'Return' : 'One-way'}`,
              type: 'request'
            },
            {
              from: 'Smart Router',
              to: 'Smart Router',
              message: 'Analyze customer profile and context',
              note: 'Evaluate routing rules by priority order',
              type: 'process'
            },
            {
              from: 'Smart Router',
              to: 'Provider',
              message: 'Check provider eligibility',
              note: 'Query multiple providers for availability and terms',
              type: 'request'
            },
            {
              from: 'Provider',
              to: 'Smart Router',
              message: 'Return eligibility and terms',
              note: 'Provider-specific qualification results',
              type: 'response'
            },
            {
              from: 'Smart Router',
              to: 'Smart Router',
              message: 'Select optimal provider',
              note: `Route to ${selectedModel ? getModelName(selectedModel) : 'best available model'}`,
              type: 'process'
            },
            {
              from: 'Smart Router',
              to: 'Test Airlines',
              message: 'Return routing decision',
              note: 'Selected provider and terms',
              type: 'response'
            },
            {
              from: 'Test Airlines',
              to: 'Customer',
              message: 'Display selected instalment option',
              note: 'Present optimised payment plan',
              type: 'response'
            },
            {
              from: 'Customer',
              to: 'Test Airlines',
              message: 'Accept selected payment plan',
              type: 'request'
            },
            {
              from: 'Test Airlines',
              to: 'Provider',
              message: 'Redirect to selected provider',
              note: 'Hand over to chosen payment model',
              type: 'request'
            },
            {
              from: 'Provider',
              to: 'Bank',
              message: 'Process payment via selected model',
              note: 'Execute payment according to model terms',
              type: 'request'
            },
            {
              from: 'Bank',
              to: 'Provider',
              message: 'Payment confirmation',
              type: 'response'
            },
            {
              from: 'Provider',
              to: 'Test Airlines',
              message: 'Settlement and booking confirmation',
              type: 'response'
            }
          ]}
        />

        {/* Airline References */}
        <div className="bg-white rounded-2xl border border-blue-200 p-6">
          <h3 className="text-lg font-semibold mb-4 text-blue-900">✈️ Real Airline References</h3>
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="font-medium text-gray-900 mb-2">Test Airlines</div>
              <div className="text-sm text-gray-600 mb-3">Smart routing system that selects optimal instalment provider based on customer profile and market conditions</div>
              <a href="#" onClick={() => alert("Feature reference - actual implementation would link to payment page")} className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1">
                        View Feature <span className="text-xs">🔗</span>
                      </a>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="font-medium text-gray-900 mb-2">Air Europa</div>
              <div className="text-sm text-gray-600 mb-3">Hybrid payment orchestration platform routing between BNPL providers and bank instalments</div>
              <a href="#" onClick={() => alert("Feature reference - actual implementation would link to payment page")} className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1">
                        View Feature <span className="text-xs">🔗</span>
                      </a>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="font-medium text-gray-900 mb-2">KLM</div>
              <div className="text-sm text-gray-600 mb-3">Intelligent payment routing that dynamically selects between multiple instalment partners</div>
              <a href="#" onClick={() => alert("Feature reference - actual implementation would link to payment page")} className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1">
                        View Feature <span className="text-xs">🔗</span>
                      </a>
            </div>
          </div>
        </div>

        <TermsPanel model="hybrid" />

        <div className="bg-white rounded-2xl border border-gray-200 p-4">
          <h3 className="text-lg font-semibold mb-3">Key Model Attributes</h3>
          <CategorizedAttributesDiagram 
            attributes={attributes} 
            title="Key Attributes"
            modelName="Hybrid Model"
          />
        </div>
      </div>

      <SummaryCard amount={amount} />
    </div>
  )
}