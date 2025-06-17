// components/MapBubble.tsx
"use client";

import React, { useEffect, useRef } from "react";
import type { MfMapConfig } from "@/data/mfMapConfig";
import { componentRegistry } from "@/lib/webComponentRegistry";
import styles from "./map-bubble.module.css";

interface MapBubbleProps {
  mapConfig: MfMapConfig;
}

export function MapBubble({ mapConfig }: MapBubbleProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMap = async () => {
      if (typeof window === 'undefined') return;

      await import('@/components/webcomponents/MapWebComponent');

      if (containerRef.current) {
        const mapElement = document.createElement('remap-map');
        mapElement.setAttribute('props', JSON.stringify(mapConfig));
        containerRef.current.appendChild(mapElement);

        componentRegistry.logUsage({
          componentName: 'map',
          timestamp: new Date(),
          context: mapConfig.mapType,
          userQuery: '',
          success: true
        });
      }
    };

    loadMap();
  }, [mapConfig]);

  return <div className={styles.mapSection} ref={containerRef} />;
}
