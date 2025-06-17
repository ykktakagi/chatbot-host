// types/remote.d.ts

declare module 'makepdf_remort/ChartWrapper' {
  const Component: React.ComponentType<any>;
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
  }
  
  const Component: React.ComponentType<MapWrapperProps>;
  export default Component;
}
