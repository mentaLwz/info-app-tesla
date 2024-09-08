'use client';

import React, { useState, useCallback, useMemo } from 'react';
import HeatMapView from './HeatMap';
import type { NewsBlock } from "@/models/NewsBlock";

interface HeatMapOverlayProps {
  heatMapData: { date: string; count: number }[];
  stockData: { date: string; count: number }[];
  onClose: () => void;
}

const HeatMapOverlay: React.FC<HeatMapOverlayProps> = ({ heatMapData, stockData, onClose }) => {
  const [selectedNews, setSelectedNews] = useState<NewsBlock[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);


  const handleDateClick = useCallback(async (date: string) => {
    setIsLoading(true);
    setSelectedDate(date);
    try {
      const formattedDate = new Date(date).toISOString().split('T')[0];
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/news?date=${formattedDate}`);
      if (!response.ok) throw new Error('Failed to fetch news');
      const news = await response.json();
      setSelectedNews(news);
    } catch (error) {
      console.error('Failed to fetch news:', error);
      setSelectedNews([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const colorMap = {
    "1": "#eafaf1",
    "2": "#d5f5e3",
    "3": "#abebc6",
    "4": "#82e0aa",
    "5": "#58d68d",
    "-1": "#fef5e7",
    "-2": "#fdebd0",
    "-3": "#fad7a0",
    "-4": "#f8c471",
    "-5": "#f5b041",
    "0": "#ffffff" // Adding a neutral color for score 0
  };

  const getBackgroundColor = useMemo(() => (score: number) => {
    const roundedScore = Math.round(score);
    const clampedScore = Math.max(-5, Math.min(5, roundedScore));
    return colorMap[clampedScore.toString() as keyof typeof colorMap] || "#ffffff";
  }, []);

  const formatDate = (date: Date | string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'UTC'
    };
    return new Date(date).toLocaleString('en-US', options);
  };

  const handleActivityMouseEnter = (event: React.MouseEvent<SVGRectElement>, data: any) => {
    return (
      <div>
        <div>Date: {formatDate(data.date)}</div>
        <div>Activity Count: {data.count}</div>
      </div>
    );
  };

  const handleStockMouseEnter = (event: React.MouseEvent<SVGRectElement>, data: any) => {
    return (
      <div>
        <div>Date: {formatDate(data.date)}</div>
        <div>Stock price open: {data.open} close: {data.close}</div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-4/5 h-4/5 max-w-4xl max-h-4xl flex flex-col overflow-hidden">
        <div className="sticky top-0 bg-white z-10 p-4 border-b flex justify-between items-center rounded-t-lg">
          <h2 className="text-xl font-bold text-green-500">Heat Maps</h2>
          <button onClick={onClose} className="text-gray-800 hover:text-gray-800">Close</button>
        </div>
        <div className="overflow-auto p-6 flex-grow">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-green-500">Activity Heat Map</h3>
              <HeatMapView value={heatMapData} onDateClick={handleDateClick} handleMouseEnter={handleActivityMouseEnter} />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-green-500">Stock Heat Map</h3>
              <HeatMapView value={stockData} onDateClick={handleDateClick} handleMouseEnter={handleStockMouseEnter} />
            </div>
          </div>
          {isLoading && <p className="text-center mt-4">Loading news...</p>}
          {!isLoading && selectedNews.length > 0 && selectedDate && (
            <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                News for {new Date(selectedDate).toLocaleDateString()}:
              </h3>
              <ul className="space-y-4">
                {selectedNews.map((news, index) => (
                  <li 
                    key={`news-${index}-${JSON.stringify(news.id)}`}
                    className="p-4 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200"
                    style={{ backgroundColor: getBackgroundColor(news.score ?? 0) }}
                  >
                    <a href={news.link || '#'} target="_blank" rel="noopener noreferrer" className="block">
                      <h4 className="text-sm font-semibold text-blue-600 hover:underline mb-2">{news.title}</h4>
                      <p className="text-xs text-gray-600">{news.source || ''}</p>
                      <p className="text-xs text-gray-600">
                        {formatDate(news.date)}
                      </p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeatMapOverlay;