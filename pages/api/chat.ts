// pages/api/chat.ts
import { NextApiRequest, NextApiResponse } from "next";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import dummyVectors from "@/data/dummy_vector.json" assert { type: "json" };
import {
  mfTopics,
  mfChartConfigs,
  type MfChartConfig,
} from "@/data/mfConfig";
import { mfMapTopics, mfMapConfigs, type MfMapConfig } from "@/data/mfMapConfig";

import { facilityDefaults } from "../../data/facilityDefaults";

type RawVectorEntry = {
  query: string;
  answer: string;
  category: string;
  localGovCode: number;
  exclusiveTag: string;
};
const dummyVectorsTyped = dummyVectors as RawVectorEntry[];

const {
  facilityName,
  facilityLatitude,
  facilityLongitude,
  prefectureCode: defaultPrefectureCode,
  prefecture: defaultPrefecture,
  localGovCode: defaultLocalGovCode,
  localGov: defaultLocalGov,
} = facilityDefaults;

const facilityContext = new SystemMessage(
  `【物件デフォルト情報】\n` +
  `- 物件名: ${facilityName}\n` +
  `- 住所: ${defaultPrefecture}${defaultLocalGov}\n` +
  `- 緯度・経度: (${facilityLatitude}, ${facilityLongitude})`
);

const embeddings = new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY });
const decisionLlm = new ChatOpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, modelName: "gpt-3.5-turbo", temperature: 0.0 });
const answerLlm   = new ChatOpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, modelName: "gpt-3.5-turbo", temperature: 0.2 });
const fallbackLlm = new ChatOpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, modelName: "gpt-3.5-turbo", temperature: 0.7 });

type DummyEntry = RawVectorEntry & { emb: number[] };
let vectorCache: DummyEntry[] | null = null;
async function initVectorCache() {
  if (vectorCache) return;
  console.log("[initVectorCache] generating embeddings for dummy vectors...");
  vectorCache = await Promise.all(
    dummyVectorsTyped.map(async (d) => ({ ...d, emb: await embeddings.embedQuery(d.query) }))
  );
  console.log("[initVectorCache] done, cached entries:", vectorCache.length);
}

