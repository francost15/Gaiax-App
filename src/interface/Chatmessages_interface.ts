export interface ChatMessageProps {
  message: {
    text: string;
    isUser: boolean;
  };
}

export interface ChatbotButtonProps {
  onClick: () => void;
  className: string;
}

export interface ChatbotWindowProps {
  onClose: () => void;
  isMobile: boolean;
}
