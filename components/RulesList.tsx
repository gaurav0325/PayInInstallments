interface Rule {
  label: string
  passed: boolean
  required: boolean
}

export function RulesList({ rules }: { rules: Rule[] }) {
  return (
    <ul className="space-y-2">
      {rules.map((rule, index) => (
        <li key={index} className="flex items-center gap-2 text-sm">
          <span className={`w-4 h-4 rounded-full flex items-center justify-center text-xs text-white ${
            rule.passed ? 'bg-green-500' : rule.required ? 'bg-red-500' : 'bg-gray-400'
          }`}>
            {rule.passed ? '✓' : rule.required ? '✗' : '?'}
          </span>
          <span className={rule.passed ? 'text-gray-700' : rule.required ? 'text-red-600' : 'text-gray-500'}>
            {rule.label}
          </span>
          {rule.required && !rule.passed && (
            <span className="text-xs text-red-500 font-medium">Required</span>
          )}
        </li>
      ))}
    </ul>
  )
}