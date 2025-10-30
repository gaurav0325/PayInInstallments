'use client'

import { motion } from 'framer-motion'
import React from 'react'

interface Attribute {
  label: string
  value: string | React.ReactNode
  importance?: 'high' | 'medium' | 'low'
  type?: 'positive' | 'negative' | 'neutral' | 'warning'
}

export function AttributesTable({ attributes }: { attributes: Attribute[] }) {
  const getAttributeStyles = (attr: Attribute) => {
    const baseStyles = "px-4 py-3 rounded-lg border transition-all duration-200"
    
    // Importance-based styling
    let importanceStyles = ""
    switch (attr.importance) {
      case 'high':
        importanceStyles = "ring-2 ring-blue-200 shadow-sm"
        break
      case 'medium':
        importanceStyles = "ring-1 ring-gray-200"
        break
      case 'low':
      default:
        importanceStyles = "border-gray-100"
        break
    }
    
    // Type-based coloring
    let typeStyles = ""
    switch (attr.type) {
      case 'positive':
        typeStyles = "bg-green-50 border-green-200 hover:bg-green-100"
        break
      case 'negative':
        typeStyles = "bg-red-50 border-red-200 hover:bg-red-100"
        break
      case 'warning':
        typeStyles = "bg-yellow-50 border-yellow-200 hover:bg-yellow-100"
        break
      case 'neutral':
      default:
        typeStyles = "bg-gray-50 border-gray-200 hover:bg-gray-100"
        break
    }
    
    return `${baseStyles} ${importanceStyles} ${typeStyles}`
  }

  const getLabelStyles = (attr: Attribute) => {
    const baseStyles = "text-xs font-semibold uppercase tracking-wider mb-2"
    
    switch (attr.type) {
      case 'positive':
        return `${baseStyles} text-green-700`
      case 'negative':
        return `${baseStyles} text-red-700`
      case 'warning':
        return `${baseStyles} text-yellow-700`
      case 'neutral':
      default:
        return `${baseStyles} text-gray-600`
    }
  }

  const getValueStyles = (attr: Attribute) => {
    const baseStyles = "font-medium text-sm leading-relaxed"
    
    switch (attr.type) {
      case 'positive':
        return `${baseStyles} text-green-900`
      case 'negative':
        return `${baseStyles} text-red-900`
      case 'warning':
        return `${baseStyles} text-yellow-900`
      case 'neutral':
      default:
        return `${baseStyles} text-gray-900`
    }
  }

  const getIconForAttribute = (label: string, type?: string) => {
    // Specific icons based on attribute label
    const labelLower = label.toLowerCase()
    
    if (labelLower.includes('risk')) return <span className="text-red-500 text-lg">🛡️</span>
    if (labelLower.includes('revenue') || labelLower.includes('money')) return <span className="text-green-500 text-lg">💰</span>
    if (labelLower.includes('complexity') || labelLower.includes('effort')) return <span className="text-orange-500 text-lg">⚙️</span>
    if (labelLower.includes('flexibility') || labelLower.includes('control')) return <span className="text-blue-500 text-lg">🎛️</span>
    if (labelLower.includes('customer') || labelLower.includes('experience')) return <span className="text-purple-500 text-lg">👥</span>
    if (labelLower.includes('funding') || labelLower.includes('source')) return <span className="text-indigo-500 text-lg">🏦</span>
    if (labelLower.includes('token') || labelLower.includes('mit')) return <span className="text-cyan-500 text-lg">🔐</span>
    if (labelLower.includes('merchant') || labelLower.includes('record')) return <span className="text-red-600 text-lg">🏢</span>
    if (labelLower.includes('fraud') || labelLower.includes('3ds')) return <span className="text-yellow-500 text-lg">🔒</span>
    if (labelLower.includes('fee') || labelLower.includes('additional')) return <span className="text-orange-600 text-lg">💳</span>
    if (labelLower.includes('3ri') || labelLower.includes('support')) return <span className="text-teal-500 text-lg">🔄</span>
    if (labelLower.includes('market') || labelLower.includes('focus')) return <span className="text-pink-500 text-lg">🌍</span>
    if (labelLower.includes('refund') || labelLower.includes('trigger')) return <span className="text-amber-500 text-lg">↩️</span>
    if (labelLower.includes('ledger') || labelLower.includes('adjustment')) return <span className="text-slate-500 text-lg">📋</span>
    if (labelLower.includes('engine') || labelLower.includes('system')) return <span className="text-violet-500 text-lg">🔧</span>
    
    // Fallback to type-based icons
    switch (type) {
      case 'positive':
        return <span className="text-green-500 text-lg">✅</span>
      case 'negative':
        return <span className="text-red-500 text-lg">⚠️</span>
      case 'warning':
        return <span className="text-yellow-500 text-lg">⚡</span>
      case 'neutral':
      default:
        return <span className="text-blue-500 text-lg">📊</span>
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
      {attributes.map((attr, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          className={getAttributeStyles(attr)}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              {getIconForAttribute(attr.label, attr.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className={getLabelStyles(attr)}>
                {attr.label}
              </div>
              <div className={getValueStyles(attr)}>
                {attr.value}
              </div>
            </div>
            {attr.importance === 'high' && (
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}