'use client'
import { EnhancedNotesSection } from "@/components/EnhancedNotesSection"
import { SequenceDiagram } from '@/components/SequenceDiagram'
import { useState } from 'react'
import { ProgressSteps } from '@/components/ProgressSteps'
import { PlanPicker } from '@/components/PlanPicker'
import { IdentityForm } from '@/components/IdentityForm'
import { CardForm } from '@/components/CardForm'
import { SummaryCard } from '@/components/SummaryCard'
import { ProviderRedirect } from '@/components/ProviderRedirect'
import { TermsPanel } from '@/components/TermsPanel'
import { RulesList } from '@/components/RulesList'
import { CategorizedAttributesDiagram } from '@/components/CategorizedAttributesDiagram'
import { PaymentMethodSelector } from '@/components/PaymentMethodSelector'

export default function EmbeddedBNPLPage() {
  const amount = 180 // Spain EUR
  const [step, setStep] = useState<1|2|3|4>(1)
  const [plan, setPlan] = useState<{months:number;mode:'promo0'|'fee2'|'apr149'}|null>(null)
  const [showRedirect, setShowRedirect] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState('')
  const [result, setResult] = useState<'approved'|'declined'|null>(null)

  // Pre-filled Spanish customer data
  const customerData = {
    name: 'Luis García',
    email: 'luis.garcia@example.com',
    phone: '+34 600 123 456',
    address: 'Calle Gran Vía 123, Madrid 28013',
    dni: '12345678Z',
    cardNumber: '4242424242424242',
    expiryDate: '12/26',
    cvv: '123'
  }

  // Financing providers based on Iberia implementation
  const providers = [
    { id: 'sequra', name: 'SeQura', description: '0% APR for 3-6 months' },
    { id: 'aplazame', name: 'Aplazame', description: 'Flexible terms up to 12 months' },
    { id: 'floa', name: 'FLOA', description: 'Quick approval process' },
  ]

  const rules = [
    { label: 'Spain residents only (DNI/NIE required)', passed: true, required: true },
    { label: 'Return flight journey', passed: true, required: true },
    { label: 'Minimum purchase €45', passed: amount >= 45, required: true },
    { label: 'Visa or MasterCard issued in Spain', passed: true, required: true },
    { label: 'Applicant is passenger on booking', passed: true, required: true },
    { label: 'Financing partner availability', passed: true, required: true },
    { label: 'Credit assessment passed', passed: result === 'approved', required: true },
    { label: 'Iberia Cards orchestration active', passed: true, required: true }
  ]

  const attributes = [
    { label: 'BA Gets Money', value: 'Upfront from financing partner (minus fees)' },
    { label: 'Risk Owner', value: 'Financing partner (SeQura, Aplazame, FLOA)' },
    { label: 'Complexity', value: 'Medium - requires multi-provider orchestration' },
    { label: 'Flexibility', value: 'High - multiple providers and terms available' },
    { label: 'Refund Trigger', value: 'Financing partner manages refunds and adjustments' },
    { label: 'Ledger Adjustments', value: 'Simple - BA receives net amount upfront' },
    { label: 'Instalment Engine', value: 'Iberia Cards subsidiary orchestration' },
    { label: 'Funding Source', value: 'Multi-provider financing (SeQura, Aplazame, FLOA)' },
    { label: 'Customer Experience', value: 'Embedded - appears as BA service' },
    { label: 'Tokenisation/MIT', value: 'Managed by financing partner' },
    { label: 'Merchant of Record', value: 'British Airways (via Iberia Cards)' },
    { label: '3DS/Fraud Handling', value: 'Financing partner handles all authentication' },
    { label: 'Additional Fees', value: 'Revenue share with financing partners' },
    { label: '3RI Support', value: 'Per financing partner capabilities' }
  ]

  const paymentMethods = [
    {
      id: 'card',
      name: 'Pagar con tarjeta',
      description: 'Pago completo inmediato'
    },
    {
      id: 'instalments',
      name: 'Pagar a plazos',
      description: 'Financiación por proveedores integrados (SeQura, Aplazame, FLOA)'
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
                <div className="badge border-red-200 bg-red-50 text-red-700">
                  Merchant-Embedded BNPL
                </div>
                <div className="badge border-yellow-200 bg-yellow-50 text-yellow-700">
                  Spain Only
                </div>
                <div className="badge border-blue-200 bg-blue-50 text-blue-700">
                  Internal Reference
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Iberia Cards BNPL Orchestration</h1>
              <p className="text-gray-600">
                Strategic BNPL implementation via Iberia Cards subsidiary with multi-provider financing (SeQura, Aplazame, FLOA). 
                Maintains revenue share and loyalty integration while providing flexible financing options.
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
                <h2 className="text-xl font-semibold mb-4">Selecciona tu plan de financiación</h2>
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                  <div className="text-sm text-red-800">
                    <div className="font-medium mb-2">Financiación vía Iberia Cards</div>
                    <ul className="space-y-1 text-red-700">
                      <li>• Múltiples proveedores de financiación disponibles</li>
                      <li>• Proceso de aprobación rápido y seguro</li>
                      <li>• Sin costes ocultos, términos transparentes</li>
                      <li>• Integración con programa de fidelización</li>
                    </ul>
                  </div>
                </div>
                <PlanPicker amount={amount} onSelect={(p) => { setPlan(p); setStep(3) }} />
              </div>
            )}

            {step === 3 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-4">Verificación de identidad</h2>
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
                        <div>DNI: {customerData.dni}</div>
                        <div>Tarjeta: **** **** **** 4242</div>
                        <div>
                          Type: Visa Spain
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Provider Selection */}
                <div className="mb-6">
                  <div className="font-medium text-gray-900 mb-3">Seleccionar proveedor de financiación</div>
                  <div className="grid gap-3">
                    {providers.map((provider) => (
                      <label key={provider.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer">
                        <input 
                          type="radio" 
                          name="provider" 
                          value={provider.id}
                          defaultChecked={provider.id === 'sequra'}
                          onChange={(e) => setSelectedProvider(e.target.value)}
                        />
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{provider.name}</div>
                          <div className="text-sm text-gray-600">{provider.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                  <div className="text-sm text-amber-800">
                    <div className="font-medium mb-1">
                      Provider Redirect
                    </div>
                    <div>
                      You will be redirected to {selectedProvider || 'SeQura'} to complete the credit assessment and first payment.
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button 
                    className="bg-red-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-red-700 transition-colors"
                    onClick={() => {
                      setShowRedirect(true)
                    }}
                  >
                    Continue with {selectedProvider || 'SeQura'}
                  </button>
                </div>
              </div>
            )}

            {step === 4 && result === 'approved' && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="flex items-center gap-2 text-green-600 mb-4">
                  <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-sm">✓</span>
                  <h2 className="text-xl font-semibold">
                    Financing Approved
                  </h2>
                </div>
                <div className="space-y-4 text-sm">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="font-medium text-green-800 mb-2">
                      Financing plan confirmed
                    </div>
                    <div className="text-green-700">
                      {plan && (
                        <div className="space-y-1">
                          <div>
                            Provider: {selectedProvider || 'SeQura'}
                          </div>
                          <div>
                            Plan: {plan.months} months
                          </div>
                          <div>
                            First payment: €{(amount/plan.months).toFixed(2)}
                          </div>
                          <div>
                            Remaining payments: €{(amount/plan.months).toFixed(2)} monthly
                          </div>
                          <div>Total: €{amount.toFixed(2)}</div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="font-medium text-blue-800 mb-2">Gestión vía Iberia Cards</div>
                    <ul className="text-blue-700 space-y-1">
                      <li>• Puntos de fidelización aplicados a tu cuenta</li>
                      <li>• Gestión integrada desde tu perfil de BA</li>
                      <li>• Soporte al cliente vía canales de BA</li>
                      <li>• Notificaciones por email y app</li>
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
                  <div className="font-medium text-gray-900 mb-2">Iberia</div>
                  <div className="text-sm text-gray-600 mb-3">Embedded BNPL with SeQura, Aplazame, and FLOA for Spanish domestic flights</div>
                  <a href="https://www.iberia.com/es/vuelos/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1">
                    Visit Booking Page <span className="text-xs">🔗</span>
                  </a>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="font-medium text-gray-900 mb-2">Vueling</div>
                  <div className="text-sm text-gray-600 mb-3">Partnership with local Spanish financing providers for flexible travel payment plans</div>
                  <a href="https://www.vueling.com/es/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1">
                    Visit Booking Page <span className="text-xs">🔗</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <TermsPanel model="embedded-bnpl" />

            {/* Business Rules */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Reglas de negocio y elegibilidad</h3>
              <RulesList rules={rules} />
            </div>


            {/* Sequence Diagram */}
            <SequenceDiagram
              title="Flujo de pagos (Secuencia)"
              actors={['Customer', 'BA', 'Iberia Cards', 'Provider', 'Bank']}
              steps={[
                {
                  from: 'Customer',
                  to: 'BA',
                  message: 'Seleccionar pago a plazos',
                  type: 'request'
                },
                {
                  from: 'BA',
                  to: 'Iberia Cards',
                  message: 'Orchestrate BNPL options',
                  note: 'Multi-provider orchestration via Iberia Cards',
                  type: 'request'
                },
                {
                  from: 'Iberia Cards',
                  to: 'Customer',
                  message: 'Display provider options',
                  note: 'SeQura, Aplazame, FLOA options presented',
                  type: 'response'
                },
                {
                  from: 'Customer',
                  to: 'Iberia Cards',
                  message: 'Select financing partner',
                  type: 'request'
                },
                {
                  from: 'Iberia Cards',
                  to: 'Provider',
                  message: 'Redirect to SeQura/Aplazame/FLOA',
                  note: 'Embedded experience maintains BA branding',
                  type: 'request'
                },
                {
                  from: 'Provider',
                  to: 'Customer',
                  message: 'Credit assessment & terms',
                  type: 'response'
                },
                {
                  from: 'Customer',
                  to: 'Provider',
                  message: 'Complete application & first payment',
                  type: 'request'
                },
                {
                  from: 'Provider',
                  to: 'Iberia Cards',
                  message: 'Approval & payment confirmation',
                  note: 'BNPL provider approval and settlement',
                  type: 'response'
                },
                {
                  from: 'Iberia Cards',
                  to: 'BA',
                  message: 'Settlement (full amount minus fees)',
                  note: 'BA receives net payment upfront',
                  type: 'response'
                },
                {
                  from: 'BA',
                  to: 'Customer',
                  message: 'Booking confirmation',
                  type: 'response'
                },
                {
                  from: 'Provider',
                  to: 'Customer',
                  message: 'Financing schedule active',
                  note: 'Monthly cycle managed by financing partner',
                  type: 'process'
                }
              ]}
            />
            
            {/* Smart Notes Section */}
            <EnhancedNotesSection modelContext="Merchant-Embedded BNPL" />
          </div>

          {/* Right Sidebar - Spanish market data */}
          <div className="lg:sticky lg:top-8 lg:self-start space-y-6">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
              <h2 className="text-lg font-semibold mb-3">Detalles del vuelo</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Ruta:</span>
                  <span className="font-medium">MAD → BCN</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tipo:</span>
                  <span className="font-medium">Ida y vuelta</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pasajeros:</span>
                  <span className="font-medium">1 Adulto, Turista</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Importe:</span>
                  <span className="font-medium">€{amount.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                <div className="text-xs text-amber-700">
                  <div className="font-medium">⚠️ Simulación</div>
                  <div className="mt-1">No se procesan pagos reales</div>
                </div>
              </div>
            </div>
            
            {/* Key Attributes moved to sidebar */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4">
              <h3 className="text-lg font-semibold mb-3">Key Model Attributes</h3>
              <CategorizedAttributesDiagram 
                attributes={attributes} 
                title="Key Attributes"
                modelName="Embedded BNPL"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Provider Redirect Modal */}
      {showRedirect && (
        <ProviderRedirect
          providerName={selectedProvider || 'SeQura'}
          onComplete={(r) => {
            setShowRedirect(false)
            setResult(r)
            setStep(4)
          }}
        />
      )}

    </div>
  )
}