import { Chatbot, NavbarApp, Sidebar } from '@/components'
import { redirect } from 'next/navigation'
import { auth } from '@/auth.config'

export default async function LayoutClient({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await auth();
  if(!session){
    redirect("/auth/login")
  }
  return (
    <div className="text-gray-900 bg-gray-50 dark:bg-neutral-800 dark:text-gray-100">
      <Sidebar />
      <div>
        <NavbarApp />
        <main  className="min-h-screen px-4 py-8 sm:px-6 lg:px-8" >
          {children}
        </main>
      </div>
      <Chatbot />
    </div>
  )
}

