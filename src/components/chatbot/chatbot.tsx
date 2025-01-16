"use client";

import { useEffect } from "react";
import { ChatbotButton } from "./chatbot_button";
import { ChatbotWindow } from "./chatbot_window";
import { useChatStore } from "@/store";

export const Chatbot = () => {
  const isOpenChat = useChatStore((state) => state.isChatOpen);

  const openChat = useChatStore((state) => state.openChat);
  const closeChat = useChatStore((state) => state.closeChat);
  const setIsMobile = useChatStore((state) => state.setIsMobile);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [setIsMobile]);

  const toggleChatbot = () => {
    if (isOpenChat) {
      closeChat();
    } else {
      openChat();
    }
  };

  return (
    <>
      {!isOpenChat && <ChatbotButton onClick={toggleChatbot} />}
      {isOpenChat && <ChatbotWindow />}
    </>
  );
};
