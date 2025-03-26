'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js'
import ChatContainer from '@/components/chat/ChatContainer'
import ChatInput from '@/components/chat/ChatInput'
import { supabase, getCurrentUser, redirectToLogin } from '@/lib/supabase'
import Container from '@/components/ui/Container'

interface Message {
  id: string
  content: string
  sender_id: string
  created_at: string
}

type MessagePayload = RealtimePostgresChangesPayload<Message>

export default function ChatPage() {
  const router = useRouter()
  const params = useParams()
  const vehicleId = params.vehicleId as string
  const [messages, setMessages] = useState<Message[]>([])
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initializeChat = async () => {
      try {
        const user = await getCurrentUser()
        if (!user) {
          redirectToLogin()
          return
        }
        setCurrentUserId(user.id)
        
        const { data, error: fetchError } = await supabase
          .from('messages')
          .select('*')
          .eq('vehicle_id', vehicleId)
          .order('created_at', { ascending: true })

        if (fetchError) throw fetchError
        setMessages(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten')
      } finally {
        setIsLoading(false)
      }
    }

    initializeChat()
  }, [vehicleId])

  useEffect(() => {
    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `vehicle_id=eq.${vehicleId}`,
        },
        (payload: MessagePayload) => {
          if (payload.new) {
            setMessages((prev) => [...prev, payload.new])
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [vehicleId])

  const handleSendMessage = async (content: string) => {
    if (!currentUserId) {
      setError('Bitte melden Sie sich an, um Nachrichten zu senden')
      return
    }

    try {
      const { error: sendError } = await supabase.from('messages').insert({
        vehicle_id: vehicleId,
        sender_id: currentUserId,
        content,
      })

      if (sendError) throw sendError
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Senden der Nachricht')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md">
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => router.refresh()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Erneut versuchen
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-white">
      <div className="flex-1 overflow-hidden">
        <ChatContainer messages={messages} currentUserId={currentUserId} />
      </div>
      <ChatInput
        onSendMessage={handleSendMessage}
        disabled={!currentUserId}
      />
    </div>
  )
} 