function cosine(a: number[], b: number[]) {
  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("=== New /api/chat request ===");
  console.log("facilityDefaults:", facilityDefaults);

  if (req.method !== "POST") {
    console.log("Method not allowed:", req.method);
    return res.status(405).end("Method Not Allowed");
  }

  let messages = (req.body as any).messages as { role: string; content: string }[];
  console.log("Received messages count:", messages?.length);
  if (!messages || messages.length === 0) {
    console.log("No messages in body");
    return res.status(400).json({ error: "`messages` array is required" });
  }

  // STEP: extract last user
  const lastUser = [...messages].reverse().find(m => m.role === "user");
  console.log("lastUser:", lastUser);
  if (!lastUser) {
    return res.status(400).json({ error: "No user message found" });
  }
  const userText = lastUser.content.trim();
  const normalized = userText.replace(/[。？?！!、]/g, "");
  console.log("normalized userText:", normalized);

  // STEP0.5: determine map usage
  const mapLines = mfMapTopics
  .map(t => `- ${t.label}（例: ${t.aliases.join("、")}）`)
  .join("\n");

  const mapPrompt = `
以下は扱える地図の種類とそのキーです。
${mapLines}

上記を踏まえ、最新ユーザー発話で
使う場合は {"useMap": true, "mapKey":"<キー>"}、
不要な場合は {"useMap": false}
のJSONを返してください。
User発話: "${normalized}"
`;
  console.log("[STEP0.5] mapPrompt → LLM");
  const mapRes = await decisionLlm.call([new SystemMessage(mapPrompt)]);
  console.log("[STEP0.5] mapRes.text:", mapRes.text);
  let mapParsed: { useMap: boolean; mapKey?: string } = { useMap: false };
  try {
    mapParsed = JSON.parse(mapRes.text.trim());
  } catch (e) {
    console.error("[STEP0.5] map JSON parse error:", e);
  }
  console.log("[STEP0.5] mapParsed:", mapParsed);

  if (mapParsed.useMap && mapParsed.mapKey && mfMapConfigs[mapParsed.mapKey]) {
    console.log("[STEP0.5] match mfMapConfigs:", mapParsed.mapKey);
    // mfMapConfigs から一気にベース設定を取得
    const baseCfg = mfMapConfigs[mapParsed.mapKey]!;
    const cfg: MfMapConfig = {
      ...baseCfg,
      propertyName:     facilityName,
      propertyLatitude: facilityLatitude,
      propertyLongitude: facilityLongitude,
    };

    // mapType が "route" のときだけ宛先を抽出・設定
    if (cfg.mapType === "route") {
      const destExtractPrompt = `
        以下のように、ユーザーの発言から目的地を抽出してください。
        単に「〇〇への行き方は？」の〇〇部分を日本語のまま返すだけでOKです。

        例:
        - 質問: "武蔵関駅への行き方は？" → "武蔵関駅"
        - 質問: "イエローハット 関町店にどうやって行く？" → "イエローハット 関町店"
        - 質問: "関町図書館までのルートを教えて" → "関町図書館"

        質問: "${normalized}"
        →
      `;
      const destRes = await decisionLlm.call([new SystemMessage(destExtractPrompt)]);
      const destination = destRes.text.trim().replace(/^["“]|["”]$/g, "");
      console.log("[STEP0.6] extracted destination:", destination);

      const osmRes = await fetch(
  `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(destination)}`,
  {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; ReMapBot/1.0; +https://example.com/contact)",
    },
  }
);

      const osmData = await osmRes.json();
      console.log("[STEP0.6] osmData:", osmData);

      if (osmData.length > 0) {
        cfg.destName      = destination;
        cfg.destLatitude  = parseFloat(osmData[0].lat);
        cfg.destLongitude = parseFloat(osmData[0].lon);
      } else {
        return res.status(200).json({
          reply: `「${destination}」の場所が見つかりませんでした。施設名が正しいかご確認ください。`,
        });
      }
    }

    // 地図表示に先立ち、AI に「どういう回答文を返すか」を生成させる
    const mapAnswerRes = await answerLlm.call([
      facilityContext,
      new SystemMessage("この地図を出すにあたって、ユーザーに自然な日本語で地図の説明をしてください。必要に応じてユーザーの質問にも答えてください。"),
      ...messages.map(m => m.role === "user" ? new HumanMessage(m.content) : new SystemMessage(m.content)),
    ]);
    const mapReplyText = mapAnswerRes.text.trim();



    // 最後に一度だけ返却
    return res.status(200).json({
      reply:     `${mapReplyText}参考に地図を表示します（${mapParsed.mapKey}）`,
      mapConfig: cfg,
      matched:   `mfMap:${mapParsed.mapKey}`,
    });
  }



  // STEP1: determine graph usage
  const decisionPrompt = `
以下は扱えるグラフのトピック一覧とそのエイリアスです。
${mfTopics.map(t => `- ${t.label}（例: ${t.aliases.join("、")}）`).join("\n")}

直近に出力されたグラフトピック: 未保持

上記を踏まえ、最新ユーザー発話で
表示すべき場合は {"useGraph": true, "topic":"<トピック>"}、
不要な場合は {"useGraph": false}
のJSONを返してください。
User発話: "${normalized}"
`;
  console.log("[STEP1] decisionPrompt → LLM");
  const decisionRes = await decisionLlm.call([new SystemMessage(decisionPrompt)]);
  console.log("[STEP1] decisionRes.text:", decisionRes.text);
  let parsed: { useGraph: boolean; topic?: string } = { useGraph: false };
  try {
    parsed = JSON.parse(decisionRes.text.trim());
  } catch (e) {
    console.error("[STEP1] graph JSON parse error:", e);
  }
  console.log("[STEP1] parsed:", parsed);

  if (parsed.useGraph && parsed.topic && mfChartConfigs[parsed.topic]) {
    console.log("[STEP2] using graph for topic:", parsed.topic);
    const cfg: MfChartConfig = {
      ...mfChartConfigs[parsed.topic]!,
      prefectureCode: defaultPrefectureCode,
      prefecture:     defaultPrefecture,
      localGovCode:   defaultLocalGovCode,
      localGov:       defaultLocalGov,
    };
    const answerRes = await answerLlm.call([
      facilityContext,
      new SystemMessage("これまでの会話を踏まえて、日本語で端的にお答えください。"),
      ...messages.map(m => m.role === "user" ? new HumanMessage(m.content) : new SystemMessage(m.content)),
    ]);
    console.log("[STEP2] answerRes.text:", answerRes.text);
    return res.status(200).json({
      reply:       `${answerRes.text.trim()} 参考として「${parsed.topic}」のグラフをお出しします。`,
      graphConfig: cfg,
      matched:     `mf:${parsed.topic}`,
    });
  }

  const storyKeywords = /物語|ストーリー|話|エピソード|生活|暮らし|日常|シーン/;
  if (storyKeywords.test(normalized)) {
    console.log("[STEP2.5] story request detected");
    const storyData = {
      title: `${facilityName}での暮らし`,
      scenes: [
        {
          key: "morning",
          tags: ["朝", "家族", "通勤"],
          text: "朝7時、家族みんなで朝食を囲み、子どもは関町北小学校へ元気に登校。親は武蔵関駅から通勤電車に乗る。通学路や通勤途中にコンビニやベーカリーがあり、忙しい朝でも立ち寄れる便利な環境です。"
        },
        {
          key: "afternoon",
          tags: ["昼間", "買い物", "子育て"],
          text: "日中は自然村やスーパー三徳で買い出しをしつつ、関町図書館で絵本を読んだり、公園でのんびり過ごす。医療施設も近く、日常生活に安心感があります。子育て中の家族にもぴったりな環境です。"
        },
        {
          key: "evening",
          tags: ["夕方", "買い物", "子育て"],
          text: "夕方、学童や習い事を終えた子どもたちと駅前で買い物。夕食準備に便利なドラッグストアや惣菜店も多く、帰宅前に必要なものを揃えられます。地域の親子と挨拶を交わす温かい交流も魅力です。"
        },
        {
          key: "night",
          tags: ["夜", "家族", "リラックス"],
          text: "夜は住宅街らしく静かで穏やかな時間。リビングでは家族でテレビを見たり、子どもは宿題をしたりとそれぞれの時間を過ごす。騒音も少なく、安心してリラックスできる夜を迎えられます。"
        },
        {
          key: "weekend",
          tags: ["週末", "家族", "レジャー"],
          text: "週末は武蔵関公園で家族でピクニックを楽しんだり、近くの商業施設でショッピング。子どもたちは公園の遊具で遊び、大人はベンチでゆっくりと過ごす。地域のイベントに参加することもあり、近所の人たちとの交流も深まります。"
        }
      ]
    };
    
    const answerRes = await answerLlm.call([
      facilityContext,
      new SystemMessage("物語やストーリーについて聞かれました。この地域での暮らしについて簡潔に紹介してください。"),
      ...messages.map(m => m.role === "user" ? new HumanMessage(m.content) : new SystemMessage(m.content)),
    ]);
    
    return res.status(200).json({
      reply: `${answerRes.text.trim()} こちらの地域での暮らしの物語をご紹介します。`,
      storyData: storyData,
      matched: "story"
    });
  }



