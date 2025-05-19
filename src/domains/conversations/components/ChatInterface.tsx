"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Bot, Paperclip, Mic } from "lucide-react"
import { conversationService } from "../services/conversationService"
import type { Message } from "../types/conversation.types"

interface ChatInterfaceProps {
  agentId: string
  agentName: string
  agentIconUrl?: string
  conversationId?: string
  initialMessages?: Message[]
}

export function ChatInterface({
  agentId,
  agentName,
  agentIconUrl,
  conversationId,
  initialMessages = [],
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: `temp-${Date.now()}`,
      content: inputValue,
      role: "user",
      createdAt: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      const response = await conversationService.sendMessage({
        agentId,
        content: inputValue,
        conversationId,
      })

      setMessages((prev) => [
        ...prev,
        {
          id: response.id,
          content: response.content,
          role: "assistant",
          createdAt: new Date(response.createdAt),
        },
      ])
    } catch (error) {
      console.error("Error sending message:", error)
      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          content: "Ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.",
          role: "system",
          createdAt: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Card className="flex flex-col h-[calc(100vh-12rem)] max-w-4xl mx-auto">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src={agentIconUrl || "/placeholder.svg"} alt={agentName} />
            <AvatarFallback>
              <Bot className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          {agentName}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Bot className="h-12 w-12 mx-auto mb-2" />
              <p>Envie uma mensagem para iniciar a conversa com {agentName}</p>
            </div>
          ) : (
            messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`flex items-start max-w-[80%] ${
                    message.role === "user"
                      ? "bg-blue-500 text-white rounded-l-lg rounded-tr-lg"
                      : message.role === "system"
                        ? "bg-gray-200 text-gray-800 rounded-lg"
                        : "bg-gray-100 text-gray-800 rounded-r-lg rounded-tl-lg"
                  } p-3`}
                >
                  {message.role !== "user" && (
                    <Avatar className="h-8 w-8 mr-2 mt-0.5">
                      {message.role === "assistant" ? (
                        <>
                          <AvatarImage src={agentIconUrl || "/placeholder.svg"} alt={agentName} />
                          <AvatarFallback>
                            <Bot className="h-5 w-5" />
                          </AvatarFallback>
                        </>
                      ) : (
                        <AvatarFallback>
                          <Bot className="h-5 w-5" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                  )}
                  <div>
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    <div className="text-xs opacity-70 mt-1 text-right">
                      {message.createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.2s" }} />
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.4s" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter className="border-t p-4">
        <div className="flex items-center w-full gap-2">
          <Button variant="ghost" size="icon" className="text-gray-500">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input
            placeholder="Digite sua mensagem..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            className="flex-1"
          />
          <Button variant="ghost" size="icon" className="text-gray-500">
            <Mic className="h-5 w-5" />
          </Button>
          <Button onClick={handleSendMessage} disabled={!inputValue.trim() || isLoading} size="icon">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
