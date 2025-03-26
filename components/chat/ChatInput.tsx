'use client'

import { useState } from 'react'

export default function ChatInput({ onSend }: { onSend: (message: string) => void }) {
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return
    onSend(message.trim())
    setMessage('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex p-2 border-t">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Nachricht schreiben..."
        className="flex-grow p-2 rounded-l-md border border-gray-300"
      />
      <button type="submit" className="bg-black text-white px-4 rounded-r-md">
        Senden
      </button>
    </form>
  )
} 