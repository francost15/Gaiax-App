import { MessageCircle } from "lucide-react";
import { ChatbotButtonProps } from "@/interface";

export const ChatbotButton = ({ onClick, className }: ChatbotButtonProps) => {
  return (
    <button
      title="chatbot"
      name="chatbot"
      onClick={onClick}
      className={`flex items-center justify-center rounded-full w-14 h-14 bg-primaryper hover:bg-primary-hover text-white shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 z-50 ${className}`}
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  );
};
