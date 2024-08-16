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

interface HeatMapItem {
  date: string;
  count: number;
  open?: number;  // Optional field
  close?: number; // Optional field
  // Add any other optional fields you need
}

interface HeatMapViewProps {
  value: HeatMapItem[];
  onDateClick: (date: string) => void;
  handleMouseEnter: (event: React.MouseEvent<SVGRectElement>, data: any) => React.ReactNode;
}

export default function HeatMapView({ value, onDateClick, handleMouseEnter }: HeatMapViewProps) {
  const [tooltipContent, setTooltipContent] = useState<React.ReactNode | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const heatmapRef = useRef<HTMLDivElement>(null);

  const currentYear = new Date().getFullYear();
  const startDate = new Date(`${currentYear}-01-01`);

  const normalizeValue = (count: number) => {
    const min = Math.min(...value.map(v => v.count));
    const max = Math.max(...value.map(v => v.count));
    return (count - min) / (max - min) * 30 - 15;
  };

  const formattedValue = value.map(item => ({
    date: item.date,
    count: normalizeValue(item.count),
    open: item.open ?? 0,
    close: item.close ?? 0
  }));

  const customColors = {
    '-15': '#f5b041', '-10': '#fad7a0', '-5': '#fef5e7',
    0: '#f7f7f7', 5: '#eafaf1', 10: '#abebc6', 15: '#58d68d'
  };

  const handleRectClick = useCallback((date: string) => {
    onDateClick(date);
  }, [onDateClick]);

  const handleMouseEnterInternal = (event: React.MouseEvent<SVGRectElement>, data: any) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const tooltipData = handleMouseEnter(event, data);
    setTooltipContent(tooltipData);
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
            onMouseEnter={(e) => handleMouseEnterInternal(e, data)}
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