import { Basket, Customer, ModelKey } from './types'

export interface EligibilityResult {
  eligible: boolean
  reasons: string[]
  requiredFields: string[]
}

export function checkEligibility(
  model: ModelKey, 
  basket: Basket, 
  customer?: Customer
): EligibilityResult {
  const reasons: string[] = []
  const requiredFields: string[] = []
  let eligible = true

  // Common checks
  if (basket.total < 45) {
    eligible = false
    reasons.push('Minimum basket value is €45')
  }

  // Model-specific checks
  switch (model) {
    case 'bnpl':
      if (basket.market !== 'ES') {
        eligible = false
        reasons.push('SeQura/Klarna/Aplazame only available in Spain market')
      }
      if (!basket.isReturn) {
        eligible = false
        reasons.push('Return journey required for BNPL credit assessment')
      }
      if (basket.total < 50) {
        eligible = false
        reasons.push('BNPL minimum €50 for credit worthiness')
      }
      if (!customer?.idType || !['DNI', 'NIE'].includes(customer.idType)) {
        requiredFields.push('Spanish ID (DNI/NIE) required for credit check')
      }
      if (!customer?.phone) {
        requiredFields.push('Spanish mobile number for SMS verification')
      }
      if (customer?.residency !== 'ES') {
        eligible = false
        reasons.push('Spanish residency required for BNPL providers')
      }
      break

    case 'psp':
      if (!customer?.email) {
        requiredFields.push('email for payment schedule notifications')
      }
      if (basket.market !== 'EU' && basket.market !== 'UK' && basket.market !== 'ES') {
        eligible = false
        reasons.push('CyberSource/Adyen PSP scheduling limited to EU/UK markets')
      }
      if (basket.total < 60) {
        eligible = false
        reasons.push('PSP instalment minimum €60 for tokenization costs')
      }
      break

    case 'merchant':
      if (!customer?.email) {
        requiredFields.push('email for Test Airlines Holidays account management')
      }
      if (basket.total > 2000) {
        eligible = false
        reasons.push('Test Airlines Holidays instalment maximum €2000 for risk management')
      }
      break

    case 'acquirer':
      if (basket.market === 'ES' && basket.total < 100) {
        eligible = false
        reasons.push('Amadeus acquirer minimum €100 for Spain market')
      }
      if (basket.market !== 'EU' && basket.market !== 'UK' && basket.market !== 'ES') {
        eligible = false
        reasons.push('Amadeus acquirer service limited to EU/UK markets')
      }
      if (basket.total > 5000) {
        eligible = false
        reasons.push('Amadeus acquirer maximum €5000 per transaction')
      }
      break

    case 'issuer-pre':
      if (!customer?.email) {
        requiredFields.push('email for bank notifications')
      }
      if (basket.market !== 'ES') {
        eligible = false
        reasons.push('Spanish bank partnerships (BBVA, Santander) ES market only')
      }
      if (basket.total < 75) {
        eligible = false
        reasons.push('Spanish banks minimum €75 for instalment products')
      }
      break

    case 'issuer-post':
      if (!customer?.email) {
        requiredFields.push('email for information purposes')
      }
      // No market restrictions for informational banner
      break

    case 'deferred':
      if (basket.total > 1000) {
        eligible = false
        reasons.push('Maximum €1000 for deferred payments (risk management)')
      }
      if (basket.total < 100) {
        eligible = false
        reasons.push('Minimum €100 for deferred payments (processing costs)')
      }
      if (!customer?.email) {
        requiredFields.push('email for payment reminder system')
      }
      break

    case 'deposit-balance':
      if (!basket.isReturn) {
        eligible = false
        reasons.push('Return journey required for travel-aligned payments')
      }
      if (basket.total < 200) {
        eligible = false
        reasons.push('Minimum €200 for meaningful deposit+balance split')
      }
      if (!customer?.email) {
        requiredFields.push('email for pre-travel balance reminders')
      }
      break
  }

  if (requiredFields.length > 0) {
    eligible = false
  }

  return { eligible, reasons, requiredFields }
}