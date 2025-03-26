import React from 'react';

interface StaticPageLayoutProps {
  children: React.ReactNode;
  title: string;
  lastUpdated?: string;
}

export default function StaticPageLayout({ children, title, lastUpdated }: StaticPageLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
        {lastUpdated && (
          <p className="text-sm text-gray-500 mb-8">Zuletzt aktualisiert: {lastUpdated}</p>
        )}
        <div className="prose prose-lg max-w-none">
          {children}
        </div>
      </div>
    </div>
  );
} 