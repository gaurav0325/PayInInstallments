'use client'

import { motion } from 'framer-motion'

interface SequenceStep {
  from: string
  to: string
  message: string
  note?: string
  type?: 'request' | 'response' | 'process'
}

interface SequenceDiagramProps {
  title: string
  actors: string[]
  steps: SequenceStep[]
}

export function SequenceDiagram({ title, actors, steps }: SequenceDiagramProps) {
  const getActorColor = (actor: string) => {
    const colorMap: { [key: string]: string } = {
      'Customer': 'bg-blue-100 text-blue-800 border-blue-200',
      'Test Airlines': 'bg-red-100 text-red-800 border-red-200',
      'Test Airlines': 'bg-red-100 text-red-800 border-red-200',
      'Test Airlines Holidays': 'bg-red-100 text-red-800 border-red-200',
      'Acquirer': 'bg-green-100 text-green-800 border-green-200',
      'Bank': 'bg-gray-100 text-gray-800 border-gray-200',
      'Provider': 'bg-purple-100 text-purple-800 border-purple-200',
      'BNPL Partner': 'bg-purple-100 text-purple-800 border-purple-200',
      'Klarna': 'bg-pink-100 text-pink-800 border-pink-200',
      'SeQura': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'Amadeus': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'OpenJaw': 'bg-teal-100 text-teal-800 border-teal-200',
      'PSP': 'bg-orange-100 text-orange-800 border-orange-200'
    }
    return colorMap[actor] || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  const getArrowType = (type?: string) => {
    switch (type) {
      case 'request':
        return '→'
      case 'response':
        return '←'
      case 'process':
        return '⟷'
      default:
        return '→'
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold mb-6">{title}</h3>
      
      {/* Actor Headers */}
      <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: `repeat(${actors.length}, 1fr)` }}>
        {actors.map((actor, index) => (
          <motion.div
            key={actor}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`text-center p-3 rounded-xl border-2 font-semibold ${getActorColor(actor)}`}
          >
            {actor}
          </motion.div>
        ))}
      </div>

      {/* Sequence Steps */}
      <div className="space-y-4">
        {steps.map((step, stepIndex) => {
          const fromIndex = actors.indexOf(step.from)
          const toIndex = actors.indexOf(step.to)
          const isRightDirection = fromIndex < toIndex
          
          return (
            <motion.div
              key={stepIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: stepIndex * 0.15 }}
              className="relative"
            >
              {/* Actor columns background */}
              <div className="grid gap-4 relative" style={{ gridTemplateColumns: `repeat(${actors.length}, 1fr)` }}>
                {actors.map((actor, actorIndex) => (
                  <div key={actorIndex} className="h-16 flex items-center justify-center relative">
                    {/* Vertical line for each actor */}
                    <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gray-200"></div>
                    
                    {/* Show message box if this actor is involved */}
                    {(actorIndex === fromIndex || actorIndex === toIndex) && (
                      <div className={`relative z-10 px-3 py-2 rounded-lg border text-sm font-medium ${
                        actorIndex === fromIndex ? getActorColor(step.from) : getActorColor(step.to)
                      }`}>
                        {actorIndex === fromIndex ? 'Sends' : 'Receives'}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Arrow and message */}
              <div className="absolute top-1/2 transform -translate-y-1/2 w-full pointer-events-none">
                <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${actors.length}, 1fr)` }}>
                  {actors.map((actor, actorIndex) => {
                    const isInRange = isRightDirection 
                      ? actorIndex >= fromIndex && actorIndex <= toIndex
                      : actorIndex >= toIndex && actorIndex <= fromIndex
                    
                    if (!isInRange) return <div key={actorIndex}></div>
                    
                    const isStart = actorIndex === fromIndex
                    const isEnd = actorIndex === toIndex
                    const isMiddle = !isStart && !isEnd
                    
                    return (
                      <div key={actorIndex} className="flex items-center justify-center relative h-8">
                        {isStart && (
                          <div className={`absolute ${isRightDirection ? 'right-0' : 'left-0'} bg-white px-2 py-1 rounded border shadow-sm text-xs font-medium z-10`}>
                            {getArrowType(step.type)}
                          </div>
                        )}
                        {isMiddle && (
                          <div className="w-full h-0.5 bg-blue-300"></div>
                        )}
                        {isEnd && (
                          <div className={`absolute ${isRightDirection ? 'left-0' : 'right-0'} bg-white px-2 py-1 rounded border shadow-sm text-xs font-medium z-10`}>
                            ⦁
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Message text */}
              <div className="mt-2 text-center">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
                  <div className="font-semibold text-blue-900">{step.message}</div>
                  {step.note && (
                    <div className="text-blue-700 text-xs mt-1">{step.note}</div>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="text-xs text-gray-600 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono">→</span>
            <span>Request</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono">←</span>
            <span>Response</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono">⟷</span>
            <span>Process</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono">⦁</span>
            <span>Endpoint</span>
          </div>
        </div>
      </div>
    </div>
  )
}