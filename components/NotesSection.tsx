'use client'
import { useState } from 'react'

export function NotesSection() {
  const [notes, setNotes] = useState('')
  const [savedNotes, setSavedNotes] = useState<string[]>([])

  const addNote = () => {
    if (notes.trim()) {
      setSavedNotes(prev => [...prev, notes.trim()])
      setNotes('')
    }
  }

  const removeNote = (index: number) => {
    setSavedNotes(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes</h3>
      
      {/* Notes Input */}
      <div className="space-y-3">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Enter your notes about instalment models..."
          className="w-full h-24 px-3 py-2 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
              e.preventDefault()
              addNote()
            }
          }}
        />
        
        <button
          onClick={addNote}
          disabled={!notes.trim()}
          className="w-full px-3 py-2 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Add Note
        </button>
      </div>

      {/* Saved Notes */}
      {savedNotes.length > 0 && (
        <div className="mt-5 pt-5 border-t border-gray-100">
          <div className="text-sm font-medium text-gray-900 mb-3">Your Notes ({savedNotes.length})</div>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {savedNotes.map((note, index) => (
              <div key={index} className="group flex items-start gap-2 p-2 bg-gray-50 rounded-lg">
                <div className="flex-1 text-sm text-gray-700 break-words">
                  • {note}
                </div>
                <button
                  onClick={() => removeNote(index)}
                  className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          
          {savedNotes.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <button
                onClick={() => {
                  const summary = `Notes Summary:\n${savedNotes.map((note, i) => `${i + 1}. ${note}`).join('\n')}`
                  navigator.clipboard.writeText(summary)
                }}
                className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
              >
                📋 Copy all notes
              </button>
            </div>
          )}
        </div>
      )}

      {savedNotes.length === 0 && (
        <div className="mt-5 pt-5 border-t border-gray-100">
          <div className="text-xs text-gray-500 italic">
            No notes yet. Add notes to track your observations about different instalment models.
          </div>
        </div>
      )}
    </div>
  )
}