'use client'

import { useState, useEffect, useRef } from 'react'
import { CannedMessage } from '@/lib/supabaseClient'
import { supabase } from '@/lib/supabaseClient'

interface CannedMessagesProps {
  dealerId: string
  onSelectMessage: (content: string) => void
}

export default function CannedMessages({
  dealerId,
  onSelectMessage,
}: CannedMessagesProps) {
  const [messages, setMessages] = useState<CannedMessage[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from('canned_messages')
          .select('*')
          .eq('dealer_id', dealerId)
          .order('created_at', { ascending: false })

        if (error) throw error
        setMessages(data || [])
      } catch (error) {
        console.error('Error fetching canned messages:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMessages()
  }, [dealerId])

  // Schließe Dropdown bei Klick außerhalb
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleQuickSend = (content: string) => {
    onSelectMessage(content)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
        <span>Vorgefertigte Nachrichten</span>
        <svg
          className={`w-4 h-4 transform transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 animate-fade-in">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-900">
                Vorgefertigte Nachrichten
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {isLoading ? (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
              </div>
            ) : messages.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                Keine vorgefertigten Nachrichten vorhanden
              </p>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="group flex items-start space-x-2 p-2 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">
                        {msg.title}
                      </h4>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {msg.content}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => onSelectMessage(msg.content)}
                        className="p-1 text-gray-400 hover:text-primary"
                        title="In Eingabefeld einfügen"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleQuickSend(msg.content)}
                        className="p-1 text-gray-400 hover:text-primary"
                        title="Direkt senden"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
} 