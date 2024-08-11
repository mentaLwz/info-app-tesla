'use client';

import { useState, useCallback } from 'react';
import HeatMap from '@uiw/react-heat-map';

import type { NewsBlock } from "@/models/NewsBlock";

// Assume this function exists to fetch news data for a given date
async function fetchNewsForDate(date: string): Promise<string[]> {
  // Implementation of API call goes here
  // For now, we'll return a mock result
  return [`Mock news 1 for ${date}`, `Mock news 2 for ${date}`];
}

export default function HeatMapView({ value, onDateClick }: { value: { date: string; value: number }[], onDateClick: (date: string) => void }) {
  const currentYear = new Date().getFullYear();
  const startDate = new Date(`${currentYear}-01-01`);

  const normalizeValue = (count: number) => {
    const min = Math.min(...value.map(v => v.value));
    const max = Math.max(...value.map(v => v.value));
    return (count - min) / (max - min) * 30 - 15;
  };

  const formattedValue = value.map(item => ({
    date: item.date,
    count: normalizeValue(item.value),
  }));

  const customColors = {
    '-15': '#053061', // Dark blue for significant decrease
    '-10': '#2166ac',
    '-5': '#4393c3',
    0: '#f7f7f7',    // White for no change
    5: '#f4a582',
    10: '#d6604d',
    15: '#b2182b'    // Dark red for significant increase
  };

  const handleRectClick = useCallback((date: string) => {
    onDateClick(date);
  }, [onDateClick]);

  return (
    <div>
      <HeatMap
        className='pt-6'
        value={formattedValue}
        startDate={startDate}
        endDate={new Date(`${currentYear}-12-31`)}
        width={800}
        height={200}
        rectSize={14}
        legendCellSize={0}
        rectProps={{
          rx: 3,
        }}
        panelColors={customColors}
        style={{ color: customColors[15], '--rhm-rect-active': customColors[15] } as React.CSSProperties}
        rectRender={(props, data) => (
          <rect
            {...props}
            onClick={() => handleRectClick(data.date)}
            style={{ cursor: 'pointer' }}
          />
        )}
      />
    </div>
  );
}