import { MessageCircle } from 'lucide-react'
import { ChatbotButtonProps } from '@/interface'

export const ChatbotButton = ({ onClick }: ChatbotButtonProps) => {
  return (
    <button
      title="chatbot"
      name="chatbot"
      onClick={onClick}
      className="fixed bottom-4 right-4 flex items-center justify-center rounded-full w-14 h-14 bg-primaryper hover:bg-primary-hover text-white shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 z-50"
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  )
}

