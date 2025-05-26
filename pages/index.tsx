// pages/index.tsx
import dynamic from "next/dynamic"
import React from "react"
import styles from "@/styles/index.module.css"

// named export ChatInterface を取り出す
const ChatInterface = dynamic(
  () =>
    import("@/components/chat-interface").then((mod) => mod.ChatInterface),
  { ssr: false }
)

export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles["page-inner"]}>
        <div className={styles["chat-area"]}>
          <ChatInterface />
        </div>
      </div>
    </main>
  )
}
