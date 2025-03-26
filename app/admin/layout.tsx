'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminTopbar from '@/components/admin/AdminTopbar'
import { toast } from 'sonner'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (!session) {
          toast.error('Bitte melden Sie sich an')
          router.push('/login')
          return
        }

        const { data: profile } = await supabase
          .from('profiles')
          .select('role, is_admin')
          .eq('id', session.user.id)
          .single()

        if (!profile?.is_admin && profile?.role !== 'dealer') {
          toast.error('Keine Berechtigung für den Admin-Bereich')
          router.push('/')
        }
      } catch (error) {
        console.error('Auth check error:', error)
        toast.error('Fehler bei der Authentifizierung')
        router.push('/login')
      }
    }

    checkAuth()
  }, [router, supabase])

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="md:pl-64">
        <AdminTopbar />
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
} 