'use client';

import { useState } from 'react';
import HeatMapView from './HeatMap';

export default function HeatMapButton() {
  const [showHeatMap, setShowHeatMap] = useState(false);
  const [heatMapData, setHeatMapData] = useState<any[]>([]);

  const handleMouseEnter = async () => {
    if (heatMapData.length === 0) {
      try {
        const response = await fetch('/api/heatmap');
        if (!response.ok) throw new Error('Failed to fetch heat map data');
        const data = await response.json();
        setHeatMapData(data);
      } catch (error) {
        console.error("Error fetching heat map data:", error);
      }
    }
    setShowHeatMap(true);
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={() => setShowHeatMap(false)}>
      <button>HeatMap</button>
      {showHeatMap && (
        <div style={{ position: 'absolute', zIndex: 1000 }}>
          <HeatMapView value={heatMapData} />
        </div>
      )}
    </div>
  );
}