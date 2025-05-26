// data/mfMapConfig.ts

/**
 * raster（オーバーレイ）用レイヤー設定
 */
export type LayerConfig = {
  /** データソース */
  source: '国土地理院' | '不動産ライブラリ';
  /** レイヤー識別子 */
  mapLayerType: string;
};

/**
 * MapWrapper に渡す設定
 */
export interface MfMapConfig {
  mapType: 'marker' | 'route' | 'raster';
  /** mapType === 'raster' の場合に必須 */
  layerConfig?: LayerConfig;
  /** 以下は API 側で上書き */
  propertyName?: string;
  propertyLatitude?: number;
  propertyLongitude?: number;
  destName?: string;
  destLatitude?: number;
  destLongitude?: number;
}

/**
 * Chat 側で使うトピック一覧（キー＋ユーザー発話マッチ用のエイリアス）
 */
export type MfMapTopic = {
  /** internal key（matched に使う） */
  label: string;
  /** 発話マッチ用キーワード */
  aliases: string[];
};

/** トピック一覧 */
export const mfMapTopics: MfMapTopic[] = [
  {
    label: 'defaultPin',
    aliases: [
      '物件の場所', 'ここはどこ', 'ピン表示', '地図で見せて',
      '住所を地図で確認したい', 'この物件はどこにある？', '現地の位置を教えて',
      '物件の位置をマップで見せて', '地図で場所を見たい'
    ],
  },
  {
    label: 'routeToStation',
    aliases: [
      '行き方', 'ルート', '駅まで', '〜への行き方',
      '最寄り駅への行き方は？', 'ここから駅までどう行く？', '通勤経路を教えて',
      '最寄り駅までのバスルートは？', 'この物件から駅へのルートを表示'
    ],
  },
    {
    label: 'hazardOverlay',
    aliases: [
      '洪水', 'ハザードマップ', '浸水', '水害',
      'この地域の洪水リスクは？', '浸水想定区域を見たい', '水害マップを表示',
      '災害危険度を教えて', 'ハザード情報を確認したい',
      'この辺りは洪水の危険性は？', 'この辺りは洪水の危険性はないですか？', '洪水の危険性はある？'
    ],
  },
  {
    label: 'reinfoOverlay',
    aliases: [
      '用途地域', '店舗レイヤー', '不動産ライブラリ', '商業施設',
      '周辺の商業施設を見たい', '地域の用途地域を表示', '用途地域の区分は？',
      '街の施設分布を教えて', '周辺の店舗配置を確認'
    ],
  },
];

/** トピックごとのベース MfMapConfig */
export const mfMapConfigs: Record<string, MfMapConfig> = {
  defaultPin: { mapType: 'marker' },
  routeToStation: { mapType: 'route' },
  hazardOverlay: {
    mapType: 'raster',
    layerConfig: { source: '国土地理院', mapLayerType: '洪水浸水' }
  },
  reinfoOverlay: {
    mapType: 'raster',
    layerConfig: { source: '不動産ライブラリ', mapLayerType: '用途地域' }
  },
};
