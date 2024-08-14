'use client';

import React, { useState, useEffect } from 'react';
import HeatMapOverlay from './HeatMapOverlay';

const HeatMapButton: React.FC = () => {
  const [showHeatMap, setShowHeatMap] = useState(false);
  const [heatMapData, setHeatMapData] = useState<any[]>([]);
  const [stockData, setStockData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [heatmapResponse, stockResponse] = await Promise.all([
          fetch('/api/heatmap'),
          fetch('/api/stock?year=2024')
        ]);
        
        if (!heatmapResponse.ok || !stockResponse.ok) 
          throw new Error('Failed to fetch data');

        const heatmapData = await heatmapResponse.json();
        const stockData = await stockResponse.json();

        setHeatMapData(heatmapData);
        setStockData(stockData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <button
        onClick={() => setShowHeatMap(true)}
        className="px-4 py-2 text-white rounded"
        style={{ backgroundColor: '#40E0D0' }}
      >
        HeatMap
      </button>
      {showHeatMap && (
        <HeatMapOverlay 
          heatMapData={heatMapData}
          stockData={stockData}
          onClose={() => setShowHeatMap(false)} 
        />
      )}
    </>
  );
};

export default HeatMapButton;