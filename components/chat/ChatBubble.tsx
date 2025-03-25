'use client'

interface ChatBubbleProps {
  message: string
  timestamp: string
  isUser: boolean
  senderName?: string
}

export default function ChatBubble({
  message,
  timestamp,
  isUser,
  senderName,
}: ChatBubbleProps) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
          isUser
            ? 'bg-primary text-white rounded-br-none'
            : 'bg-white text-gray-900 rounded-bl-none shadow-sm'
        }`}
      >
        {!isUser && senderName && (
          <div className="text-xs font-medium text-gray-500 mb-1">
            {senderName}
          </div>
        )}
        <p className="text-sm">{message}</p>
        <div
          className={`text-xs mt-1 ${
            isUser ? 'text-white/70' : 'text-gray-500'
          }`}
        >
          {timestamp}
        </div>
      </div>
    </div>
  )
} 