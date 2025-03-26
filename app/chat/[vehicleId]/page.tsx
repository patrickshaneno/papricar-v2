'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js'
import ChatContainer from '@/components/chat/ChatContainer'
import ChatInput from '@/components/chat/ChatInput'

interface Message {
  id: string
  content: string
  sender_id: string
  created_at: string
}

type MessagePayload = RealtimePostgresChangesPayload<Message>

export default function ChatPage() {
  const params = useParams()
  const vehicleId = params.vehicleId as string
  const [messages, setMessages] = useState<Message[]>([])
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setCurrentUserId(user?.id || null)
    }
    checkUser()
  }, [supabase.auth])

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('vehicle_id', vehicleId)
        .order('created_at', { ascending: true })

      if (error) {
        console.error('Error fetching messages:', error)
        return
      }

      setMessages(data || [])
      setIsLoading(false)
    }

    fetchMessages()
  }, [vehicleId, supabase])

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
  }, [vehicleId, supabase])

  const handleSendMessage = async (content: string) => {
    if (!currentUserId) {
      console.error('User not authenticated')
      return
    }

    const { error } = await supabase.from('messages').insert({
      vehicle_id: vehicleId,
      sender_id: currentUserId,
      content,
    })

    if (error) {
      console.error('Error sending message:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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