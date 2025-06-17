export interface FacilitySpot {
  spot_name: string;
  spot_cat: string;
  spot_latitude: number;
  spot_longitude: number;
  spot_intro: string;
  spot_distance: string;
  spot_image: string;
}

export interface FacilityCategory {
  name: string;
  name_en: string;
  spots: FacilitySpot[];
}

export interface FacilityData {
  categories: FacilityCategory[];
}

export interface FacilityMarkersMapProps {
  facilityData: FacilityData;
  centerLatitude: number;
  centerLongitude: number;
  propertyName?: string;
}
