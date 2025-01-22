import { ChatMessageProps } from "@/interface";

export const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] p-3 rounded-xl ${
          message.isUser
            ? "bg-primaryper text-white"
            : "bg-gray-100 dark:bg-neutral-700 text-gray-800 dark:text-gray-200"
        } shadow-md`}
      >
        <p className="text-sm">{message.text}</p>
      </div>
    </div>
  );
};
