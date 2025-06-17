// types/remote.d.ts

declare module 'makepdf_remort/ChartWrapper' {
  interface ChartWrapperProps {
    chartTitle?: string;
    chartType: string;
    source: string;
    dataKey: string;
    targetYear?: string;
    prefectureCode?: number;
    prefecture?: string;
    localGovCode?: number;
    localGov?: string;
    axisConfig?: any;
    style?: React.CSSProperties;
  }
  
  const Component: React.ComponentType<ChartWrapperProps>;
  export default Component;
}

declare module 'makepdf_remort/MapWrapper' {
  import { FacilityData } from './facility';
  
  interface MapWrapperProps {
    mapType?: string;
    propertyName?: string;
    propertyLatitude?: number;
    propertyLongitude?: number;
    destName?: string;
    destLatitude?: number;
    destLongitude?: number;
    layerConfig?: any;
    facilityData?: FacilityData;
    style?: React.CSSProperties;
  }
  
  const Component: React.ComponentType<MapWrapperProps>;
  export default Component;
}
