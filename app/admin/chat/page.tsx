import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import ChatContainer from '@/components/ChatContainer'

export default async function ChatPage() {
  const supabase = createServerComponentClient({ cookies })
  
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single()

  if (profile?.role !== 'dealer') {
    redirect('/')
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Chat</h1>
        <p className="text-gray-600">Kommunizieren Sie mit Ihren Kunden</p>
      </div>

      <div className="bg-white shadow rounded-xl overflow-hidden">
        <ChatContainer userRole="dealer" />
      </div>
    </div>
  )
} 