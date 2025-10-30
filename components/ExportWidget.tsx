'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ExportWidgetProps {
  data: {
    title: string
    sections: {
      name: string
      content: any[]
      type: 'table' | 'rules' | 'attributes' | 'diagram' | 'text'
    }[]
  }
  className?: string
}

export function ExportWidget({ data, className = '' }: ExportWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [selectedSections, setSelectedSections] = useState<string[]>([])

  const exportFormats = [
    { id: 'pdf', name: 'PDF Document', icon: '📄', description: 'Professional formatted document' },
    { id: 'word', name: 'Word Document', icon: '📝', description: 'Editable Microsoft Word format' },
    { id: 'csv', name: 'CSV Spreadsheet', icon: '📊', description: 'Data tables only' },
    { id: 'json', name: 'JSON Data', icon: '💾', description: 'Machine-readable format' }
  ]

  const handleSectionToggle = (sectionName: string) => {
    setSelectedSections(prev => 
      prev.includes(sectionName)
        ? prev.filter(s => s !== sectionName)
        : [...prev, sectionName]
    )
  }

  const generateExportContent = (format: string) => {
    const timestamp = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })

    let content = ''
    
    if (format === 'pdf' || format === 'word') {
      content = `${data.title}\nExported on ${timestamp}\n${'='.repeat(50)}\n\n`
      
      data.sections.forEach(section => {
        if (selectedSections.length === 0 || selectedSections.includes(section.name)) {
          content += `${section.name}\n${'-'.repeat(section.name.length)}\n\n`
          
          if (section.type === 'table') {
            section.content.forEach((row: any, index: number) => {
              if (index === 0) {
                // Table headers
                content += Object.keys(row).join(' | ') + '\n'
                content += Object.keys(row).map(() => '---').join(' | ') + '\n'
              }
              content += Object.values(row).join(' | ') + '\n'
            })
          } else if (section.type === 'rules') {
            section.content.forEach((rule: any, index: number) => {
              content += `${index + 1}. ${rule.label}: ${rule.passed ? '✅ Passed' : '❌ Failed'}\n`
            })
          } else if (section.type === 'attributes') {
            section.content.forEach((attr: any) => {
              content += `• ${attr.label}: ${attr.value}\n`
            })
          } else if (section.type === 'diagram') {
            content += `Sequence Diagram Steps:\n`
            section.content.forEach((step: any, index: number) => {
              content += `${index + 1}. ${step.from} → ${step.to}: ${step.message}\n`
              if (step.note) content += `   Note: ${step.note}\n`
            })
          }
          content += '\n\n'
        }
      })
    }
    
    return content
  }

  const handleExport = async (format: string) => {
    setIsExporting(true)
    
    try {
      const content = generateExportContent(format)
      
      if (format === 'json') {
        const jsonData = {
          title: data.title,
          exportedAt: new Date().toISOString(),
          sections: data.sections.filter(section => 
            selectedSections.length === 0 || selectedSections.includes(section.name)
          )
        }
        
        const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${data.title.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.json`
        a.click()
        URL.revokeObjectURL(url)
      } else if (format === 'csv') {
        // Extract table data for CSV
        const tableData = data.sections.find(s => s.type === 'table')
        if (tableData) {
          const headers = Object.keys(tableData.content[0] || {})
          let csvContent = headers.join(',') + '\n'
          tableData.content.forEach((row: any) => {
            csvContent += Object.values(row).map((val: any) => `"${val}"`).join(',') + '\n'
          })
          
          const blob = new Blob([csvContent], { type: 'text/csv' })
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = `${data.title.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.csv`
          a.click()
          URL.revokeObjectURL(url)
        }
      } else {
        // PDF and Word export using text format
        const mimeType = format === 'pdf' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        const extension = format === 'pdf' ? 'pdf' : 'docx'
        
        // For now, export as text file (would need proper PDF/Word generation library)
        const blob = new Blob([content], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${data.title.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.txt`
        a.click()
        URL.revokeObjectURL(url)
      }
      
      setIsOpen(false)
    } catch (error) {
      console.error('Export failed:', error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className={`relative ${className}`}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-700 transition-all shadow-sm"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="text-base">📤</span>
        <span>Export</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-xl shadow-lg py-4 min-w-80 z-50"
          >
            <div className="px-4 py-2 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Export Options</h3>
              <p className="text-sm text-gray-600">Choose sections and format to export</p>
            </div>

            {/* Section Selection */}
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="text-sm font-medium text-gray-700 mb-2">Sections to Include:</div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedSections.length === 0}
                    onChange={() => setSelectedSections([])}
                    className="rounded border-gray-300"
                  />
                  <span>All Sections</span>
                </label>
                {data.sections.map((section) => (
                  <label key={section.name} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={selectedSections.includes(section.name)}
                      onChange={() => handleSectionToggle(section.name)}
                      className="rounded border-gray-300"
                    />
                    <span>{section.name}</span>
                    <span className="text-xs text-gray-500">({section.content.length} items)</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Format Selection */}
            <div className="px-4 py-3">
              <div className="text-sm font-medium text-gray-700 mb-3">Export Format:</div>
              <div className="space-y-2">
                {exportFormats.map((format) => (
                  <motion.button
                    key={format.id}
                    onClick={() => handleExport(format.id)}
                    disabled={isExporting}
                    className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-50"
                    whileHover={{ backgroundColor: 'rgb(249 250 251)' }}
                  >
                    <span className="text-xl">{format.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{format.name}</div>
                      <div className="text-sm text-gray-600">{format.description}</div>
                    </div>
                    {isExporting && (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="px-4 py-2 border-t border-gray-100">
              <div className="text-xs text-gray-500">
                Files will be downloaded to your device
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}