'use client'

import { useState } from 'react'
import { TEST_ACCOUNTS } from '@/lib/test-accounts'
import { handleTestLogin } from '@/lib/supabase'

export default function TestAccounts() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)
    try {
      await handleTestLogin(email, password)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200 max-w-sm">
      <h3 className="text-sm font-medium text-gray-900 mb-2">Testkonten</h3>
      <div className="space-y-2">
        <div className="text-xs text-gray-500">
          <p>User: {TEST_ACCOUNTS.user.email}</p>
          <p>Händler: {TEST_ACCOUNTS.dealer.email}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleLogin(TEST_ACCOUNTS.user.email, TEST_ACCOUNTS.user.password)}
            disabled={isLoading}
            className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Als User einloggen
          </button>
          <button
            onClick={() => handleLogin(TEST_ACCOUNTS.dealer.email, TEST_ACCOUNTS.dealer.password)}
            disabled={isLoading}
            className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            Als Händler einloggen
          </button>
        </div>
        {error && (
          <p className="text-xs text-red-600 mt-2">{error}</p>
        )}
      </div>
    </div>
  )
} 