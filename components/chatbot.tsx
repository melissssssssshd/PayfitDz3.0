"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Bot, X, Send, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const quickActions = [
  "Comment poser une demande de congé ?",
  "Où trouver mes bulletins de paie ?",
  "Soumettre une note de frais",
  "Contacter les RH",
]

const chatHistory = [
  {
    id: 1,
    sender: "bot",
    content: "Bonjour ! Je suis l'assistant PayFit. Comment puis-je vous aider aujourd'hui ?",
    time: "10:00",
  },
]

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState(chatHistory)
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return

    const newMessage = {
      id: messages.length + 1,
      sender: "user",
      content: input,
      time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, newMessage])
    setInput("")

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        sender: "bot",
        content:
          "Je comprends votre demande. Laissez-moi vous aider avec cela. Pour plus d'informations détaillées, je peux vous mettre en relation avec un conseiller RH.",
        time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  const handleQuickAction = (action: string) => {
    setInput(action)
  }

  return (
    <>
      {/* Chatbot Button */}
      {!isOpen && (
        <Button
          size="icon"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <Bot className="h-6 w-6" />
        </Button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 flex h-[600px] w-[400px] flex-col shadow-2xl">
          <CardHeader className="border-b bg-gradient-to-r from-mint-500 to-sage-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                  <Bot className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-white">Assistant PayFit</CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-300" />
                    <span className="text-xs text-white/90">En ligne</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white">
                <X className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex flex-1 flex-col gap-4 overflow-hidden p-4">
            {/* Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto">
              {messages.map((message) => (
                <div key={message.id} className={cn("flex gap-3", message.sender === "user" && "flex-row-reverse")}>
                  {message.sender === "bot" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mint-100">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div className={cn("flex flex-col gap-1", message.sender === "user" && "items-end")}>
                    <div
                      className={cn(
                        "rounded-2xl px-4 py-2 max-w-[280px]",
                        message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                      )}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{message.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            {messages.length === 1 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Sparkles className="h-3 w-3" />
                  <span>Questions fréquentes</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="cursor-pointer bg-mint-50 text-primary hover:bg-mint-100"
                      onClick={() => handleQuickAction(action)}
                    >
                      {action}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="flex items-end gap-2 border-t pt-4">
              <Input
                placeholder="Posez votre question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleSend()
                  }
                }}
                className="flex-1"
              />
              <Button size="icon" onClick={handleSend} disabled={!input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
