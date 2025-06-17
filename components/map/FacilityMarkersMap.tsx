"use client";

import React from "react";
import dynamic from "next/dynamic";
import type { FacilityMarkersMapProps } from "../../types/facility";
import styles from "./facility-markers-map.module.css";

const MapWrapper = dynamic(
  () => import("makepdf_remort/MapWrapper"),
  { ssr: false }
);

export function FacilityMarkersMap({ 
  facilityData, 
  centerLatitude, 
  centerLongitude, 
  propertyName = "物件" 
}: FacilityMarkersMapProps) {
  return (
    <div className={styles.facilityMapSection}>
      <MapWrapper
        mapType="marker"
        propertyName={propertyName}
        propertyLatitude={centerLatitude}
        propertyLongitude={centerLongitude}
        facilityData={facilityData}
      />
    </div>
  );
}
