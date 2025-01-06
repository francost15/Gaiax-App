'use client'

import { useState, useEffect } from 'react'
import { ChatbotButton } from './chatbot_button'
import { ChatbotWindow } from './chatbot_window'

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const toggleChatbot = () => setIsOpen(!isOpen)

  return (
    <>
      {!isOpen && <ChatbotButton onClick={toggleChatbot} />}
      {isOpen && <ChatbotWindow onClose={toggleChatbot} isMobile={isMobile} />}
    </>
  )
}

