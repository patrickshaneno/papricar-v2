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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  if (messages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <p>Keine Nachrichten vorhanden</p>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
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