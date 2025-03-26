import React from 'react';

interface StaticPageLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function StaticPageLayout({ children, title }: StaticPageLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{title}</h1>
        <div className="prose prose-lg max-w-none">
          {children}
        </div>
      </div>
    </div>
  );
} 