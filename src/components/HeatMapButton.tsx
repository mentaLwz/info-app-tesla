'use client';

import React, { useState, useEffect } from 'react';
import HeatMapOverlay from './HeatMapOverlay';

const fetchWithCache = async (url: string, cacheKey: string) => {
  const cachedData = localStorage.getItem(cacheKey);
  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);
    if (new Date().getTime() - timestamp < 60 * 60 * 1000) { // 1小时缓存
      return data;
    }
  }

  const response = await fetch(url);
  if (!response.ok) throw new Error('获取数据失败');
  const data = await response.json();
  localStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: new Date().getTime() }));
  return data;
};

const HeatMapButton: React.FC = () => {
  const [showHeatMap, setShowHeatMap] = useState(false);
  const [heatMapData, setHeatMapData] = useState<any>(null);
  const [stockData, setStockData] = useState<any>(null);

  useEffect(() => {
    if (showHeatMap && (!heatMapData || !stockData)) {
      const fetchData = async () => {
        try {
          const [heatMap, stock] = await Promise.all([
            fetchWithCache(`${process.env.NEXT_PUBLIC_API_BASE_URL}/heatmap`, 'heatMapCache'),
            fetchWithCache(`${process.env.NEXT_PUBLIC_API_BASE_URL}/stock?year=2024`, 'stockCache')
          ]);
          setHeatMapData(heatMap);
          setStockData(stock);
        } catch (error) {
          console.error("获取数据时出错:", error);
        }
      };
      fetchData();
    }
  }, [showHeatMap]);

  return (
    <>
      <button
        onClick={() => setShowHeatMap(true)}
        className="px-4 py-2 text-white font-mono rounded bg-green-400"
      >
        HeatMap
      </button>
      {showHeatMap && (
        <HeatMapOverlay
          heatMapData={heatMapData || []}
          stockData={stockData || []}
          onClose={() => setShowHeatMap(false)}
        />
      )}
    </>
  );
};

export default HeatMapButton;