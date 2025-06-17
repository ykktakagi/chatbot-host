import React from 'react';
import { FacilityMarkersMap } from '../components/map/FacilityMarkersMap';
import type { FacilityData } from '../types/facility';

const testFacilityData: FacilityData = {
  categories: [
    {
      name: "公共・医療",
      name_en: "public",
      spots: [
        {
          spot_name: "関区民事務所",
          spot_cat: "city_office",
          spot_latitude: 35.724492,
          spot_longitude: 139.577665,
          spot_intro: "地域住民の手続きや相談ができる窓口サービスを提供する区の行政施設です。",
          spot_distance: "200m（徒歩約3分）",
          spot_image: "noiamge.jpg"
        },
        {
          spot_name: "練馬区立関町図書館",
          spot_cat: "library",
          spot_latitude: 35.72154,
          spot_longitude: 139.58051,
          spot_intro: "多くの蔵書と落ち着いた読書スペースがある地域密着型の図書館です。",
          spot_distance: "200m（徒歩約3分）",
          spot_image: ""
        },
        {
          spot_name: "西武鉄道武蔵関駅",
          spot_cat: "access_rail",
          spot_latitude: 35.72754,
          spot_longitude: 139.57721,
          spot_intro: "西武新宿線沿線に位置し、通勤通学に便利な駅です。",
          spot_distance: "200m（徒歩約3分）",
          spot_image: ""
        }
      ]
    },
    {
      name: "ショッピング",
      name_en: "shopping",
      spots: [
        {
          spot_name: "まいばすけっと武蔵関駅南口店",
          spot_cat: "supermarket",
          spot_latitude: 35.727245,
          spot_longitude: 139.576105,
          spot_intro: "駅近で便利な小型スーパーで、日常の買い物に重宝します。",
          spot_distance: "200m（徒歩約3分）",
          spot_image: ""
        },
        {
          spot_name: "セブンイレブン 練馬関町北２丁目",
          spot_cat: "convenience",
          spot_latitude: 35.727504,
          spot_longitude: 139.57515,
          spot_intro: "24時間営業で便利な、地域に根ざしたコンビニエンスストアです。",
          spot_distance: "200m（徒歩約3分）",
          spot_image: ""
        }
      ]
    }
  ]
};

export default function TestFacilityMap() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Facility Markers Map Test</h1>
      <FacilityMarkersMap
        facilityData={testFacilityData}
        centerLatitude={35.72576792369004}
        centerLongitude={139.5748806492663}
        propertyName="練馬区ハウス"
      />
    </div>
  );
}
