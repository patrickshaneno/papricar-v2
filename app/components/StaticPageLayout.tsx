import { ReactNode } from 'react'

interface StaticPageLayoutProps {
  title: string
  children: ReactNode
  lastUpdated?: string
}

export default function StaticPageLayout({ title, children, lastUpdated }: StaticPageLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-screen-md mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            {title}
          </h1>
          
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
            {children}
            
            {lastUpdated && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Letzte Änderung am {lastUpdated}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 