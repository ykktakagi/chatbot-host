"use client";

import React from "react";
import dynamic from "next/dynamic";
import type { MfChartConfig } from "@/data/mfConfig";
import styles from "./land-price-graph.module.css";

const ChartWrapper = dynamic(
  () => import("makepdf_remort/ChartWrapper"),
  { ssr: false }
);

interface LandPriceGraphProps {
  config: MfChartConfig;
}

export function LandPriceGraph({ config }: LandPriceGraphProps) {
  return (
    <div className={styles.landPriceGraphSection}>
      <ChartWrapper
        chartTitle={config.chartTitle || "公示価格推移"}
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
