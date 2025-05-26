// components/chat-interface.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import Image from "next/image";
import styles from "./chat-interface.module.css";
import { GraphBubble } from "./GraphBubble";
import { MapBubble } from "./MapBubble";
import type { MfChartConfig } from "@/data/mfConfig";
import type { MapProps } from "@/types/mapTypes";
import { facilityDefaults } from "../data/facilityDefaults";

type BaseMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

type GraphMessage = BaseMessage & {
  graphTopic: string;
  graphConfig: MfChartConfig;
};

type MapMessage = BaseMessage & {
  mapConfig: MapProps;
};

type Message = BaseMessage | GraphMessage | MapMessage;

// ───────────────────────────────────────────────────────
// 0. 物件＆地域デフォルト情報
// ───────────────────────────────────────────────────────
const {
  facilityName,
  facilityLatitude,
  facilityLongitude,
  prefectureCode: defaultPrefectureCode,
  prefecture: defaultPrefecture,
  localGovCode: defaultLocalGovCode,
  localGov: defaultLocalGov,
} = facilityDefaults;

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const headerHeight = 116;
  const inputHeight = 64;
  const scrollPadding = 10;

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => {
    if (!isLoading) scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // ユーザーメッセージを追加
    const userMsg: BaseMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: 
                `あなたは優秀な${defaultLocalGov}公式チャットボットです。` +
                `対象物件：「${facilityName}」の所在地は${defaultPrefecture}${defaultLocalGov}` +
                `(都道府県コード:${defaultPrefectureCode}、市区町村コード:${defaultLocalGovCode})、` +
                `緯度経度：${facilityLatitude},${facilityLongitude} です。`
            },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: "user", content: input }
          ]
        }),
      });
      const data = await res.json();

      // グラフ付き応答
      if (data.graphConfig) {
        const cfg: MfChartConfig = data.graphConfig;
        const graphMsg: GraphMessage = {
          id: `g-${Date.now()}`,
          role: "assistant",
          content: data.reply,
          timestamp: new Date(),
          graphTopic: cfg.dataKey,
          graphConfig: cfg,
        };
        setMessages(prev => [...prev, graphMsg]);
      }
      // 地図付き応答
      else if (data.mapConfig) {
        const mapMsg: MapMessage = {
          id: `m-${Date.now()}`,
          role: "assistant",
          content: data.reply || "",
          timestamp: new Date(),
          mapConfig: data.mapConfig,
        };
        setMessages(prev => [...prev, mapMsg]);
      }
      // 通常応答
      else {
        const botMsg: BaseMessage = {
          id: `a-${Date.now()}`,
          role: "assistant",
          content: data.reply || "エラーが発生しました。",
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botMsg]);
      }
    } catch (err) {
      const errMsg: BaseMessage = {
        id: `e-${Date.now()}`,
        role: "assistant",
        content: "エラーが発生しました。",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.headerInner}>
            <div className={styles.imageWrap}>
              <Image src="/penguin-teacher-fixed.png" alt="ペンギン先生" width={96} height={96} />
            </div>
            <div>
              <h2 className={styles.title}>マチのアドバイザー</h2>
              <p className={styles.subtitle}>ミライに住みたいマチはどんなの？ あなたの質問にお答えします</p>
            </div>
          </div>
        </div>
        <div className={styles.cardContent}>
          <div
            className={styles.scrollArea}
            style={{ height: `calc(100vh - ${headerHeight}px - ${inputHeight}px - ${scrollPadding}px)` }}
          >
            <div className={styles.messageContainer}>
              {messages.map(msg => {
                const isUser = msg.role === "user";
                const isGraph = "graphConfig" in msg;
                const isMap = "mapConfig" in msg;
                const bubbleClass = isUser ? styles.messageUser : styles.messageBot;
                const wrapperClass = isUser ? styles.messageRight : styles.messageLeft;
                return (
                  <div key={msg.id} className={wrapperClass}>
                    <div className={styles.messageBlock}>
                      <Avatar className={styles.avatar}>
                        {isUser ? (
                          <><AvatarImage src="/icon_guest.png" alt="You" /><AvatarFallback>You</AvatarFallback></>
                        ) : (
                          <><AvatarImage src="/icon_aipenguin.png" alt="AI" /><AvatarFallback>AI</AvatarFallback></>
                        )}
                      </Avatar>
                      <div>
                        <div className={`${styles.messageBubble} ${bubbleClass}`}>  
                          <p dangerouslySetInnerHTML={{ __html: msg.content }} />
                          {isGraph && <GraphBubble config={(msg as GraphMessage).graphConfig} />}
                          {isMap   && <MapBubble  mapConfig={(msg as MapMessage).mapConfig} />}
                          
                        </div>
                        <p className={`${styles.timestamp} ${isUser ? styles.timestampUser : styles.timestampBot}`}>  
                          {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
              {isLoading && (
                <div className={styles.messageLeft}>
                  <div className={styles.messageBlock}>
                    <Avatar className={styles.avatar}>
                      <AvatarImage src="/icon_aipenguin.png" alt="AI" />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <div className={styles.messageBot}>
                      <div className={styles.dotsWrap}>
                        <div className={styles.dot} style={{ animationDelay: "0ms" }} />
                        <div className={styles.dot} style={{ animationDelay: "150ms" }} />
                        <div className={styles.dot} style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>
        <div className={styles.inputArea}>
          <div className={styles.inputWrapper}>
            <Input
              placeholder="メッセージを入力…"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className={styles.inputBox}
            />
            <Button size="icon" onClick={handleSendMessage} disabled={!input.trim() || isLoading} className={styles.sendButton}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
