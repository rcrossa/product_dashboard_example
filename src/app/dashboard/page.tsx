'use client';

import { signOut, useSession } from 'next-auth/react';
import { ProductTable } from '@/presentation/components/products/product-table';
import { ThemeToggle } from '@/presentation/components/theme-toggle';

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <nav className="bg-blue-500 dark:bg-gray-800 shadow-md border-b border-blue-600 dark:border-gray-700 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-linear-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-white dark:text-white">Product Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-white dark:text-gray-300 hidden sm:block">
                {session?.user?.email}
              </span>
              <ThemeToggle />
              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="px-4 py-2 text-sm font-medium text-white dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductTable />
      </main>
    </div>
  );
}
