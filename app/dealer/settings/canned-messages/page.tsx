'use client'

import { useState, useEffect } from 'react'
import { CannedMessage } from '@/lib/supabaseClient'
import { supabase } from '@/lib/supabaseClient'
import { Dialog } from '@headlessui/react'

// Mock-Daten für den Händler (später durch echte Auth ersetzen)
const mockDealer = {
  id: 'dealer-1',
  name: 'BMW München',
}

export default function CannedMessagesPage() {
  const [messages, setMessages] = useState<CannedMessage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingMessage, setEditingMessage] = useState<CannedMessage | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('canned_messages')
        .select('*')
        .eq('dealer_id', mockDealer.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setMessages(data || [])
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    if (!formData.title.trim()) newErrors.title = 'Titel ist erforderlich'
    if (!formData.content.trim()) newErrors.content = 'Inhalt ist erforderlich'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      if (editingMessage) {
        const { error } = await supabase
          .from('canned_messages')
          .update({
            title: formData.title,
            content: formData.content,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingMessage.id)

        if (error) throw error
      } else {
        const { error } = await supabase.from('canned_messages').insert([
          {
            dealer_id: mockDealer.id,
            title: formData.title,
            content: formData.content,
          },
        ])

        if (error) throw error
      }

      setIsModalOpen(false)
      setEditingMessage(null)
      setFormData({ title: '', content: '' })
      fetchMessages()
    } catch (error) {
      console.error('Error saving message:', error)
    }
  }

  const handleEdit = (message: CannedMessage) => {
    setEditingMessage(message)
    setFormData({
      title: message.title,
      content: message.content,
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (message: CannedMessage) => {
    if (!confirm('Möchten Sie diese Nachricht wirklich löschen?')) return

    try {
      const { error } = await supabase
        .from('canned_messages')
        .delete()
        .eq('id', message.id)

      if (error) throw error
      fetchMessages()
    } catch (error) {
      console.error('Error deleting message:', error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Vorgefertigte Nachrichten
        </h1>
        <button
          onClick={() => {
            setEditingMessage(null)
            setFormData({ title: '', content: '' })
            setIsModalOpen(true)
          }}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Neue Nachricht
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            Keine vorgefertigten Nachrichten vorhanden
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{message.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{message.content}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(message)}
                    className="p-2 text-gray-400 hover:text-primary"
                    title="Bearbeiten"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(message)}
                    className="p-2 text-gray-400 hover:text-red-500"
                    title="Löschen"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-lg w-full bg-white rounded-xl shadow-xl">
            <div className="p-6">
              <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
                {editingMessage ? 'Nachricht bearbeiten' : 'Neue Nachricht'}
              </Dialog.Title>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Titel
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, title: e.target.value }))
                    }
                    className={`w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary ${
                      errors.title ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Inhalt
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, content: e.target.value }))
                    }
                    rows={4}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary ${
                      errors.content ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.content && (
                    <p className="mt-1 text-sm text-red-500">{errors.content}</p>
                  )}
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-gray-700 hover:text-gray-900"
                  >
                    Abbrechen
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                  >
                    {editingMessage ? 'Speichern' : 'Erstellen'}
                  </button>
                </div>
              </form>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
} 