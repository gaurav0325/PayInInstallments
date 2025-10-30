export const isDNI = (v: string) => /^[0-9]{8}[A-Z]$/.test(v.trim().toUpperCase())
export const isNIE = (v: string) => /^[XYZ][0-9]{7}[A-Z]$/.test(v.trim().toUpperCase())
export const isEsMobile = (v: string) => /^\+?34?\s?([67][0-9]{8})$/.test(v.replace(/\s/g, ''))
export const isPan16 = (v: string) => /^[0-9]{16}$/.test(v.replace(/\s/g, ''))
export const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
export const isUkMobile = (v: string) => /^\+?44\s?[0-9]{10,11}$/.test(v.replace(/\s/g, ''))

export function maskPan(pan: string): string {
  if (pan.length < 4) return pan
  return pan.slice(0, 4) + '*'.repeat(pan.length - 8) + pan.slice(-4)
}

export function formatCurrency(amount: number, currency: string = 'EUR'): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency
  }).format(amount)
}