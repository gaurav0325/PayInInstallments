'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface Rule {
  id: string
  label: string
  passed: boolean
  required: boolean
  priority: 'low' | 'medium' | 'high'
  order: number
}

interface EditableRulesListProps {
  initialRules: Rule[]
  title?: string
  onRulesChange?: (rules: Rule[]) => void
}

export function EditableRulesList({ 
  initialRules, 
  title = 'Business Rules & Eligibility',
  onRulesChange 
}: EditableRulesListProps) {
  const [rules, setRules] = useState<Rule[]>(
    initialRules.map((rule, index) => ({ 
      ...rule, 
      id: rule.id || index.toString(),
      order: rule.order ?? index 
    }))
  )
  const [editingRule, setEditingRule] = useState<string | null>(null)
  const [draggedRule, setDraggedRule] = useState<string | null>(null)
  const [isAddingRule, setIsAddingRule] = useState(false)
  const [newRule, setNewRule] = useState<Partial<Rule>>({})

  const updateRules = (newRules: Rule[]) => {
    setRules(newRules)
    onRulesChange?.(newRules)
  }

  const handleRuleEdit = (ruleId: string, field: keyof Rule, value: any) => {
    const updatedRules = rules.map(rule => 
      rule.id === ruleId ? { ...rule, [field]: value } : rule
    )
    updateRules(updatedRules)
    setEditingRule(null)
  }

  const handleDragStart = (e: React.DragEvent, ruleId: string) => {
    setDraggedRule(ruleId)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, targetRuleId: string) => {
    e.preventDefault()
    if (!draggedRule || draggedRule === targetRuleId) return

    const draggedIndex = rules.findIndex(r => r.id === draggedRule)
    const targetIndex = rules.findIndex(r => r.id === targetRuleId)
    
    const newRules = [...rules]
    const draggedItem = newRules.splice(draggedIndex, 1)[0]
    newRules.splice(targetIndex, 0, draggedItem)
    
    // Update order values
    newRules.forEach((rule, index) => {
      rule.order = index
    })
    
    updateRules(newRules)
    setDraggedRule(null)
  }

  const addNewRule = () => {
    if (!newRule.label) return
    
    const newRuleData: Rule = {
      id: Date.now().toString(),
      label: newRule.label || '',
      passed: newRule.passed || false,
      required: newRule.required || false,
      priority: newRule.priority || 'medium',
      order: rules.length
    }
    
    updateRules([...rules, newRuleData])
    setNewRule({})
    setIsAddingRule(false)
  }

  const deleteRule = (ruleId: string) => {
    if (window.confirm('Are you sure you want to delete this rule?')) {
      updateRules(rules.filter(rule => rule.id !== ruleId))
    }
  }

  const getPriorityColor = (priority: 'low' | 'medium' | 'high') => {
    switch (priority) {
      case 'high': return 'border-red-300 bg-red-50'
      case 'medium': return 'border-amber-300 bg-amber-50'
      case 'low': return 'border-green-300 bg-green-50'
      default: return 'border-gray-300 bg-gray-50'
    }
  }

  const EditableCell = ({ 
    value, 
    onSave, 
    cellId, 
    type = 'text' 
  }: { 
    value: string | boolean, 
    onSave: (value: any) => void, 
    cellId: string, 
    type?: 'text' | 'checkbox' | 'select' 
  }) => {
    const [editValue, setEditValue] = useState(value)
    const isEditing = editingRule === cellId

    if (isEditing) {
      if (type === 'checkbox') {
        return (
          <input
            type="checkbox"
            checked={editValue as boolean}
            onChange={(e) => {
              setEditValue(e.target.checked)
              onSave(e.target.checked)
            }}
            className="rounded"
            autoFocus
          />
        )
      }
      
      if (type === 'select') {
        return (
          <select
            value={editValue as string}
            onChange={(e) => {
              setEditValue(e.target.value)
              onSave(e.target.value)
            }}
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
        <input
          type="text"
          value={editValue as string}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={() => onSave(editValue)}
          onKeyDown={(e) => e.key === 'Enter' && onSave(editValue)}
          className="w-full border border-blue-300 rounded px-2 py-1 text-sm"
          autoFocus
        />
      )
    }

    if (type === 'checkbox') {
      return (
        <input
          type="checkbox"
          checked={value as boolean}
          onChange={(e) => onSave(e.target.checked)}
          className="rounded cursor-pointer"
        />
      )
    }

    return (
      <div 
        onClick={() => setEditingRule(cellId)}
        className="cursor-pointer hover:bg-gray-100 p-1 rounded text-sm"
      >
        {value?.toString() || 'Click to edit...'}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <button
          onClick={() => setIsAddingRule(true)}
          className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-blue-700"
        >
          + Add Rule
        </button>
      </div>

      <div className="space-y-3">
        {rules
          .sort((a, b) => a.order - b.order)
          .map((rule) => (
            <motion.div
              key={rule.id}
              layout
              className={`border-l-4 rounded-r-lg p-3 cursor-move ${
                getPriorityColor(rule.priority)
              } ${draggedRule === rule.id ? 'opacity-50' : ''}`}
              draggable
              onDragStart={(e) => handleDragStart(e as unknown as React.DragEvent, rule.id)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, rule.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <EditableCell
                    value={rule.passed}
                    onSave={(value) => handleRuleEdit(rule.id, 'passed', value)}
                    cellId={`${rule.id}-passed`}
                    type="checkbox"
                  />
                  <div className="flex-1">
                    <EditableCell
                      value={rule.label}
                      onSave={(value) => handleRuleEdit(rule.id, 'label', value)}
                      cellId={`${rule.id}-label`}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">Required:</span>
                    <EditableCell
                      value={rule.required}
                      onSave={(value) => handleRuleEdit(rule.id, 'required', value)}
                      cellId={`${rule.id}-required`}
                      type="checkbox"
                    />
                  </div>
                  <div className="w-20">
                    <select
                      value={rule.priority}
                      onChange={(e) => handleRuleEdit(rule.id, 'priority', e.target.value as 'low' | 'medium' | 'high')}
                      className="w-full text-xs border border-gray-300 rounded px-1 py-1"
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={() => deleteRule(rule.id)}
                  className="text-red-600 hover:text-red-800 text-sm ml-2"
                >
                  🗑️
                </button>
              </div>
            </motion.div>
          ))}

        {/* Add New Rule */}
        {isAddingRule && (
          <div className="border-l-4 border-blue-300 bg-blue-50 rounded-r-lg p-3">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={newRule.passed || false}
                onChange={(e) => setNewRule({...newRule, passed: e.target.checked})}
                className="rounded"
              />
              <input
                type="text"
                placeholder="Rule description..."
                value={newRule.label || ''}
                onChange={(e) => setNewRule({...newRule, label: e.target.value})}
                className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
              />
              <label className="flex items-center space-x-1 text-xs">
                <span>Required:</span>
                <input
                  type="checkbox"
                  checked={newRule.required || false}
                  onChange={(e) => setNewRule({...newRule, required: e.target.checked})}
                  className="rounded"
                />
              </label>
              <select
                value={newRule.priority || 'medium'}
                onChange={(e) => setNewRule({...newRule, priority: e.target.value as 'low' | 'medium' | 'high'})}
                className="text-xs border border-gray-300 rounded px-1 py-1"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <div className="flex gap-1">
                <button
                  onClick={addNewRule}
                  className="text-green-600 hover:text-green-800 text-sm"
                >
                  ✅
                </button>
                <button
                  onClick={() => {setIsAddingRule(false); setNewRule({})}}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  ❌
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <div className="flex items-center gap-4">
          <span>💡 Click to edit • 🔄 Drag to reorder</span>
          <span>Priority: <span className="inline-block w-3 h-3 bg-red-200 rounded mr-1"></span>High <span className="inline-block w-3 h-3 bg-amber-200 rounded mr-1"></span>Medium <span className="inline-block w-3 h-3 bg-green-200 rounded mr-1"></span>Low</span>
        </div>
      </div>
    </div>
  )
}

export default EditableRulesList