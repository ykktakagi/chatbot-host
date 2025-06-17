import React from 'react';
import { StoryBookComponent } from '../components/story/StoryBookComponent';
import type { StoryData } from '../types/story';

const testStoryData: StoryData = {
  title: "練馬区ハウスでの暮らし",
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

export default function TestStory() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Story Book Component Test</h1>
      <StoryBookComponent storyData={testStoryData} propertyName="練馬区ハウス" />
    </div>
  );
}
