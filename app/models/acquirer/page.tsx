'use client'

import React from 'react'
import { EnhancedNotesSection } from "@/components/EnhancedNotesSection"
import { SequenceDiagram } from '@/components/SequenceDiagram'
import { useState } from 'react'
import { ProgressSteps } from '@/components/ProgressSteps'
import { PlanPicker } from '@/components/PlanPicker'
import { SummaryCard } from '@/components/SummaryCard'
import { TermsPanel } from '@/components/TermsPanel'
import { RulesList } from '@/components/RulesList'
import { CategorizedAttributesDiagram } from '@/components/CategorizedAttributesDiagram'
import { PaymentMethodSelector } from '@/components/PaymentMethodSelector'

export default function AcquirerPage() {
  const amount = 850 // LATAM market USD
  const [step, setStep] = useState<1|2|3|4>(1)
  const [plan, setPlan] = useState<{months:number;mode:'promo0'|'fee2'|'apr149'}|null>(null)
  const [showAcquirerWidget, setShowAcquirerWidget] = useState(false)
  const [result, setResult] = useState<'approved'|'declined'|null>(null)

  // Pre-filled LATAM customer data
  const customerData = {
    name: 'Carlos Rodriguez',
    email: 'carlos.rodriguez@example.com',
    phone: '+55 11 98765-4321',
    address: 'Av. Paulista 1578, São Paulo - SP, 01310-200, Brasil',
    cardNumber: '4242424242424242',
    expiryDate: '12/26',
    cvv: '123'
  }

  const rules = [
    { label: 'LATAM market eligibility (Brazil, Argentina, Chile)', passed: true, required: true },
    { label: 'Minimum basket $100 USD', passed: amount >= 100, required: true },
    { label: 'Maximum basket $10,000 USD', passed: amount <= 10000, required: true },
    { label: 'Up to 20 monthly instalments available', passed: true, required: true },
    { label: 'Amadeus Instalment Engine active', passed: true, required: true },
    { label: 'Card scheme supports instalments', passed: true, required: true },
    { label: 'Local regulations compliance', passed: true, required: true },
    { label: 'Merchant agreement with Amadeus', passed: result === 'approved', required: true },
    { label: 'Configurable business rules applied', passed: result === 'approved', required: true }
  ]

  const attributes = [
    { label: 'BA Gets Money', value: 'Single authorisation + staged captures over time' },
    { label: 'Risk Owner', value: 'Shared - Amadeus bears processing risk, BA bears service risk' },
    { label: 'Complexity', value: 'Medium - requires Amadeus integration and rule configuration' },
    { label: 'Flexibility', value: 'High - configurable business rules and up to 20 instalments' },
    { label: 'Refund Trigger', value: 'Coordinated refunds between Amadeus and BA' },
    { label: 'Ledger Adjustments', value: 'Automated - Amadeus handles capture scheduling' },
    { label: 'Instalment Engine', value: 'Amadeus Instalment Engine with configurable rules' },
    { label: 'Funding Source', value: 'Amadeus provides upfront settlement to BA' },
    { label: 'Customer Experience', value: 'Seamless - embedded in checkout flow' },
    { label: 'Tokenisation/MIT', value: 'Single auth token with multiple staged captures' },
    { label: 'Merchant of Record', value: 'British Airways via Amadeus processing' },
    { label: '3DS/Fraud Handling', value: 'Amadeus handles authentication and fraud screening' },
    { label: 'Additional Fees', value: 'Amadeus processing fees + optional interest to customer' },
    { label: '3RI Support', value: 'Yes - supports 3DS Requestor Initiated transactions' },
    { label: 'Markets Supported', value: 'LATAM focus (Brazil, Argentina, Chile) with expansion capability' },
    { label: 'Business Rules', value: 'Highly configurable via Amadeus engine parameters' }
  ]

  const paymentMethods = [
    {
      id: 'card',
      name: 'Pagar de contado',
      description: 'Pago completo inmediato'
    },
    {
      id: 'instalments',
      name: 'Cuotas Amadeus',
      description: 'Hasta 20 cuotas mensuales con motor configurable'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="badge border-green-200 bg-green-50 text-green-700">
                  Acquirer-Driven Installments
                </div>
                <div className="badge border-purple-200 bg-purple-50 text-purple-700">
                  Amadeus Engine
                </div>
                <div className="badge border-orange-200 bg-orange-50 text-orange-700">
                  LATAM Markets
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Amadeus Instalment Engine</h1>
              <p className="text-gray-600">
                Configurable acquirer-driven instalments with up to 20 monthly payments. Single authorisation with staged captures, powered by Amadeus with flexible business rules for LATAM markets.
              </p>
            </div>

            <ProgressSteps step={step} onStepClick={(stepNumber) => setStep(stepNumber as 1|2|3|4)} />

            {step === 1 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-4">Elige tu método de pago</h2>
                <PaymentMethodSelector 
                  methods={paymentMethods}
                  onSelect={(methodId) => {
                    if (methodId === 'instalments') {
                      setStep(2)
                    }
                  }}
                />
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-4">Planes de cuotas Amadeus</h2>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                  <div className="text-sm text-green-800">
                    <div className="font-medium mb-2">Motor de Cuotas Amadeus</div>
                    <ul className="space-y-1 text-green-700">
                      <li>• Hasta 20 cuotas mensuales disponibles</li>
                      <li>• Reglas de negocio configurables por mercado</li>
                      <li>• Autorización única + capturas programadas</li>
                      <li>• Protección antifraude integrada</li>
                      <li>• Procesamiento optimizado para LATAM</li>
                    </ul>
                  </div>
                </div>
                <PlanPicker amount={amount} onSelect={(p) => { setPlan(p); setShowAcquirerWidget(true) }} />
              </div>
            )}

            {step === 3 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-4">Configuración del plan</h2>
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <div className="text-sm text-gray-700">
                    <div className="font-medium text-gray-900 mb-2">Datos del cliente (pre-completados)</div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <div>Nombre: {customerData.name}</div>
                        <div>Email: {customerData.email}</div>
                        <div>Teléfono: {customerData.phone}</div>
                      </div>
                      <div>
                        <div>Tarjeta: **** **** **** 4242</div>
                        <div>Vencimiento: {customerData.expiryDate}</div>
                        <div>Tipo: Visa Internacional</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {plan && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                    <div className="text-sm text-blue-800">
                      <div className="font-medium mb-1">Plan de cuotas Amadeus</div>
                      <div>Duración: {plan.months} cuotas mensuales</div>
                      <div>Pago mensual: ${(amount/plan.months).toFixed(2)} USD</div>
                      <div>Total: ${amount.toFixed(2)} USD {plan.mode !== 'promo0' && '+ tasas'}</div>
                      <div className="text-xs mt-2 text-blue-600">
                        Procesado vía Motor de Cuotas Amadeus con reglas configurables
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end">
                  <button 
                    className="bg-red-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-red-700 transition-colors"
                    onClick={() => {
                      setResult('approved')
                      setStep(4)
                    }}
                  >
                    Confirmar Plan Amadeus
                  </button>
                </div>
              </div>
            )}

            {step === 4 && result === 'approved' && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="flex items-center gap-2 text-green-600 mb-4">
                  <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-sm">✓</span>
                  <h2 className="text-xl font-semibold">Plan Amadeus Activado</h2>
                </div>
                <div className="space-y-4 text-sm">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="font-medium text-green-800 mb-2">Configuración confirmada</div>
                    <div className="text-green-700">
                      {plan && (
                        <div className="space-y-1">
                          <div>Motor: Amadeus Instalment Engine</div>
                          <div>Plan: {plan.months} cuotas de ${(amount/plan.months).toFixed(2)} USD</div>
                          <div>Primera captura: Hoy</div>
                          <div>Siguientes capturas: Mensual automático</div>
                          <div>Total: ${amount.toFixed(2)} USD</div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="font-medium text-blue-800 mb-2">Gestión Amadeus</div>
                    <ul className="text-blue-700 space-y-1">
                      <li>• Amadeus maneja programación automática de capturas</li>
                      <li>• BA recibe liquidación según cronograma configurado</li>
                      <li>• Reglas de negocio aplicadas por mercado LATAM</li>
                      <li>• Resolución de disputas vía red adquirente</li>
                      <li>• Notificaciones por cada captura procesada</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Airline References */}
            <div className="bg-white rounded-2xl border border-blue-200 p-6">
              <h3 className="text-lg font-semibold mb-4 text-blue-900">✈️ Real Airline References</h3>
              <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="font-medium text-gray-900 mb-2">Turkish Airlines</div>
                  <div className="text-sm text-gray-600 mb-3">Acquirer-driven instalments via Amadeus payment platform for global bookings</div>
                  <a href="#" onClick={() => alert('Feature reference - actual implementation would link to payment page')} className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1">
                        View Feature <span className="text-xs">🔗</span>
                      </a>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="font-medium text-gray-900 mb-2">Qatar Airways</div>
                  <div className="text-sm text-gray-600 mb-3">Bank partnership instalments through acquirer for premium cabin bookings</div>
                  <a href="#" onClick={() => alert('Feature reference - actual implementation would link to payment page')} className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1">
                        View Feature <span className="text-xs">🔗</span>
                      </a>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <TermsPanel model="acquirer" />

            {/* Business Rules */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Reglas de negocio y elegibilidad</h3>
              <RulesList rules={rules} />
            </div>


            {/* Sequence Diagram */}
            <SequenceDiagram
              title="Flujo de pagos (Secuencia)"
              actors={['Customer', 'BA', 'Amadeus', 'Bank']}
              steps={[
                {
                  from: 'Customer',
                  to: 'BA',
                  message: 'Seleccionar plan de cuotas',
                  type: 'request'
                },
                {
                  from: 'BA',
                  to: 'Amadeus',
                  message: 'Configurar motor de cuotas',
                  note: 'Amadeus instalment engine processing',
                  type: 'request'
                },
                {
                  from: 'Amadeus',
                  to: 'Customer',
                  message: 'Mostrar opciones disponibles (hasta 20 cuotas)',
                  note: 'Configurable business rules applied',
                  type: 'response'
                },
                {
                  from: 'Customer',
                  to: 'Amadeus',
                  message: 'Seleccionar plan y completar datos',
                  type: 'request'
                },
                {
                  from: 'Amadeus',
                  to: 'Bank',
                  message: `Autorizar monto total ($${amount})`,
                  note: 'Single authorisation with staged captures',
                  type: 'request'
                },
                {
                  from: 'Bank',
                  to: 'Amadeus',
                  message: 'Autorización aprobada',
                  type: 'response'
                },
                {
                  from: 'Amadeus',
                  to: 'BA',
                  message: 'Liquidación y configuración activa',
                  note: 'BA receives upfront settlement',
                  type: 'response'
                },
                {
                  from: 'BA',
                  to: 'Customer',
                  message: 'Confirmación de reserva',
                  type: 'response'
                },
                {
                  from: 'Amadeus',
                  to: 'Bank',
                  message: `Captura mensual ($${plan ? (amount/plan.months).toFixed(2) : 'XX'})`,
                  note: 'Monthly capture cycle - automated by Amadeus',
                  type: 'request'
                },
                {
                  from: 'Bank',
                  to: 'Amadeus',
                  message: 'Captura aprobada',
                  type: 'response'
                },
                {
                  from: 'Amadeus',
                  to: 'BA',
                  message: 'Notificación de pago procesado',
                  note: 'Settlement notification to BA',
                  type: 'response'
                }
              ]}
            />
            
            {/* Smart Notes Section */}
            <EnhancedNotesSection modelContext="Acquirer-Driven" />
          </div>

          {/* Right Sidebar - LATAM market data */}
          <div className="lg:sticky lg:top-8 lg:self-start space-y-6">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
              <h2 className="text-lg font-semibold mb-3">Detalhes do voo</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Rota:</span>
                  <span className="font-medium">GRU → EZE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tipo:</span>
                  <span className="font-medium">Ida e volta</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Passageiros:</span>
                  <span className="font-medium">1 Adulto, Econômica</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Valor:</span>
                  <span className="font-medium">${amount.toFixed(2)} USD</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                <div className="text-xs text-amber-700">
                  <div className="font-medium">⚠️ Simulação</div>
                  <div className="mt-1">Não processa pagamentos reais</div>
                </div>
              </div>
            </div>
            
            {/* Key Model Attributes */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4">
              <h3 className="text-lg font-semibold mb-3">Key Model Attributes</h3>
              <CategorizedAttributesDiagram 
                attributes={attributes} 
                title="Key Attributes"
                modelName="Amadeus Engine"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Amadeus Processing Modal */}
      {showAcquirerWidget && (
        <div className="fixed inset-0 bg-black/30 grid place-items-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <div className="text-lg font-semibold mb-2">Procesando con Amadeus...</div>
            <div className="text-sm text-gray-600 mb-4">Configurando Motor de Cuotas y reglas de negocio</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full animate-pulse w-3/4"></div>
            </div>
            <div className="text-xs text-gray-500 mt-2">Aplicando reglas configurables para mercado LATAM</div>
            <div className="flex justify-end mt-4">
              <button 
                className="text-sm text-green-600 hover:text-green-700"
                onClick={() => {
                  setShowAcquirerWidget(false)
                  setStep(3)
                }}
              >
                Simular configuración →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}