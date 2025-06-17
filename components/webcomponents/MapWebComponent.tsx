import React, { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

interface MapWebComponentProps {
  mapType: 'marker' | 'route' | 'raster';
  layerConfig?: {
    source: '国土地理院' | '不動産ライブラリ';
    mapLayerType: string;
  };
  propertyName?: string;
  propertyLatitude?: number;
  propertyLongitude?: number;
  destName?: string;
  destLatitude?: number;
  destLongitude?: number;
}

function MapComponent(props: MapWebComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const center = [
      props.propertyLatitude || 35.7267,
      props.propertyLongitude || 139.5747
    ];

    const mapHtml = `
      <div style="height: 400px; width: 100%; background: #e0e0e0; display: flex; align-items: center; justify-content: center; border: 1px solid #ccc;">
        <div style="text-align: center;">
          <h4>地図表示エリア</h4>
          <p>タイプ: ${props.mapType}</p>
          <p>物件: ${props.propertyName || '物件所在地'}</p>
          <p>座標: ${center[0].toFixed(4)}, ${center[1].toFixed(4)}</p>
          ${props.destName ? `<p>目的地: ${props.destName}</p>` : ''}
          ${props.layerConfig ? `<p>レイヤー: ${props.layerConfig.mapLayerType}</p>` : ''}
        </div>
      </div>
    `;

    mapRef.current.innerHTML = mapHtml;
  }, [props]);

  return <div ref={mapRef} />;
}

class MapWebComponent extends HTMLElement {
  private root: any;

  connectedCallback() {
    const mountPoint = document.createElement('div');
    this.appendChild(mountPoint);
    this.root = createRoot(mountPoint);
    this.render();
  }

  disconnectedCallback() {
    if (this.root) {
      this.root.unmount();
    }
  }

  render() {
    const props = JSON.parse(this.getAttribute('props') || '{}');
    this.root.render(<MapComponent {...props} />);
  }
}

if (typeof window !== 'undefined') {
  customElements.define('remap-map', MapWebComponent);
}
