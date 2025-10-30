'use client'

import React from "react";
import { ExportWidget } from './ExportWidget';

interface Attribute {
  label: string
  value: string
  importance?: 'high' | 'medium' | 'low'
  type?: 'positive' | 'negative' | 'neutral' | 'warning'
}

interface CategorizedAttributesProps {
  attributes: Attribute[]
  title?: string
  modelName?: string
}

export function CategorizedAttributesDiagram({ attributes, title = "Key Attributes", modelName = "Integration" }: CategorizedAttributesProps) {
  // Categorize attributes based on their labels
  const categorizeAttribute = (attr: Attribute) => {
    const label = attr.label.toLowerCase()
    
    if (label.includes('money') || label.includes('revenue') || label.includes('funding') || label.includes('fee') || label.includes('gets') || label.includes('payment') || label.includes('recognition') || label.includes('settlement') || label.includes('upfront') || label.includes('commission') || label.includes('balance') || label.includes('flow')) {
      return 'financial'
    }
    if (label.includes('risk') || label.includes('fraud') || label.includes('3ds') || label.includes('owner') || label.includes('handling') || label.includes('credit') || label.includes('bears') || label.includes('security')) {
      return 'risk'
    }
    if (label.includes('complexity') || label.includes('flexibility') || label.includes('control') || label.includes('effort') || label.includes('integration') || label.includes('impact') || label.includes('engine') || label.includes('system') || label.includes('ledger') || label.includes('adjustments') || label.includes('implementation')) {
      return 'operational'
    }
    if (label.includes('customer') || label.includes('experience') || label.includes('refund') || label.includes('trigger') || label.includes('merchant') || label.includes('record') || label.includes('branding') || label.includes('tokenisation') || label.includes('mit')) {
      return 'customer'
    }
    
    return 'operational' // default category
  }

  // Color code attributes based on pros/cons for Test Airlines
  const getBAColorScheme = (category: string, attr: Attribute) => {
    const label = attr.label.toLowerCase()
    const value = attr.value.toLowerCase()
    
    // Define what's good (pros) vs bad (cons) for Test Airlines
    const prosForBA = [
      'upfront', 'immediate', 'full amount', 'ba gets', 'no risk', 'standard', 'minimal',
      'no complexity', 'low effort', 'maintains control', 'instant settlement'
    ]
    
    const consForBA = [
      'deferred', 'bears risk', 'complex', 'high effort', 'loses control', 'delayed',
      'additional liability', 'integration required', 'system changes'
    ]
    
    const isPro = prosForBA.some(pro => label.includes(pro) || value.includes(pro))
    const isCon = consForBA.some(con => label.includes(con) || value.includes(con))
    
    if (isPro) {
      // Green tones for pros
      return {
        main: "#10b981",
        light: "#34d399"
      }
    } else if (isCon) {
      // Red tones for cons
      return {
        main: "#ef4444", 
        light: "#f87171"
      }
    } else {
      // Neutral blue-gray for neutral attributes
      return {
        main: "#6b7280",
        light: "#9ca3af"
      }
    }
  }

  // Automatically categorize attributes and create children labels with color coding
  const getCategoryAttributes = (categoryType: string) => {
    return attributes.filter(attr => categorizeAttribute(attr) === categoryType).slice(0, 2)
  }

  const categories = [
    {
      y: 200,
      color: "#6366f1", // Indigo for category headers
      light: "#818cf8",
      label: "Financial Aspects",
      children: getCategoryAttributes('financial')
    },
    {
      y: 400,
      color: "#6366f1",
      light: "#818cf8",
      label: "Risk Management", 
      children: getCategoryAttributes('risk')
    },
    {
      y: 600,
      color: "#6366f1",
      light: "#818cf8",
      label: "Operational Efficiency",
      children: getCategoryAttributes('operational')
    },
    {
      y: 800,
      color: "#6366f1", 
      light: "#818cf8",
      label: "Customer Experience",
      children: getCategoryAttributes('customer')
    }
  ]

  return (
    <div className="flex flex-col relative">
      {/* Enhanced larger diagram based on the reference style */}
      <svg width="100%" height="600" viewBox="0 0 1200 600" className="w-full h-auto">
        {/* Root node - larger and more readable */}
        <rect
          x="20"
          y="275"
          rx="15"
          ry="15"
          width="200"
          height="70"
          fill="#1f2937"
          stroke="#374151"
          strokeWidth="2"
        />
        <text
          x="120"
          y="310"
          fill="white"
          fontSize="16"
          textAnchor="middle"
          alignmentBaseline="middle"
          fontWeight="600"
        >
          {modelName}
        </text>

        {/* Branch positions - using the reference style layout */}
        {categories.map((branch, i) => {
          const baseX = 280;
          const baseY = 80 + i * 120; // Vertical spacing like in reference
          return (
            <g key={i}>
              {/* Connector from root to branch */}
              <path
                d={`M220,310 C250,${310} 250,${baseY + 35} ${baseX},${baseY + 35}`}
                stroke="#374151"
                strokeWidth="2"
                fill="transparent"
              />
              
              {/* Branch node - larger for better readability */}
              <rect
                x={baseX}
                y={baseY}
                rx="15"
                ry="15"
                width="240"
                height="70"
                fill={branch.color}
                stroke={branch.light}
                strokeWidth="2"
              />
              <text
                x={baseX + 120}
                y={baseY + 35}
                fill="white"
                fontSize="16"
                textAnchor="middle"
                alignmentBaseline="middle"
                fontWeight="600"
              >
                {branch.label}
              </text>

              {/* Children nodes - positioned to the right with better spacing */}
              {branch.children.map((child, j) => {
                const childX = 580;
                const childY = baseY + j * 80; // Better vertical spacing for children
                const childAttr = attributes.find(attr => attr.label === child.label)
                const colorScheme = childAttr ? getBAColorScheme(categorizeAttribute(childAttr), childAttr) : { main: "#6b7280", light: "#9ca3af" }
                
                return (
                  <g key={j}>
                    {/* Connector curve - cleaner lines */}
                    <path
                      d={`M${baseX + 240},${baseY + 35} C${baseX + 280},${baseY + 35} ${childX - 40},${childY + 30} ${childX},${childY + 30}`}
                      stroke="#374151"
                      strokeWidth="1.5"
                      fill="transparent"
                    />
                    
                    {/* Child box with Test Airlines color coding - larger for readability */}
                    <rect
                      x={childX}
                      y={childY}
                      rx="12"
                      ry="12"
                      width="280"
                      height="60"
                      fill={colorScheme.main}
                      stroke={colorScheme.light}
                      strokeWidth="2"
                    />
                    <text
                      x={childX + 140}
                      y={childY + 30}
                      fill="white"
                      fontSize="15"
                      textAnchor="middle"
                      alignmentBaseline="middle"
                      fontWeight="500"
                    >
                      {typeof child === 'string' ? child : (child.label && child.label.length > 20 ? `${child.label.slice(0, 20)}...` : child.label)}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
}