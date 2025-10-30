'use client'

import { motion } from 'framer-motion'

interface ModelAttribute {
  label: string
  value: string
  highlighted?: boolean
}

interface ModelAttributesSidebarProps {
  title: string
  attributes: ModelAttribute[]
}

export function ModelAttributesSidebar({ title, attributes }: ModelAttributesSidebarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-2xl border border-gray-200 p-6 lg:sticky lg:top-8 lg:self-start"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <span className="text-white text-sm font-bold">📊</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      
      <div className="space-y-4">
        {attributes.map((attribute, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`p-3 rounded-lg border transition-colors ${
              attribute.highlighted 
                ? 'bg-blue-50 border-blue-200' 
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <div className="text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
              {attribute.label}
            </div>
            <div className={`text-sm font-medium ${
              attribute.highlighted ? 'text-blue-900' : 'text-gray-900'
            }`}>
              {attribute.value}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default ModelAttributesSidebar