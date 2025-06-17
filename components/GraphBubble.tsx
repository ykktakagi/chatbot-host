// components/GraphBubble.tsx
"use client";

import React, { useEffect, useRef } from "react";
import type { MfChartConfig } from "@/data/mfConfig";
import { componentRegistry } from "@/lib/webComponentRegistry";
import styles from "./graph-bubble.module.css";

interface GraphBubbleProps {
  config: MfChartConfig;
}

export function GraphBubble({ config }: GraphBubbleProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadChart = async () => {
      if (typeof window === 'undefined') return;

      await import('@/components/webcomponents/ChartWebComponent');

      if (containerRef.current) {
        const chartElement = document.createElement('remap-chart');
        chartElement.setAttribute('props', JSON.stringify({
          ...config,
          chartTitle: config.chartTitle || `${config.dataKey} のグラフ`,
          style: { width: "100%", height: "350px" }
        }));
        containerRef.current.appendChild(chartElement);

        componentRegistry.logUsage({
          componentName: 'chart',
          timestamp: new Date(),
          context: config.dataKey,
          userQuery: '',
          success: true
        });
      }
    };

    loadChart();
  }, [config]);

  return <div className={styles.mfSection} ref={containerRef} />;
}
