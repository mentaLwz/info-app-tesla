'use client';

import React, { useState, useCallback, useRef } from 'react';
import HeatMap from '@uiw/react-heat-map';

import type { NewsBlock } from "@/models/NewsBlock";

// Custom Tooltip component
const CustomTooltip = ({ content, position }: { content: React.ReactNode, position: { x: number, y: number } }) => (
  <div 
    style={{
      position: 'fixed',
      left: `${position.x}px`,
      top: `${position.y}px`,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '5px 10px',
      borderRadius: '4px',
      fontSize: '12px',
      zIndex: 1000,
      pointerEvents: 'none',
      transform: 'translate(-50%, -100%)',
    }}
  >
    {content}
  </div>
);

export default function HeatMapView({ value, onDateClick }: { value: { date: string; value: number }[], onDateClick: (date: string) => void }) {
  const [tooltipContent, setTooltipContent] = useState<React.ReactNode | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const heatmapRef = useRef<HTMLDivElement>(null);

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
    originalValue: item.value,
  }));

  const customColors = {
    '-15': '#f5b041', '-10': '#fad7a0', '-5': '#fef5e7',
    0: '#f7f7f7', 5: '#eafaf1', 10: '#abebc6', 15: '#58d68d'
  };

  const handleRectClick = useCallback((date: string) => {
    onDateClick(date);
  }, [onDateClick]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const handleMouseEnter = (event: React.MouseEvent<SVGRectElement>, data: any) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipContent(
      <div>
        <div>Date: {formatDate(data.date)}</div>
        <div>Value: {data.originalValue.toFixed(2)}</div>
      </div>
    );
    setTooltipPosition({ x: rect.left + rect.width / 2, y: rect.top });
  };

  const handleMouseLeave = () => {
    setTooltipContent(null);
  };

  return (
    <div ref={heatmapRef}>
      <HeatMap
        className='pt-6'
        value={formattedValue}
        startDate={startDate}
        endDate={new Date(`${currentYear}-12-31`)}
        width={800}
        height={200}
        rectSize={14}
        legendCellSize={0}
        rectProps={{ rx: 3 }}
        panelColors={customColors}
        style={{ color: customColors[15], '--rhm-rect-active': customColors[15] } as React.CSSProperties}
        rectRender={(props, data) => (
          <rect
            {...props}
            onClick={() => handleRectClick(data.date)}
            onMouseEnter={(e) => handleMouseEnter(e, data)}
            onMouseLeave={handleMouseLeave}
            style={{ cursor: 'pointer' }}
          />
        )}
      />
      {tooltipContent && (
        <CustomTooltip content={tooltipContent} position={tooltipPosition} />
      )}
    </div>
  );
}