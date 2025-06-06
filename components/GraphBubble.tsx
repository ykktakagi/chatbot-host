// components/GraphBubble.tsx
"use client";

import dynamic from "next/dynamic";
import type { MfChartConfig } from "@/data/mfConfig";
import styles from "./graph-bubble.module.css";

// @ts-ignore Module Federation dynamic import
const ChartWrapper = dynamic(
  () => import("makepdf_remort/ChartWrapper"),
  { ssr: false }
);

interface GraphBubbleProps {
  config: MfChartConfig;
}

export function GraphBubble({ config }: GraphBubbleProps) {
  return (
    <div className={styles.mfSection}>
      <ChartWrapper
        chartTitle={config.chartTitle || `${config.dataKey} のグラフ`}
        chartType={config.chartType}
        source={config.source}
        dataKey={config.dataKey}
        targetYear={config.targetYear}
        prefectureCode={config.prefectureCode}
        prefecture={config.prefecture}
        localGovCode={config.localGovCode}
        localGov={config.localGov}
        axisConfig={config.axisConfig}
        style={{ width: "100%", height: "350px" }}
      />
    </div>
  );
}
