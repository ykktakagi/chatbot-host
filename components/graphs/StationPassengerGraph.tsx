"use client";

import React from "react";
import dynamic from "next/dynamic";
import type { MfChartConfig } from "@/data/mfConfig";
import styles from "./station-passenger-graph.module.css";

const ChartWrapper = dynamic(
  () => import("makepdf_remort/ChartWrapper"),
  { ssr: false }
);

interface StationPassengerGraphProps {
  config: MfChartConfig;
}

export function StationPassengerGraph({ config }: StationPassengerGraphProps) {
  return (
    <div className={styles.stationPassengerGraphSection}>
      <ChartWrapper
        chartTitle={config.chartTitle || "駅乗降人員推移"}
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
