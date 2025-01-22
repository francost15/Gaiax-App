import { create } from "zustand";

interface State {
  isChatOpen: boolean;
  isMobile: boolean;
  messages: Array<{ text: string; isUser: boolean }>;
  input: string;
  openChat: () => void;
  closeChat: () => void;
  setIsMobile: (isMobile: boolean) => void;
  setMessages: (
    messages:
      | Array<{ text: string; isUser: boolean }>
      | ((
          prev: Array<{ text: string; isUser: boolean }>
        ) => Array<{ text: string; isUser: boolean }>)
  ) => void;
  setInput: (input: string) => void;
}

export const useChatStore = create<State>((set) => ({
  isChatOpen: false,
  isMobile: false,
  messages: [{ text: `¡Hola! ¿En qué puedo ayudarte hoy?`, isUser: false }],
  input: "",
  openChat: () => set({ isChatOpen: true }),
  closeChat: () => set({ isChatOpen: false }),
  setIsMobile: (isMobile) => set({ isMobile }),
  setMessages: (messages) =>
    set((state) => ({
      messages:
        typeof messages === "function" ? messages(state.messages) : messages,
    })),
  setInput: (input) => set({ input }),
}));
