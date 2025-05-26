// components/chat-interface.tsx
"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import Image from "next/image"
import styles from "./chat-interface.module.css"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([/* 省略 */])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const headerHeight = 116
  const inputHeight = 64
  const scrollPadding = 10

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom()
    }
  }, [messages.length])

  const handleSendMessage = async () => {
    if (!input.trim()) return
  
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }
  
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
  
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      })
  
      const data = await res.json()
      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: data.reply || "エラーが発生しました。",
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      setMessages((prev) => [...prev, {
        id: Date.now().toString(),
        content: "エラーが発生しました。",
        role: "assistant",
        timestamp: new Date(),
      }])
    } finally {
      setIsLoading(false)
    }
  }
  

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
      <div className={styles.cardHeader}>
  <div className={styles.headerInner}>
    <div className={styles.imageWrap}>
      <Image
        src="/penguin-teacher-fixed.png"
        alt="ペンギン先生"
        width={96}
        height={96}
      />
    </div>
    <div>
      <h2 className={styles.title}>マチのアドバイザー</h2>
      <p className={styles.subtitle}>
        ミライに住みたいマチはどんなの？ あなたの質問にお答えします
      </p>
    </div>
  </div>
</div>

        <div className={styles.cardContent}>
          <div className={styles.scrollArea} style={{ height: `calc(100vh - ${headerHeight}px - ${inputHeight}px - ${scrollPadding}px)` }}>
            <div className={styles.messageContainer}>
              {messages.map((message) => (
                <div key={message.id} className={message.role === "user" ? styles.messageRight : styles.messageLeft}>
                  <div className={styles.messageBlock}>
                    <Avatar className={styles.avatar}>
                      {message.role === "user" ? (
                        <>
                          <AvatarImage src="/icon_guest.png" alt="User" />
                          <AvatarFallback className={styles.avatarUser}>You</AvatarFallback>
                        </>
                      ) : (
                        <>
                          <AvatarImage src="/icon_aipenguin.png" alt="AI" />
                          <AvatarFallback className={styles.avatarAI}>AI</AvatarFallback>
                        </>
                      )}
                    </Avatar>
                    <div>
                      <div className={`${styles.messageBubble} ${message.role === "user" ? styles.messageUser : styles.messageBot}`}>
                        <p>{message.content}</p>
                      </div>
                      <p className={`${styles.timestamp} ${message.role === "user" ? styles.timestampUser : styles.timestampBot}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className={styles.messageLeft}>
                  <div className={styles.messageBlock}>
                    <Avatar className={styles.avatar}>
                      <AvatarImage src="/icon_aipenguin.png" alt="AI" />
                      <AvatarFallback className={styles.avatarAI}>AI</AvatarFallback>
                    </Avatar>
                    <div className={styles.messageBot}>
                      <div className={styles.dotsWrap}>
                        <div className={styles.dot} style={{ animationDelay: "0ms" }}></div>
                        <div className={styles.dot} style={{ animationDelay: "150ms" }}></div>
                        <div className={styles.dot} style={{ animationDelay: "300ms" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.inputArea}>
        <div className={styles.inputWrapper}>
          <Input
            placeholder="メッセージを入力..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className={styles.inputBox}
          />
          <Button
            size="icon"
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className={styles.sendButton}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
