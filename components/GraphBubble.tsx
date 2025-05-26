// components/GraphBubble.tsx
"use client";

import dynamic from "next/dynamic";
import type { MfChartConfig } from "@/data/mfConfig";
import styles from "./graph-bubble.module.css";

// @ts-expect-error Module Federation dynamic import
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
        layout={config.layout}
        source={config.source}
        dataKey={config.dataKey}
        targetYear={config.targetYear}
        comparisonsCode={config.comparisonsCode || ""}
        comparisons={config.comparisons || ""}
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
