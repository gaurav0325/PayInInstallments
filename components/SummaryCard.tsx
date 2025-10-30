export function SummaryCard({ amount=180 }: { amount?: number }){
  return (
    <aside className="card p-4">
      <div className="text-lg font-semibold">Your purchase summary</div>
      <div className="mt-2 text-sm text-gray-600 flex items-center justify-between"><span>Madrid MAD → Palma PMI</span><span>Return</span></div>
      <div className="mt-2 text-sm text-gray-500">Outbound: 15 Sept 2024</div>
      <div className="text-sm text-gray-500">Return: 22 Sept 2024</div>
      <div className="text-sm text-gray-500">1 Adult, Economy</div>
      <hr className="my-3"/>
      <div className="flex items-center justify-between"><span>Ticket amount</span><strong>€{amount.toFixed(2)}</strong></div>
      <div className="text-xs text-gray-500 mt-2">This is a simulation. No real payment is taken.</div>
    </aside>
  )
}