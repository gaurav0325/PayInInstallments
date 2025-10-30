'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface ComparisonRow {
  id: string
  model: string
  baGetsMoney: string
  risk: string
  complexity: string
  flexibility: string
  fees: string
  refund: string
  ledgerAccounting: string
  cx: string
  tokenisationMIT: string
  mor: string
  fraudAndDS: string
  additionalFees: string
  threeRI: string
  priority: 'low' | 'medium' | 'high'
  order: number
}

export function EditableComparisonTable() {
  const [rows, setRows] = useState<ComparisonRow[]>([
    {
      id: '1',
      model: 'Merchant-financed (Full Auth)',
      baGetsMoney: 'Immediate full payment',
      risk: 'High - BA carries all risk',
      complexity: 'High - Complex acquirer integration',
      flexibility: 'Low - Fixed payment terms',
      fees: 'Standard card processing fees',
      refund: 'Complex - Staged refunds required',
      ledgerAccounting: 'Complex - Multiple settlement points',
      cx: 'Excellent - Native BA experience',
      tokenisationMIT: 'Required for recurring payments',
      mor: 'Test Airlines',
      fraudAndDS: 'Full 3DS authentication required',
      additionalFees: 'None',
      threeRI: 'Not applicable',
      priority: 'high',
      order: 0
    },
    {
      id: '2', 
      model: 'Merchant-financed (MIT)',
      baGetsMoney: 'Immediate full payment',
      risk: 'High - BA carries all risk',
      complexity: 'Very High - MIT setup required',
      flexibility: 'High - Flexible payment terms',
      fees: 'Standard card processing fees',
      refund: 'Simple - Direct refund capability',
      ledgerAccounting: 'Moderate - Monthly reconciliation',
      cx: 'Excellent - Fully integrated',
      tokenisationMIT: 'Essential - Network tokenization',
      mor: 'Test Airlines',
      fraudAndDS: 'Initial 3DS, then MIT exemption',
      additionalFees: 'Tokenization fees',
      threeRI: 'Supported',
      priority: 'high',
      order: 1
    },
    {
      id: '3',
      model: 'BNPL Partners',
      baGetsMoney: 'Immediate full payment',
      risk: 'Low - Partner carries risk',
      complexity: 'Low - API integration only',
      flexibility: 'Medium - Partner terms',
      fees: 'Partner commission (2-5%)',
      refund: 'Partner managed',
      ledgerAccounting: 'Simple - Single payment',
      cx: 'Good - Redirect to partner',
      tokenisationMIT: 'Partner responsibility',
      mor: 'BNPL Partner',
      fraudAndDS: 'Partner managed',
      additionalFees: 'Partner service fees',
      threeRI: 'Partner dependent',
      priority: 'medium',
      order: 2
    },
    {
      id: '4',
      model: 'Embedded BNPL',
      baGetsMoney: 'Immediate full payment',
      risk: 'Low - Partner carries risk',
      complexity: 'Medium - Embedded integration',
      flexibility: 'High - Multiple partner options',
      fees: 'Partner commission (2-4%)',
      refund: 'Partner coordinated',
      ledgerAccounting: 'Moderate - Partner reconciliation',
      cx: 'Very Good - Embedded experience',
      tokenisationMIT: 'Partner managed',
      mor: 'BNPL Partner via Iberia Cards',
      fraudAndDS: 'Partner + BA coordination',
      additionalFees: 'Iberia Cards fees',
      threeRI: 'Partner dependent',
      priority: 'medium',
      order: 3
    },
    {
      id: '5',
      model: 'PSP Driven',
      baGetsMoney: 'Immediate or staged payment',
      risk: 'Medium - Shared with PSP',
      complexity: 'Medium - PSP widget integration',
      flexibility: 'Medium - PSP terms',
      fees: 'PSP fees + processing',
      refund: 'PSP managed',
      ledgerAccounting: 'PSP handles complexity',
      cx: 'Good - PSP widget/modal',
      tokenisationMIT: 'PSP responsibility',
      mor: 'PSP or Test Airlines',
      fraudAndDS: 'PSP managed',
      additionalFees: 'PSP service fees',
      threeRI: 'PSP dependent',
      priority: 'medium',
      order: 4
    },
    {
      id: '6',
      model: 'Acquirer Driven',
      baGetsMoney: 'Immediate full payment from acquirer',
      risk: 'Low - Acquirer manages instalment risk',
      complexity: 'Low - Single acquirer integration',
      flexibility: 'Medium - Acquirer rules configuration',
      fees: 'Acquirer instalment fees',
      refund: 'Acquirer managed refunds',
      ledgerAccounting: 'Simple - Single settlement from acquirer',
      cx: 'Good - Acquirer managed flow',
      tokenisationMIT: 'Acquirer responsibility',
      mor: 'Test Airlines (via Acquirer)',
      fraudAndDS: 'Acquirer fraud screening',
      additionalFees: 'Acquirer processing fees',
      threeRI: 'Acquirer dependent',
      priority: 'medium',
      order: 5
    },
    {
      id: '7',
      model: 'Deposit + Instalments',
      baGetsMoney: 'Deposit upfront + instalment schedule',
      risk: 'Medium - BA bears remaining payment risk',
      complexity: 'Medium - Custom payment scheduling',
      flexibility: 'High - Customer controlled schedule',
      fees: 'Standard processing + ATOL fees',
      refund: 'Pro-rata based on payments made',
      ledgerAccounting: 'Moderate - Multi-stage reconciliation',
      cx: 'Very Good - Flexible customer journey',
      tokenisationMIT: 'Required for balance payments',
      mor: 'Test Airlines',
      fraudAndDS: 'Initial 3DS + MIT for balance',
      additionalFees: 'ATOL protection fees',
      threeRI: 'Supported',
      priority: 'high',
      order: 6
    },
    {
      id: '8',
      model: 'Deferred Payment',
      baGetsMoney: 'Delayed single payment on due date',
      risk: 'High - BA bears full payment failure risk',
      complexity: 'Medium - Reminder and collection systems',
      flexibility: 'Low - Fixed payment date',
      fees: 'Standard processing fees',
      refund: 'Standard BA refund policies',
      ledgerAccounting: 'Simple - Single future settlement',
      cx: 'Excellent - No upfront payment required',
      tokenisationMIT: 'Required for deferred charge',
      mor: 'Test Airlines',
      fraudAndDS: '3DS on deferred payment date',
      additionalFees: 'Late payment fees',
      threeRI: 'Supported',
      priority: 'medium',
      order: 7
    },
    {
      id: '9',
      model: 'Issuer Pre-purchase',
      baGetsMoney: 'Immediate full payment from bank',
      risk: 'None - Bank bears all instalment risk',
      complexity: 'Very Low - Modal integration only',
      flexibility: 'Low - Bank determined terms',
      fees: 'No fees to BA',
      refund: 'Standard BA policies apply',
      ledgerAccounting: 'Simple - Single bank payment',
      cx: 'Good - Bank branded modal',
      tokenisationMIT: 'Bank responsibility',
      mor: 'Test Airlines (via Bank)',
      fraudAndDS: 'Bank handles all authentication',
      additionalFees: 'Bank charges customer directly',
      threeRI: 'Bank dependent',
      priority: 'low',
      order: 8
    },
    {
      id: '10',
      model: 'Issuer Post-purchase',
      baGetsMoney: 'Immediate full payment',
      risk: 'None - Standard card payment',
      complexity: 'Very Low - Informational only',
      flexibility: 'Low - Bank terms only',
      fees: 'Standard card processing',
      refund: 'Standard BA policies',
      ledgerAccounting: 'Simple - Standard card settlement',
      cx: 'Fair - Informational banner only',
      tokenisationMIT: 'Not applicable',
      mor: 'Test Airlines',
      fraudAndDS: 'Standard card 3DS',
      additionalFees: 'None from BA perspective',
      threeRI: 'Not applicable',
      priority: 'low',
      order: 9
    },
    {
      id: '11',
      model: 'Hybrid Orchestrator',
      baGetsMoney: 'Varies by selected route',
      risk: 'Variable - Depends on routing decision',
      complexity: 'Very High - Multi-provider integration',
      flexibility: 'Very High - Dynamic provider selection',
      fees: 'Variable based on routing',
      refund: 'Route-specific handling',
      ledgerAccounting: 'Very Complex - Multi-provider reconciliation',
      cx: 'Excellent - Optimized routing per customer',
      tokenisationMIT: 'Route dependent',
      mor: 'Variable by routing decision',
      fraudAndDS: 'Route-specific handling',
      additionalFees: 'Route and provider dependent',
      threeRI: 'Route dependent',
      priority: 'high',
      order: 10
    },
    {
      id: '12',
      model: 'Hold My Fare, Pay Later',
      baGetsMoney: 'Hold fee + delayed payment on deadline',
      risk: 'High - BA inventory + payment risk',
      complexity: 'High - New system development',
      flexibility: 'Very High - BA controlled terms',
      fees: 'Hold fees + standard processing',
      refund: 'BA managed - Hold cancellation',
      ledgerAccounting: 'Complex - Inventory + payment tracking',
      cx: 'Excellent - Native BA system',
      tokenisationMIT: 'Required for payment deadline',
      mor: 'Test Airlines',
      fraudAndDS: 'Full 3DS on payment',
      additionalFees: 'Hold/reservation fees',
      threeRI: 'Supported',
      priority: 'high',
      order: 11
    }
  ])

  const [editingCell, setEditingCell] = useState<string | null>(null)
  const [draggedRow, setDraggedRow] = useState<string | null>(null)

  // Tooltip definitions for column headers
  const tooltips: Record<string, string> = {
    baGetsMoney: "When and how Test Airlines receives payment",
    risk: "Who bears the financial and operational risk",
    complexity: "Implementation difficulty and technical requirements", 
    flexibility: "Ability to customize terms and payment schedules",
    fees: "Associated costs and commission structures",
    refund: "How refunds are processed and managed",
    ledgerAccounting: "Complexity of financial reconciliation and accounting",
    cx: "Quality of customer experience and user journey",
    tokenisationMIT: "Token storage and Merchant Initiated Transaction support",
    mor: "Who acts as the Merchant of Record for transactions",
    fraudAndDS: "3D Secure authentication and fraud protection measures",
    additionalFees: "Extra charges beyond standard processing fees",
    threeRI: "3RI (3-D Secure Requestor Initiated) authentication support"
  }

  const handleCellEdit = (rowId: string, field: keyof ComparisonRow, value: string | 'low' | 'medium' | 'high') => {
    setRows(rows.map(row => 
      row.id === rowId ? { ...row, [field]: value } : row
    ))
    setEditingCell(null)
  }

  const handleDragStart = (e: React.DragEvent, rowId: string) => {
    setDraggedRow(rowId)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, targetRowId: string) => {
    e.preventDefault()
    if (!draggedRow || draggedRow === targetRowId) return

    const draggedIndex = rows.findIndex(r => r.id === draggedRow)
    const targetIndex = rows.findIndex(r => r.id === targetRowId)
    
    const newRows = [...rows]
    const draggedItem = newRows.splice(draggedIndex, 1)[0]
    newRows.splice(targetIndex, 0, draggedItem)
    
    // Update order values
    newRows.forEach((row, index) => {
      row.order = index
    })
    
    setRows(newRows)
    setDraggedRow(null)
  }

  // Color coding based on criticality levels
  const getCellColor = (field: keyof ComparisonRow, value: string) => {
    // Risk level coloring
    if (field === 'risk') {
      if (value.toLowerCase().includes('high')) return 'bg-red-50 border-red-200'
      if (value.toLowerCase().includes('medium')) return 'bg-yellow-50 border-yellow-200'
      if (value.toLowerCase().includes('low')) return 'bg-green-50 border-green-200'
    }
    
    // Complexity coloring
    if (field === 'complexity') {
      if (value.toLowerCase().includes('very high') || value.toLowerCase().includes('complex')) return 'bg-red-50 border-red-200'
      if (value.toLowerCase().includes('high')) return 'bg-orange-50 border-orange-200'
      if (value.toLowerCase().includes('medium')) return 'bg-yellow-50 border-yellow-200'
      if (value.toLowerCase().includes('low') || value.toLowerCase().includes('simple')) return 'bg-green-50 border-green-200'
    }
    
    // CX (Customer Experience) coloring - higher is better
    if (field === 'cx') {
      if (value.toLowerCase().includes('excellent')) return 'bg-green-50 border-green-200'
      if (value.toLowerCase().includes('very good')) return 'bg-lime-50 border-lime-200'
      if (value.toLowerCase().includes('good')) return 'bg-yellow-50 border-yellow-200'
      if (value.toLowerCase().includes('poor')) return 'bg-red-50 border-red-200'
    }
    
    // Flexibility coloring - higher is better
    if (field === 'flexibility') {
      if (value.toLowerCase().includes('very high')) return 'bg-green-50 border-green-200'
      if (value.toLowerCase().includes('high')) return 'bg-lime-50 border-lime-200'
      if (value.toLowerCase().includes('medium')) return 'bg-yellow-50 border-yellow-200'
      if (value.toLowerCase().includes('low')) return 'bg-orange-50 border-orange-200'
    }
    
    return 'bg-white border-gray-200'
  }

  const deleteRow = (rowId: string) => {
    if (window.confirm('Are you sure you want to delete this model from the comparison table?')) {
      setRows(rows.filter(row => row.id !== rowId))
    }
  }

  const getPriorityColor = (priority: 'low' | 'medium' | 'high') => {
    switch (priority) {
      case 'high': return 'bg-red-50 border-red-200 text-red-800'
      case 'medium': return 'bg-amber-50 border-amber-200 text-amber-800'
      case 'low': return 'bg-green-50 border-green-200 text-green-800'
      default: return 'bg-gray-50 border-gray-200 text-gray-800'
    }
  }

  const EditableCell = ({ 
    value, 
    onSave, 
    cellId, 
    field,
    type = 'text' 
  }: { 
    value: string, 
    onSave: (value: string) => void, 
    cellId: string,
    field: keyof ComparisonRow,
    type?: 'text' | 'select' 
  }) => {
    const [editValue, setEditValue] = useState(value)
    const isEditing = editingCell === cellId
    const cellColorClass = getCellColor(field, value)

    if (isEditing) {
      if (type === 'select') {
        return (
          <select
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={() => onSave(editValue)}
            onKeyDown={(e) => e.key === 'Enter' && onSave(editValue)}
            className="w-full border border-blue-300 rounded px-2 py-1 text-sm"
            autoFocus
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        )
      }
      
      return (
        <textarea
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={() => onSave(editValue)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && onSave(editValue)}
          className="w-full border border-blue-300 rounded px-2 py-1 text-sm resize-none"
          rows={2}
          autoFocus
        />
      )
    }

    return (
      <div 
        onClick={() => setEditingCell(cellId)}
        className={`cursor-pointer hover:opacity-80 p-2 rounded text-sm min-h-[2rem] flex items-center border ${cellColorClass} transition-colors`}
      >
        {value || 'Click to edit...'}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-xl font-bold text-gray-900">Instalment Models Comparison</h2>
          <Link 
            href="/comparison" 
            className="flex items-center justify-center w-8 h-8 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors group"
            title="Open full comparison in new page"
          >
            <svg 
              className="w-4 h-4 text-blue-600 group-hover:text-blue-700" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
              />
            </svg>
          </Link>
        </div>
        <p className="text-sm text-gray-600">Compare different payment models across key criteria. Hover over column headers for definitions.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-700 min-w-[120px]">
                Model Type
              </th>
              <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-700 min-w-[100px]" title={tooltips.baGetsMoney}>
                BA Gets Money
              </th>
              <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-700 min-w-[80px]" title={tooltips.risk}>
                Risk
              </th>
              <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-700 min-w-[90px]" title={tooltips.complexity}>
                Complexity
              </th>
              <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-700 min-w-[80px]" title={tooltips.flexibility}>
                Flexibility
              </th>
              <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-700 min-w-[80px]" title={tooltips.fees}>
                Fees
              </th>
              <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-700 min-w-[80px]" title={tooltips.refund}>
                Refund
              </th>
              <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-700 min-w-[110px]" title={tooltips.ledgerAccounting}>
                Ledger & Accounting
              </th>
              <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-700 min-w-[60px]" title={tooltips.cx}>
                CX
              </th>
              <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-700 min-w-[100px]" title={tooltips.tokenisationMIT}>
                Tokenisation & MIT
              </th>
              <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-700 min-w-[80px]" title={tooltips.mor}>
                MOR
              </th>
              <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-700 min-w-[80px]" title={tooltips.fraudAndDS}>
                3DS/Fraud
              </th>
              <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-700 min-w-[90px]" title={tooltips.additionalFees}>
                Additional Fees
              </th>
              <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-700 min-w-[60px]" title={tooltips.threeRI}>
                3RI
              </th>
              <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-700 w-16">
                Priority
              </th>
              <th className="border border-gray-200 p-2 text-left text-xs font-medium text-gray-700 w-16">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.sort((a, b) => a.order - b.order).map((row) => (
              <motion.tr
                key={row.id}
                layout
                className={`hover:bg-gray-50 cursor-move ${draggedRow === row.id ? 'opacity-50' : ''}`}
                draggable
                onDragStart={(e) => handleDragStart(e as unknown as React.DragEvent, row.id)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, row.id)}
              >
                <td className="border border-gray-200 p-1">
                  <EditableCell
                    value={row.model}
                    onSave={(value) => handleCellEdit(row.id, 'model', value)}
                    cellId={`${row.id}-model`}
                    field="model"
                  />
                </td>
                <td className="border border-gray-200 p-1">
                  <EditableCell
                    value={row.baGetsMoney}
                    onSave={(value) => handleCellEdit(row.id, 'baGetsMoney', value)}
                    cellId={`${row.id}-baGetsMoney`}
                    field="baGetsMoney"
                  />
                </td>
                <td className="border border-gray-200 p-1">
                  <EditableCell
                    value={row.risk}
                    onSave={(value) => handleCellEdit(row.id, 'risk', value)}
                    cellId={`${row.id}-risk`}
                    field="risk"
                  />
                </td>
                <td className="border border-gray-200 p-1">
                  <EditableCell
                    value={row.complexity}
                    onSave={(value) => handleCellEdit(row.id, 'complexity', value)}
                    cellId={`${row.id}-complexity`}
                    field="complexity"
                  />
                </td>
                <td className="border border-gray-200 p-1">
                  <EditableCell
                    value={row.flexibility}
                    onSave={(value) => handleCellEdit(row.id, 'flexibility', value)}
                    cellId={`${row.id}-flexibility`}
                    field="flexibility"
                  />
                </td>
                <td className="border border-gray-200 p-1">
                  <EditableCell
                    value={row.fees}
                    onSave={(value) => handleCellEdit(row.id, 'fees', value)}
                    cellId={`${row.id}-fees`}
                    field="fees"
                  />
                </td>
                <td className="border border-gray-200 p-1">
                  <EditableCell
                    value={row.refund}
                    onSave={(value) => handleCellEdit(row.id, 'refund', value)}
                    cellId={`${row.id}-refund`}
                    field="refund"
                  />
                </td>
                <td className="border border-gray-200 p-1">
                  <EditableCell
                    value={row.ledgerAccounting}
                    onSave={(value) => handleCellEdit(row.id, 'ledgerAccounting', value)}
                    cellId={`${row.id}-ledgerAccounting`}
                    field="ledgerAccounting"
                  />
                </td>
                <td className="border border-gray-200 p-1">
                  <EditableCell
                    value={row.cx}
                    onSave={(value) => handleCellEdit(row.id, 'cx', value)}
                    cellId={`${row.id}-cx`}
                    field="cx"
                  />
                </td>
                <td className="border border-gray-200 p-1">
                  <EditableCell
                    value={row.tokenisationMIT}
                    onSave={(value) => handleCellEdit(row.id, 'tokenisationMIT', value)}
                    cellId={`${row.id}-tokenisationMIT`}
                    field="tokenisationMIT"
                  />
                </td>
                <td className="border border-gray-200 p-1">
                  <EditableCell
                    value={row.mor}
                    onSave={(value) => handleCellEdit(row.id, 'mor', value)}
                    cellId={`${row.id}-mor`}
                    field="mor"
                  />
                </td>
                <td className="border border-gray-200 p-1">
                  <EditableCell
                    value={row.fraudAndDS}
                    onSave={(value) => handleCellEdit(row.id, 'fraudAndDS', value)}
                    cellId={`${row.id}-fraudAndDS`}
                    field="fraudAndDS"
                  />
                </td>
                <td className="border border-gray-200 p-1">
                  <EditableCell
                    value={row.additionalFees}
                    onSave={(value) => handleCellEdit(row.id, 'additionalFees', value)}
                    cellId={`${row.id}-additionalFees`}
                    field="additionalFees"
                  />
                </td>
                <td className="border border-gray-200 p-1">
                  <EditableCell
                    value={row.threeRI}
                    onSave={(value) => handleCellEdit(row.id, 'threeRI', value)}
                    cellId={`${row.id}-threeRI`}
                    field="threeRI"
                  />
                </td>
                <td className="border border-gray-200 p-2">
                  <div className="flex justify-center">
                    <select
                      value={row.priority}
                      onChange={(e) => handleCellEdit(row.id, 'priority', e.target.value as 'low' | 'medium' | 'high')}
                      className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(row.priority)}`}
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </td>
                <td className="border border-gray-200 p-2">
                  <button
                    onClick={() => deleteRow(row.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    🗑️
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 space-y-3 text-sm text-gray-600">
        <div className="flex flex-wrap items-center gap-6">
          <span className="flex items-center gap-1">
            <span className="text-blue-600">💡</span>
            Click any cell to edit content
          </span>
          <span className="flex items-center gap-1">
            <span className="text-blue-600">🔄</span>
            Drag rows to reorder
          </span>
          <span className="flex items-center gap-1">
            <span className="text-blue-600">❓</span>
            Hover column headers for definitions
          </span>
        </div>
        
        <div className="border-t pt-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <strong className="text-gray-800">Color Coding:</strong>
              <div className="mt-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-4 h-3 bg-red-50 border border-red-200 rounded"></span>
                  High Risk/Complexity
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-4 h-3 bg-yellow-50 border border-yellow-200 rounded"></span>
                  Medium Risk/Complexity
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-4 h-3 bg-green-50 border border-green-200 rounded"></span>
                  Low Risk/High Quality
                </div>
              </div>
            </div>
            
            <div>
              <strong className="text-gray-800">Priority Levels:</strong>
              <div className="mt-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-4 h-3 bg-red-200 rounded"></span>
                  High Priority
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-4 h-3 bg-amber-200 rounded"></span>
                  Medium Priority
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-4 h-3 bg-green-200 rounded"></span>
                  Low Priority
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditableComparisonTable