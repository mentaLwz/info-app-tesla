'use client';

import React, { useState, useCallback, useMemo } from 'react';
import HeatMapView from './HeatMap';
import type { NewsBlock } from "@/models/NewsBlock";

interface HeatMapOverlayProps {
  heatMapData: { date: string; value: number }[];
  stockData: { date: string; value: number }[];
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
      const response = await fetch(`/api/news?date=${formattedDate}`);
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

  const getBackgroundColor = useMemo(() => (score: number) => {
    const minScore = -5;
    const maxScore = 5;
    const normalizedScore = (score - minScore) / (maxScore - minScore);
    const hue = 130;
    const saturation = Math.round(100 * normalizedScore);
    const lightness = Math.round(100 - 30 * normalizedScore);
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-4/5 h-4/5 max-w-4xl max-h-4xl overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Heat Maps</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">Close</button>
        </div>
        <div className="flex flex-col space-y-1">
          <div>
            <h3 className="text-lg font-semibold mb-1">Activity Heat Map</h3>
            <HeatMapView value={heatMapData} onDateClick={handleDateClick} />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Stock Heat Map</h3>
            <HeatMapView value={stockData} onDateClick={handleDateClick} />
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
                  key={`${news.id || index}-${Date.now()}`} 
                  className="p-4 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200"
                  style={{ backgroundColor: getBackgroundColor(news.score ?? 0) }}
                >
                  <a href={news.link || '#'} target="_blank" rel="noopener noreferrer" className="block">
                    <h4 className="text-sm font-semibold text-blue-600 hover:underline mb-2">{news.title}</h4>
                    <p className="text-xs text-gray-600">{news.source || ''}</p>
                    <p className="text-xs text-gray-600">
                      {news.date instanceof Date 
                        ? news.date.toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false,
                            timeZone: 'Asia/Shanghai'
                          })
                        : typeof news.date === 'string'
                          ? new Date(news.date).toLocaleString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: false,
                              timeZone: 'Asia/Shanghai'
                            })
                          : ''}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeatMapOverlay;