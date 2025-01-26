"use client";

import { ChatbotButton } from "./chatbot_button";
import { ChatbotWindow } from "./chatbot_window";
import { useChatStore } from "@/store";

export const Chatbot = () => {
  const isOpenChat = useChatStore((state) => state.isChatOpen);

  const openChat = useChatStore((state) => state.openChat);
  const closeChat = useChatStore((state) => state.closeChat);

  const toggleChatbot = () => {
    if (isOpenChat) {
      closeChat();
    } else {
      openChat();
    }
  };

  return (
    <>
      {!isOpenChat && (
        <ChatbotButton
          onClick={toggleChatbot}
          className="fixed bottom-16 mt-2 lg:mt-0 right-4 lg:bottom-4"
        />
      )}
      {isOpenChat && (
        <ChatbotWindow className="fixed bottom-16 right-4 lg:bottom-4" />
      )}
    </>
  );
};
