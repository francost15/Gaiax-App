export interface ChatMessageProps {
  message: {
    text: string;
    isUser: boolean;
  };
}

export interface ChatbotButtonProps {
  onClick: () => void;
}

export interface ChatbotWindowProps {
  onClose: () => void;
  isMobile: boolean;
}
