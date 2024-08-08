'use client';

import React, { useState, useEffect } from 'react';
import HeatMapOverlay from './HeatMapOverlay';

const HeatMapButton: React.FC = () => {
  const [showHeatMap, setShowHeatMap] = useState(false);
  const [heatMapData, setHeatMapData] = useState<any[]>([]);

  useEffect(() => {
    // Fetch heat map data when component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('/api/heatmap');
        if (!response.ok) throw new Error('Failed to fetch heat map data');
        const data = await response.json();
        setHeatMapData(data);
      } catch (error) {
        console.error("Error fetching heat map data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <button
        onClick={() => setShowHeatMap(true)}
        className="px-4 py-2 bg-lime-400 text-white rounded"
      >
        HeatMap
      </button>
      {showHeatMap && (
        <HeatMapOverlay 
          data={heatMapData} 
          onClose={() => setShowHeatMap(false)} 
        />
      )}
    </>
  );
};

export default HeatMapButton;