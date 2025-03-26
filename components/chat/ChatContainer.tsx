'use client'
import { useEffect, useRef } from 'react'
import MessageBubble from './MessageBubble'

interface Message {
  id: string
  content: string
  sender_id: string
  created_at: string
}

interface ChatContainerProps {
  messages: Message[]
  currentUserId: string | null
}

export default function ChatContainer({ messages, currentUserId }: ChatContainerProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new ResizeObserver(() => {
      scrollToBottom()
    })

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4">
        <svg
          className="w-12 h-12 mb-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
        <p className="text-lg font-medium">Keine Nachrichten vorhanden</p>
        <p className="text-sm mt-2">Beginnen Sie eine Konversation!</p>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto p-4 space-y-4 max-w-screen-lg mx-auto">
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          content={message.content}
          isOwnMessage={message.sender_id === currentUserId}
          timestamp={message.created_at}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
} 