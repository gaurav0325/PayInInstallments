export interface Basket { 
  currency: string; 
  total: number; 
  isReturn: boolean; 
  market: 'ES'|'UK'|'EU'; 
}

export interface FlightSummary { 
  from: string; 
  to: string; 
  depart: string; 
  return?: string; 
  pax: number; 
  cabin: 'Economy'|'Premium'|'Business'; 
}

export interface Customer { 
  name: string; 
  email: string; 
  phone?: string; 
  residency?: 'ES'|'UK'|'Other'; 
  idType?: 'DNI'|'NIE'|'None'; 
  idValue?: string; 
}

export interface PlanQuote { 
  months: number; 
  apr?: number; 
  feePct?: number; 
  firstPayment: number; 
  monthly: number; 
  totalToPay: number; 
}

export type PaymentState = 'START'|'ELIGIBILITY'|'PLAN_PICK'|'IDENTITY'|'PAYMENT_METHOD'|'AUTH'|'3DS'|'PROVIDER'|'RESULT';

export type ModelKey = 'bnpl'|'psp'|'merchant'|'acquirer'|'issuer-pre'|'issuer-post'|'deferred'|'deposit-balance'|'hybrid';