// STEP4: vector fallback start
console.log("[STEP4] vector fallback start");
await initVectorCache();
const qEmb = await embeddings.embedQuery(userText);

// 1) localGovCode でまず絞り込み
let candidates = vectorCache!.filter(d => d.localGovCode === defaultLocalGovCode);
console.log("[STEP4] after localGov filter:", candidates.length);

// 2) 物件質問かどうか判定
const propertyKeywords = /駐車場|間取り|外構|性能/;
const isPropertyQuestion = propertyKeywords.test(userText);
if (isPropertyQuestion) {
  // 物件質問なら exclusiveTag で絞り込み
  candidates = candidates.filter(d => d.exclusiveTag === facilityName);
  console.log("[STEP4] property question filter, count:", candidates.length);
} else {
  // カテゴリ推定
  const categoryPrompt = `
次のカテゴリと関連キーワードを参考に、この質問に最も合うものを1つだけ日本語で返してください。
- 商業施設 (例: 買い物, ショッピング, 店舗, スーパー, 店)
- 教育 (例: 学校, 通学, 学区, 子育て, 小学校, 中学校, 幼稚園)
- 自然・公園 (例: 公園, 緑地, 自然)
- 住環境 (例: 住環境, 周辺環境, 生活)
- 交通 (例: 交通, アクセス, 駅, バス)
ユーザーの質問: "${normalized}"
`;


  console.log("[STEP4] categoryPrompt → LLM");
  const categoryRes = await answerLlm.call([new SystemMessage(categoryPrompt)]);
  let detectedCategory = categoryRes.text.trim();
      // カテゴリ名のみを抽出 (「自然・公園: 公園」→「自然・公園」)
    if (/[：:]/.test(detectedCategory)) {
      detectedCategory = detectedCategory.split(/[:：]/)[0].trim();
    }
  console.log("[STEP4] detectedCategory:", detectedCategory);

  // マッチする候補があれば絞り込み、それ以外はスキップ
  const hasMatch = candidates.some(d => d.category === detectedCategory);
  if (hasMatch) {
    candidates = candidates.filter(d => d.category === detectedCategory);
    console.log("[STEP4] after category filter:", candidates.length);
  } else {
    console.log(`[STEP4] "${detectedCategory}" にマッチするデータがないためカテゴリフィルタをスキップします`);
  }
}

