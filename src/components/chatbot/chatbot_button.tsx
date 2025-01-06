import { MessageCircle } from 'lucide-react'
import { Button } from '@/components'
import { ChatbotButtonProps } from '@/interface'

export const ChatbotButton = ({ onClick }: ChatbotButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-4 right-4 rounded-full w-14 h-14 bg-[#6366F1] hover:bg-[#5558DD] text-white shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 z-50"
    >
      <MessageCircle className="h-6 w-6" />
    </Button>
  )
}

