export function ProgressSteps({ step, onStepClick }: { 
  step: 1|2|3|4|5|6
  onStepClick?: (stepNumber: 1|2|3|4|5|6) => void 
}) {
  const items = ['Select plan','Details and verification','Payment and 3D Secure','Confirmation']
  
  return (
    <ol className="flex items-center gap-2 text-sm text-gray-600">
      {items.map((t,i)=> {
        const stepNumber = (i+1) as 1|2|3|4|5|6
        const isCurrentOrPast = stepNumber <= step
        const isClickable = onStepClick && stepNumber < step && stepNumber < 4 // Can click previous steps, but not final confirmation
        
        return (
          <li key={t} className="flex items-center gap-2">
            <span 
              className={`w-6 h-6 flex items-center justify-center rounded-full text-white transition-colors ${
                isCurrentOrPast ? 'bg-red-600' : 'bg-gray-300'
              } ${
                isClickable ? 'cursor-pointer hover:bg-red-700' : ''
              }`}
              onClick={isClickable ? () => onStepClick(stepNumber) : undefined}
            >
              {stepNumber}
            </span>
            <span className={`${isCurrentOrPast?'text-gray-900':'text-gray-400'}`}>{t}</span>
            {i<items.length-1 && <span className="mx-2">›</span>}
          </li>
        )
      })}
    </ol>
  )
}