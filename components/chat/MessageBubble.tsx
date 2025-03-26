'use client'

interface MessageBubbleProps {
  content: string
  isOwnMessage: boolean
  timestamp: string
}

export default function MessageBubble({ content, isOwnMessage, timestamp }: MessageBubbleProps) {
  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[70%] rounded-2xl p-4 ${
          isOwnMessage
            ? 'bg-blue-600 text-white rounded-br-none'
            : 'bg-gray-100 text-gray-900 rounded-bl-none'
        }`}
      >
        <p className="text-sm">{content}</p>
        <span
          className={`text-xs mt-1 block ${
            isOwnMessage ? 'text-blue-100' : 'text-gray-500'
          }`}
        >
          {new Date(timestamp).toLocaleTimeString('de-DE', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    </div>
  )
} 