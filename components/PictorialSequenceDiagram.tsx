'use client'

import { motion } from 'framer-motion'

interface SequenceStep {
  from: string
  to: string
  action: string
  delay?: number
}

interface PictorialSequenceDiagramProps {
  title: string
  steps: SequenceStep[]
  actors: { [key: string]: { name: string; icon: string; color: string } }
}

export function PictorialSequenceDiagram({ title, steps, actors }: PictorialSequenceDiagramProps) {
  const actorKeys = Object.keys(actors)

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      
      {/* Actors Row */}
      <div className="flex justify-between items-center mb-8 px-4">
        {actorKeys.map((actorKey) => (
          <motion.div
            key={actorKey}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className={`w-12 h-12 rounded-full ${actors[actorKey].color} flex items-center justify-center text-white text-lg font-bold shadow-lg`}>
              {actors[actorKey].icon}
            </div>
            <div className="text-xs font-medium text-gray-700 mt-2 text-center max-w-20">
              {actors[actorKey].name}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Sequence Steps */}
      <div className="space-y-6">
        {steps.map((step, index) => {
          const fromIndex = actorKeys.indexOf(step.from)
          const toIndex = actorKeys.indexOf(step.to)
          const isReverse = fromIndex > toIndex
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (step.delay || index) * 0.3 + 0.5 }}
              className="relative"
            >
              {/* Arrow Container */}
              <div className="flex items-center justify-between px-4 mb-2">
                {/* Spacer divs to position arrow correctly */}
                {Array.from({ length: actorKeys.length }).map((_, i) => (
                  <div key={i} className="w-12 h-1 relative">
                    {/* Draw arrow line */}
                    {((i >= Math.min(fromIndex, toIndex) && i <= Math.max(fromIndex, toIndex)) && 
                      (i !== Math.min(fromIndex, toIndex) || i === Math.max(fromIndex, toIndex))) && (
                      <div className={`absolute top-0 w-full h-0.5 ${
                        fromIndex === toIndex ? 'bg-orange-400' : 'bg-blue-400'
                      }`}></div>
                    )}
                    
                    {/* Arrow head */}
                    {i === toIndex && fromIndex !== toIndex && (
                      <div className={`absolute top-0 ${isReverse ? 'left-0' : 'right-0'} transform ${
                        isReverse ? 'translate-x-0' : '-translate-x-0'
                      }`}>
                        <div className={`w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent ${
                          isReverse ? 'border-l-blue-400 border-r-0' : 'border-r-blue-400 border-l-0'
                        }`}></div>
                      </div>
                    )}
                    
                    {/* Self-reference loop */}
                    {i === fromIndex && fromIndex === toIndex && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <div className="w-6 h-6 border-2 border-orange-400 rounded-full border-l-transparent animate-spin"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Action Text */}
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: (step.delay || index) * 0.3 + 0.7 }}
                  className="inline-block bg-gray-100 px-3 py-2 rounded-lg text-sm font-medium text-gray-800 shadow-sm"
                >
                  <span className="text-blue-600">{index + 1}.</span> {step.action}
                </motion.div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Timeline */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: steps.length * 0.3 + 1 }}
        className="mt-8 h-1 bg-gradient-to-r from-blue-400 to-green-400 rounded-full"
      ></motion.div>
      
      <div className="text-xs text-gray-500 text-center mt-2">
        Complete flow sequence ({steps.length} steps)
      </div>
    </div>
  )
}

// Predefined actor sets for common scenarios
export const COMMON_ACTORS = {
  BASIC_PAYMENT: {
    Customer: { name: 'Customer', icon: '👤', color: 'bg-blue-500' },
    BA: { name: 'Test Airlines', icon: '✈️', color: 'bg-red-500' },
    Bank: { name: 'Bank', icon: '🏦', color: 'bg-green-500' }
  },
  BNPL_FLOW: {
    Customer: { name: 'Customer', icon: '👤', color: 'bg-blue-500' },
    BA: { name: 'Test Airlines', icon: '✈️', color: 'bg-red-500' },
    Provider: { name: 'BNPL Provider', icon: '💳', color: 'bg-purple-500' },
    Bank: { name: 'Bank', icon: '🏦', color: 'bg-green-500' }
  },
  ACQUIRER_FLOW: {
    Customer: { name: 'Customer', icon: '👤', color: 'bg-blue-500' },
    BA: { name: 'Test Airlines', icon: '✈️', color: 'bg-red-500' },
    Amadeus: { name: 'Amadeus', icon: '⚙️', color: 'bg-orange-500' },
    Acquirer: { name: 'Acquirer', icon: '🔄', color: 'bg-indigo-500' },
    Bank: { name: 'Bank', icon: '🏦', color: 'bg-green-500' }
  },
  PSP_FLOW: {
    Customer: { name: 'Customer', icon: '👤', color: 'bg-blue-500' },
    BA: { name: 'Test Airlines', icon: '✈️', color: 'bg-red-500' },
    PSP: { name: 'PSP', icon: '🛡️', color: 'bg-cyan-500' },
    Bank: { name: 'Bank', icon: '🏦', color: 'bg-green-500' }
  }
}