// pages/api/chat.ts

import { NextApiRequest, NextApiResponse } from "next"
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai"
import { HumanMessage, SystemMessage } from "@langchain/core/messages"
import dummyVectors from "@/data/dummy_vector.json"
import { mfTopics as rawMfTopics, mfKeywordSets } from "@/data/mfConfig"


// 埋め込みモデルの初期化
const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
})
// AI フォールバック用モデル
const llm = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: "gpt-3.5-turbo",
  temperature: 0.7,
})

// — rawMfTopics を長さ順にソートして本番で使う mfTopics にする —
const mfTopics = [...rawMfTopics].sort((a, b) => b.length - a.length)

// — MFトピック埋め込みキャッシュ —
let topicCache: { topic: string; emb: number[] }[] | null = null
async function initTopicCache() {
  if (topicCache) return
  topicCache = await Promise.all(
    mfTopics.map(async (topic) => ({
      topic,
      emb: await embeddings.embedQuery(topic),
    }))
  )
}

// — ダミーデータ埋め込みキャッシュ —
let vectorCache: { query: string; answer: string; emb: number[] }[] | null = null
async function initVectorCache() {
  if (vectorCache) return
  vectorCache = await Promise.all(
    (dummyVectors as { query: string; answer: string }[]).map(async ({ query, answer }) => ({
      query,
      answer,
      emb: await embeddings.embedQuery(query),
    }))
  )
}

// コサイン類似度計算
function cosine(a: number[], b: number[]) {
  let dot = 0, magA = 0, magB = 0
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i]
    magA += a[i] * a[i]
    magB += b[i] * b[i]
  }
  return dot / (Math.sqrt(magA) * Math.sqrt(magB))
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed")
  }

  const { message } = req.body as { message?: string }
  if (!message) {
    return res.status(400).json({ error: "Message is required" })
  }

  const trimmed = message.trim()
  const normalized = trimmed.replace(/[。？?！!、]/g, "")

  // STEP0: 定型挨拶を最優先で処理
  const greetRegex = /^(こんにちは|こんばんは|おはよう|ハロー)[！!]*$/i
  if (greetRegex.test(trimmed)) {
    return res.status(200).json({ reply: "こんにちは！何かご質問はありますか？" })
  }

  // STEP1: MFトピック判定（文字列→キーワードセット→埋め込み）
  await initTopicCache();

  for (const topic of mfTopics) {
    // 正規化済みの問い合わせ文
    const norm = normalized;

    // 1-a) トピック名そのものに含まれる
    if (norm.includes(topic)) {
      return res.status(200).json({
        reply: `これはMF化されています。matched: ${topic}`
      });
    }

    // 1-b) キーワードセットによる複合マッチ
    const sets = mfKeywordSets[topic] || [];
    for (const ks of sets) {
      if (ks.every((kw) => norm.includes(kw))) {
        return res.status(200).json({
          reply: `これはMF化されています。matched: ${topic} (by keywords: ${ks.join(
            ","
          )})`
        });
      }
    }
  }

  // 1-c) 埋め込みによる意味マッチ
  const questionEmb = await embeddings.embedQuery(trimmed);
  for (const { topic: t, emb: topicEmb } of topicCache!) {
    const score = cosine(questionEmb, topicEmb);
    if (score > 0.9) {
      return res.status(200).json({
        reply: `これはMF化されています。matched: ${t} (similarity: ${score.toFixed(
          2
        )})`
      });
    }
  }


  // STEP2: ダミーデータ 完全一致トークンマッチ
  {
    const foundExact = (dummyVectors as { query: string; answer: string }[]).find((entry) => {
      const tokens = entry.query.split(/\s+/).filter(Boolean)
      return tokens.every((tok) => normalized.includes(tok))
    })
    if (foundExact) {
      return res.status(200).json({
        reply: `${foundExact.answer} (matched dummy-exact: "${foundExact.query}")`,
      })
    }
  }

  // STEP3: ダミーデータ 意味ベクトル検索（しきい値0.9）
  await initVectorCache()
  let bestScore = 0
  let bestAnswer: string | null = null
  for (const { emb: vecEmb, answer } of vectorCache!) {
    const score = cosine(questionEmb, vecEmb)
    if (score > bestScore) {
      bestScore = score
      bestAnswer = answer
    }
  }
  if (bestScore > 0.9 && bestAnswer) {
    return res.status(200).json({
      reply: `${bestAnswer} (matched dummy-vector, similarity: ${bestScore.toFixed(2)})`,
    })
  }

  // STEP4: AI フォールバック
  try {
    const aiResponse = await llm.call([
      new SystemMessage(
        `あなたは藤沢市公式のデータ窓口チャットボットです。
        回答の優先順は「MF化判定→ダミーデータ→ベクトル検索→AIフォールバック」です。
        AIフォールバックする際は、一般的な統計データ（例：国勢調査）を踏まえて、人口などの数値を回答してください。
        出力は常に日本語で、必要あれば「matched: …」を付与してください。`
      ),
      new HumanMessage(message),
    ])
    return res.status(200).json({ reply: aiResponse.text })
  } catch (err) {
    console.error("AI error:", err)
    return res.status(500).json({ error: "Failed to get AI response" })
  }
}
