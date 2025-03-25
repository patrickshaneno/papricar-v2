'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import ChatHeader from '@/components/chat/ChatHeader'
import ChatBubble from '@/components/chat/ChatBubble'
import ChatInput from '@/components/chat/ChatInput'
import { supabase, Message, ChatUser } from '@/lib/supabaseClient'

// Mock-Daten für ein Beispielfahrzeug
const mockVehicle = {
  id: '1',
  title: 'BMW M3 Competition',
  dealer: {
    name: 'BMW München',
    logo: '/images/dealers/bmw.png',
  },
  image: '/images/vehicles/bmw-m3.jpg',
}

// Mock-Benutzer (später durch echte Auth ersetzen)
const mockUser: ChatUser = {
  id: 'user-1',
  name: 'Max Mustermann',
  role: 'user',
}

const mockDealer: ChatUser = {
  id: 'dealer-1',
  name: 'BMW München',
  role: 'dealer',
}

export default function ChatPage() {
  const params = useParams()
  const [isQualified, setIsQualified] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const subscriptionRef = useRef<any>(null)
  const [currentUser, setCurrentUser] = useState<ChatUser | null>(null)

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Fetch initial messages and setup realtime subscription
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .eq('vehicle_id', params.vehicleId)
          .order('created_at', { ascending: true })

        if (error) throw error
        setMessages(data || [])
      } catch (error) {
        console.error('Error fetching messages:', error)
      } finally {
        setIsLoading(false)
      }
    }

    // Setup realtime subscription
    subscriptionRef.current = supabase
      .channel(`messages:${params.vehicleId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `vehicle_id=eq.${params.vehicleId}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message])
        }
      )
      .subscribe()

    fetchMessages()

    // Cleanup subscription on unmount
    return () => {
      subscriptionRef.current?.unsubscribe()
    }
  }, [params.vehicleId])

  // Simulate user authentication (später durch echte Auth ersetzen)
  useEffect(() => {
    // In einer echten App würde hier die Auth-Session überprüft
    setCurrentUser(mockUser)
    setIsQualified(true)
  }, [])

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || !currentUser) return

    setIsSending(true)
    try {
      const newMessage: Omit<Message, 'id' | 'created_at' | 'is_read'> = {
        vehicle_id: params.vehicleId as string,
        sender_id: currentUser.id,
        recipient_id: currentUser.role === 'user' ? mockDealer.id : mockUser.id,
        content: content.trim(),
      }

      const { error } = await supabase.from('messages').insert([newMessage])
      if (error) throw error
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsSending(false)
    }
  }

  if (!isQualified) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-6 text-center">
          <p className="text-gray-600 mb-6">
            Bitte senden Sie eine Anfrage und bestätigen Sie Ihr Interesse, um mit
            dem Händler zu chatten.
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors"
          >
            Anfrage senden
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <ChatHeader
        vehicleTitle={mockVehicle.title}
        dealerName={mockVehicle.dealer.name}
        dealerLogo={mockVehicle.dealer.logo}
        vehicleImage={mockVehicle.image}
        vehicleId={mockVehicle.id}
      />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            Keine Nachrichten vorhanden. Starten Sie die Konversation!
          </div>
        ) : (
          messages.map((msg) => (
            <ChatBubble
              key={msg.id}
              message={msg.content}
              timestamp={new Date(msg.created_at).toLocaleTimeString('de-DE', {
                hour: '2-digit',
                minute: '2-digit',
              })}
              isUser={msg.sender_id === currentUser?.id}
              senderName={msg.sender_id === currentUser?.id ? undefined : mockDealer.name}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput
        onSend={handleSendMessage}
        disabled={isSending}
        isDealer={currentUser?.role === 'dealer'}
        dealerId={currentUser?.role === 'dealer' ? currentUser.id : undefined}
      />
    </div>
  )
} 