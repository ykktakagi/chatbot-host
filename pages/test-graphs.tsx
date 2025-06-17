import React from 'react';
import { PopulationTrendGraph } from '../components/graphs/PopulationTrendGraph';
import { LandPriceGraph } from '../components/graphs/LandPriceGraph';
import { StationPassengerGraph } from '../components/graphs/StationPassengerGraph';
import type { MfChartConfig } from '../data/mfConfig';

const populationConfig: MfChartConfig = {
  chartType: "積み上げ棒グラフ",
  source: "統計ダッシュボード",
  dataKey: "年齢別人口",
  targetYear: "年推移",
  prefectureCode: 14000,
  prefecture: "神奈川県",
  localGovCode: 14205,
  localGov: "藤沢市",
  axisConfig: {
    xKey: "time",
    yKey: "value",
    categoryLabel: "category",
    xLabel: "",
    yLabel: "",
    unit: "人"
  }
};

const landPriceConfig: MfChartConfig = {
  chartType: "積み上げ棒グラフ",
  source: "統計ダッシュボード",
  dataKey: "世帯の種類",
  targetYear: "過去10年",
  prefectureCode: 14000,
  prefecture: "神奈川県",
  localGovCode: 14205,
  localGov: "藤沢市",
  axisConfig: {
    xKey: "time",
    yKey: "value",
    categoryLabel: "category",
    xLabel: "",
    yLabel: "",
    unit: "円/㎡"
  }
};

const stationPassengerConfig: MfChartConfig = {
  chartType: "円グラフ",
  source: "統計ダッシュボード",
  dataKey: "年齢別人口",
  targetYear: "最新",
  prefectureCode: 14000,
  prefecture: "神奈川県",
  localGovCode: 14205,
  localGov: "藤沢市",
  axisConfig: {
    xKey: "",
    yKey: "value",
    categoryLabel: "category",
    xLabel: "",
    yLabel: "",
    unit: "人/日"
  }
};

export default function TestGraphs() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Graph Components Test</h1>
      
      <h2>Population Trend Graph</h2>
      <PopulationTrendGraph config={populationConfig} />
      
      <h2>Land Price Graph</h2>
      <LandPriceGraph config={landPriceConfig} />
      
      <h2>Station Passenger Graph</h2>
      <StationPassengerGraph config={stationPassengerConfig} />
    </div>
  );
}
