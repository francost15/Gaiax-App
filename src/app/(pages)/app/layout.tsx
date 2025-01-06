'use client'

import { useState } from 'react'

import { Chatbot, NavbarApp, Sidebar } from '@/components'

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="text-gray-900 bg-gray-50 dark:bg-neutral-800 dark:text-gray-100 no-b">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div>
        <NavbarApp isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <main  className="min-h-screen px-4 py-8 sm:px-6 lg:px-8" >
          {children}
        </main>
      </div>
      <Chatbot />
    </div>
  )
}

