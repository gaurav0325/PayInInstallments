export function calcTotals(amount: number, months: number, mode: 'promo0'|'fee2'|'apr149') {
  let total = amount
  if (mode === 'fee2') total = amount * 1.02
  if (mode === 'apr149') total = amount * (1 + 0.149 * (months / 12))
  const monthly = total / months
  return {
    totalToPay: +total.toFixed(2),
    monthly: +monthly.toFixed(2),
    firstPayment: +monthly.toFixed(2)
  }
}

export function calcDepositBalance(amount: number, depositPercent: number = 20) {
  const deposit = amount * (depositPercent / 100)
  const balance = amount - deposit
  return {
    deposit: +deposit.toFixed(2),
    balance: +balance.toFixed(2),
    total: amount
  }
}

export function calcDeferredSchedule(amount: number, deferDays: number = 30) {
  const dueDate = new Date()
  dueDate.setDate(dueDate.getDate() + deferDays)
  return {
    amount,
    dueDate: dueDate.toISOString().split('T')[0],
    daysDeferred: deferDays
  }
}