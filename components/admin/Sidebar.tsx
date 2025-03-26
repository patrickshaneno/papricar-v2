'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import {
  HomeIcon,
  TruckIcon,
  ChatBubbleLeftRightIcon,
  BookmarkIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon },
  { name: 'Fahrzeugbestand', href: '/admin/vehicles', icon: TruckIcon },
  { name: 'Chat', href: '/admin/chat', icon: ChatBubbleLeftRightIcon },
  { name: 'Gespeicherte Fahrzeuge', href: '/admin/saved', icon: BookmarkIcon },
  { name: 'Einstellungen', href: '/admin/settings', icon: Cog6ToothIcon },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="w-64 bg-gray-900 text-white fixed h-screen px-4 py-6">
      <div className="mb-8">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>

      <nav className="space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="absolute bottom-6 left-4 right-4">
        <button
          onClick={handleSignOut}
          className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors duration-200"
        >
          <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-3" />
          Abmelden
        </button>
      </div>
    </div>
  )
} 