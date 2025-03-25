import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Trash2, Ban, CheckCircle } from 'lucide-react'
import DataTable from './DataTable'

interface User {
  id: string
  email: string
  role: string
  last_login: string
  is_active: boolean
}

interface UsersTableProps {
  users: User[]
  onUpdate: () => void
}

export default function UsersTable({ users, onUpdate }: UsersTableProps) {
  const supabase = createClientComponentClient()
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async (userId: string) => {
    if (!confirm('Möchten Sie diesen Nutzer wirklich löschen?')) return

    setIsLoading(true)
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', userId)

      if (error) throw error
      onUpdate()
    } catch (error) {
      console.error('Failed to delete user:', error)
      alert('Fehler beim Löschen des Nutzers')
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggleActive = async (userId: string, currentStatus: boolean) => {
    setIsLoading(true)
    try {
      const { error } = await supabase
        .from('users')
        .update({ is_active: !currentStatus })
        .eq('id', userId)

      if (error) throw error
      onUpdate()
    } catch (error) {
      console.error('Failed to update user status:', error)
      alert('Fehler beim Aktualisieren des Nutzerstatus')
    } finally {
      setIsLoading(false)
    }
  }

  const columns = [
    {
      key: 'email' as keyof User,
      label: 'E-Mail'
    },
    {
      key: 'role' as keyof User,
      label: 'Rolle',
      render: (user: User) => (
        <span className="capitalize">{user.role}</span>
      )
    },
    {
      key: 'last_login' as keyof User,
      label: 'Letzter Login',
      render: (user: User) => (
        <span>
          {user.last_login
            ? new Date(user.last_login).toLocaleDateString('de-DE')
            : 'Nie'}
        </span>
      )
    },
    {
      key: 'is_active' as keyof User,
      label: 'Status',
      render: (user: User) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          user.is_active
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {user.is_active ? 'Aktiv' : 'Inaktiv'}
        </span>
      )
    },
    {
      key: 'id' as keyof User,
      label: 'Aktionen',
      render: (user: User) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleToggleActive(user.id, user.is_active)}
            className="text-gray-600 hover:text-purple-600"
            title={user.is_active ? 'Deaktivieren' : 'Aktivieren'}
          >
            {user.is_active ? (
              <Ban className="h-5 w-5" />
            ) : (
              <CheckCircle className="h-5 w-5" />
            )}
          </button>
          <button
            onClick={() => handleDelete(user.id)}
            className="text-gray-600 hover:text-red-600"
            title="Löschen"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      )
    }
  ]

  return (
    <DataTable
      columns={columns}
      data={users}
      isLoading={isLoading}
      emptyMessage="Keine Nutzer gefunden"
    />
  )
} 