"use client";

import { useRef, useEffect } from "react";
import { X, Send } from "lucide-react";
import { Input, Button } from "@/components";
import { ChatMessage } from "./chat_message";
import { useChatStore } from "@/store";

export const ChatbotWindow = () => {
  const messages = useChatStore((state) => state.messages);
  const input = useChatStore((state) => state.input);
  const setMessages = useChatStore((state) => state.setMessages);
  const setInput = useChatStore((state) => state.setInput);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const onClose = useChatStore((state) => state.closeChat);
  const isMobile = useChatStore((state) => state.isMobile);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }]);
      setTimeout(() => {
        setMessages((prev: { text: string; isUser: boolean }[]) => [
          ...prev,
          {
            text: "Gracias por tu mensaje. ¿Puedo ayudarte en algo más?",
            isUser: false,
          },
        ]);
      }, 1000);
      setInput("");
    }
  };

  return (
    <div
      className={`fixed ${
        isMobile ? "inset-0" : "bottom-4 right-4 w-96 h-[32rem]"
      } bg-white dark:bg-neutral-800 rounded-xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ease-in-out z-50`}
    >
      <div className="p-4 bg-primaryper text-white flex justify-between items-center">
        <h3 className="font-semibold text-lg">Asistente gX</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-white hover:bg-primary-hover"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 bg-gray-50 dark:bg-neutral-700 flex">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="flex-1 mr-2 bg-white dark:bg-neutral-600 border-gray-300 dark:border-neutral-500"
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <Button
          onClick={handleSend}
          className="bg-primaryper hover:bg-primary-hover text-white"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
