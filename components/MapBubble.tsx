// components/MapBubble.tsx
"use client";

import React from "react";
import dynamic from "next/dynamic";
import type { MfMapConfig } from "@/data/mfMapConfig";
import styles from "./map-bubble.module.css";

// MF 経由でリモートの MapWrapper を動的読み込み
const MapWrapper = dynamic(
  () => import("makepdf_remort/MapWrapper"),  // ← リモート名/エクスポート名に置き換えてください
  { ssr: false }
);

interface MapBubbleProps {
  mapConfig: MfMapConfig;
}

export function MapBubble({ mapConfig }: MapBubbleProps) {
  return (
    <div className={styles.mapSection}>
      {/* mapConfig の各プロパティをそのまま MapWrapper に渡します */}
      <MapWrapper
        mapType={mapConfig.mapType}
        propertyName={mapConfig.propertyName}
        propertyLatitude={mapConfig.propertyLatitude}
        propertyLongitude={mapConfig.propertyLongitude}
        destName={mapConfig.destName}
        destLatitude={mapConfig.destLatitude}
        destLongitude={mapConfig.destLongitude}
        layerConfig={mapConfig.layerConfig}
      />
    </div>
  );
}
