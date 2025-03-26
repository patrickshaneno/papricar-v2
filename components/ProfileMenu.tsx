'use client'

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { UserCircleIcon } from '@heroicons/react/24/outline'

interface ProfileMenuProps {
  user: {
    email: string
    role: string
  }
}

export default function ProfileMenu({ user }: ProfileMenuProps) {
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors duration-200">
        <UserCircleIcon className="w-6 h-6" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
              {user.email}
            </div>
            
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => router.push('/admin/dashboard')}
                  className={`${
                    active ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                  } group flex w-full items-center px-4 py-2 text-sm`}
                >
                  Admin Dashboard
                </button>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleSignOut}
                  className={`${
                    active ? 'bg-red-50 text-red-600' : 'text-gray-700'
                  } group flex w-full items-center px-4 py-2 text-sm`}
                >
                  Abmelden
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
} 