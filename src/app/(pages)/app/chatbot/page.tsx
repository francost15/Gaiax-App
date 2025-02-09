"use client";

import type React from "react";
import { useRef, useEffect } from "react";
import { useChat } from "ai/react";
import { Send } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  Input,
} from "@/components";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { RiRobot3Line } from "react-icons/ri";

function useShortcutHandler(
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleSubmit: (e: React.FormEvent) => void
) {
  return (content: string) => {
    handleInputChange({
      target: { value: content },
    } as unknown as React.ChangeEvent<HTMLInputElement>);
    handleSubmit({ preventDefault: () => {} } as React.FormEvent);
  };
}

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages: [
      {
        id: "1",
        role: "assistant",
        content: `¡Hola! 👋 Soy tu asistente virtual. ¿Cómo puedo ayudarte hoy?

Puedo ayudarte con:
• Desarrollo web y programación
• Análisis de datos
• Diseño UI/UX
• Mejores prácticas de código`,
      },
    ],
  });

  const shortcutHandler = useShortcutHandler(handleInputChange, handleSubmit);

  // Ref para hacer scroll al fondo al recibir nuevos mensajes
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [scrollRef]); // Updated dependency

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-neutral-900">
      {/* Contenedor para los mensajes con scroll */}
      <div
        className="flex-1 overflow-auto max-h-[80%] p-4 md:p-6"
        ref={scrollRef}
      >
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3 md:gap-6 transition duration-300 ease-out",
                message.role === "user" && "justify-end"
              )}
            >
              {message.role === "assistant" && (
                <Avatar className="w-8 h-8 md:w-10 md:h-10">
                  <AvatarImage src="/bot-avatar.png" />
                  <AvatarFallback className="text-white bg-primaryper">
                    <RiRobot3Line className="w-6 h-6" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  "flex flex-col gap-1.5 max-w-[90%]",
                  message.role === "user" ? "items-end" : "items-start"
                )}
              >
                <Card
                  className={cn(
                    "p-3 md:p-4 shadow-sm text-sm md:text-base rounded-ss-xl rounded-ee-xl border transition duration-300 ease-out",
                    message.role === "assistant"
                      ? "bg-primaryper text-white border-primary-600 dark:border-primaryper"
                      : "bg-white dark:bg-neutral-900 border-none "
                  )}
                >
                  <ReactMarkdown
                    className="leading-relaxed whitespace-pre-wrap"
                    components={{
                      a: ({ node, ...props }) => (
                        <a
                          {...props}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white text-primaryper rounded-xl "
                        />
                      ),
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contenedor para atajos e input de envío */}
      <div className="p-4 bg-white md:p-6 dark:bg-neutral-900 dark:border-neutral-800">
        <div className="space-y-4">
          <form onSubmit={handleSubmit} className="flex gap-2 md:gap-4">
            <Input
              name="prompt"
              value={input}
              onChange={handleInputChange}
              placeholder="Escribe un mensaje..."
              className="flex-1 border-gray-300 dark:border-neutral-800"
            />
            <Button
              type="submit"
              size="icon"
              className="text-white bg-primaryper hover:bg-primary-hover"
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