// 3) 候補から類似度が最も高いものを選出
let bestScore = 0, bestAnswer: string | null = null;
for (const { emb, answer } of candidates) {
  const score = cosine(qEmb, emb);
  if (score > bestScore) {
    bestScore = score;
    bestAnswer = answer;
  }
}
console.log("[STEP4] bestScore:", bestScore, "bestAnswer:", bestAnswer);

// 4) 閾値を超えれば回答
const threshold = isPropertyQuestion ? 0.9 : 0.6;
if (bestScore > threshold && bestAnswer) {
  return res.status(200).json({
    reply: `${bestAnswer} (matched dummy-vector, similarity: ${bestScore.toFixed(2)})`
  });
}

  // STEP3: normal answer
  console.log("[STEP3] falling back to normal answer LLM");
  {
    const answerRes = await answerLlm.call([
      facilityContext,
      new SystemMessage("これまでの会話を踏まえて、日本語で端的にお答えください。"),
      ...messages.map(m => m.role === "user" ? new HumanMessage(m.content) : new SystemMessage(m.content)),
    ]);
    console.log("[STEP3] answerRes.text:", answerRes.text);
    const answerText = answerRes.text.trim();
    const unknowns = ["わかりません", "データベースには", "提供できません"];
    if (!unknowns.some(p => answerText.includes(p))) {
      return res.status(200).json({ reply: answerText });
    }
  }
  
  // STEP5: final fallback
  console.log("[STEP5] final fallback to fallbackLlm");
  try {
    const aiRes = await fallbackLlm.call([
      facilityContext,
      new SystemMessage("あなたは「まちの住みやすさ」案内アドバイザーです。"),
      ...messages.map(m => m.role === "user" ? new HumanMessage(m.content) : new SystemMessage(m.content)),
    ]);
    console.log("[STEP5] aiRes.text:", aiRes.text);
    return res.status(200).json({ reply: aiRes.text.trim() });
  } catch (err) {
    console.error("[STEP5] AI error:", err);
    return res.status(500).json({ error: "Failed to get AI response" });
  }
}
