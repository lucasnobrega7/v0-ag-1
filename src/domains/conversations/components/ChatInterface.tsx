"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Paperclip, Mic, Bot, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { conversationService } from "../services/conversationService"
import type { Message } from "../types/conversation.types"
import type { Agent } from "@/domains/agents/types/agent.types"

interface ChatInterfaceProps {
  agent: Agent
}

/**
 * Interface de chat para interagir com um agente
 */
export function ChatInterface({ agent }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Carregar mensagens iniciais ou exibir mensagem de boas-vindas
  useEffect(() => {
    // Mensagem de boas-vindas do agente
    const welcomeMessage: Message = {
      id: "welcome",
      content: agent.welcomeMessage || `Olá! Eu sou ${agent.name}. Como posso ajudar?`,
      role: "assistant",
      createdAt: new Date(),
    }
    setMessages([welcomeMessage])
  }, [agent])

  // Rolar para o final quando novas mensagens são adicionadas
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      content: input,
      role: "user",
      createdAt: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Enviar mensagem para o agente e obter resposta
      const response = await conversationService.queryAgent(agent.id, input)

      const assistantMessage: Message = {
        id: `assistant_${Date.now()}`,
        content: response.text,
        role: "assistant",
        createdAt: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error)
      toast({
        title: "Erro",
        description: "Não foi possível enviar sua mensagem. Tente novamente.",
        variant: "destructive",
      })
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
    <Card className="flex flex-col h-[calc(100vh-12rem)]">
      <CardHeader className="px-4 py-3 border-b">
        <CardTitle className="flex items-center text-lg">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src={agent.iconUrl || ""} alt={agent.name} />
            <AvatarFallback>
              <Bot className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          {agent.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0 overflow-hidden">
        <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`flex max-w-[80%] ${
                    message.role === "user" ? "flex-row-reverse items-end" : "flex-row items-end"
                  }`}
                >
                  <Avatar className={`h-8 w-8 ${message.role === "user" ? "ml-2" : "mr-2"}`}>
                    {message.role === "user" ? (
                      <>
                        <AvatarImage src="/placeholder.svg" alt="User" />
                        <AvatarFallback>
                          <User className="h-5 w-5" />
                        </AvatarFallback>
                      </>
                    ) : (
                      <>
                        <AvatarImage src={agent.iconUrl || ""} alt={agent.name} />
                        <AvatarFallback>
                          <Bot className="h-5 w-5" />
                        </AvatarFallback>
                      </>
                    )}
                  </Avatar>
                  <div
                    className={`rounded-lg px-4 py-2 ${
                      message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-gray-800"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.createdAt.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-end">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={agent.iconUrl || ""} alt={agent.name} />
                    <AvatarFallback>
                      <Bot className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-800">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <div className="flex w-full items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input
            placeholder="Digite sua mensagem..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            className="flex-1"
          />
          <Button variant="ghost" size="icon">
            <Mic className="h-5 w-5" />
          </Button>
          <Button onClick={handleSendMessage} disabled={isLoading || !input.trim()}>
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
