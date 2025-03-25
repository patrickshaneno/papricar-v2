'use client'

import { useState, useRef, useEffect } from 'react'
import CannedMessages from './CannedMessages'

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
  isDealer?: boolean
  dealerId?: string
}

export default function ChatInput({
  onSend,
  disabled,
  isDealer,
  dealerId,
}: ChatInputProps) {
  const [message, setMessage] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !disabled) {
      onSend(message)
      setMessage('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleSelectMessage = (content: string) => {
    setMessage(content)
    textareaRef.current?.focus()
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [message])

  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
      <div className="flex items-end space-x-4">
        {isDealer && dealerId && (
          <div className="hidden md:block">
            <CannedMessages
              dealerId={dealerId}
              onSelectMessage={handleSelectMessage}
            />
          </div>
        )}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Schreiben Sie eine Nachricht..."
            className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-gray-50 disabled:text-gray-500"
            rows={1}
            disabled={disabled}
          />
          <div className="absolute bottom-2 right-2 text-xs text-gray-400">
            Enter zum Senden, Shift + Enter für neue Zeile
          </div>
        </div>
        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className="rounded-xl bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {disabled ? 'Wird gesendet...' : 'Senden'}
        </button>
      </div>
    </form>
  )
} 