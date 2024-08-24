'use client';

import { useState, useRef, useEffect } from 'react';
import type { NewsBlock } from "@/models/NewsBlock";

export default function NewsContainer({
  id,
  title,
  date,
  link,
  source,
  score,
}: NewsBlock) {
  const [isHovered, setIsHovered] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [expandedHeight, setExpandedHeight] = useState('9rem');

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
    "-5": "#f5b041"
  };

  const getGradientColor = (score: number) => {
    const roundedScore = Math.round(score);
    const clampedScore = Math.max(-5, Math.min(5, roundedScore));
    return colorMap[clampedScore.toString() as keyof typeof colorMap] || "#ffffff"; // Default to white if score is 0 or out of range
  };

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC'
  };

  const formattedDate = new Date(date).toLocaleString('en-US', options);
  const gradientColor = getGradientColor(score ?? 0);

  useEffect(() => {
    if (contentRef.current) {
      setExpandedHeight(`${contentRef.current.scrollHeight + 20}px`);
    }
  }, [title, formattedDate]);

  return (
    <div 
      className="relative mx-1 p-3 font-mono font-bold"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={contentRef}
        className={`mx-1 p-3 shadow-lg rounded-xl overflow-hidden transition-all duration-300 ease-in-out`}
        style={{
          background: `${gradientColor}80`,
          height: '8rem',
          border: '2px solid rgba(0, 0, 0, 0.03)',
        }}
      >
        <p className="mb-2">{title}</p>
      </div>
      {isHovered && (
        <div
          className="absolute top-0 left-0 w-full h-full shadow-lg rounded-xl p-3 font-mono font-bold transition-all duration-300 ease-in-out"
          style={{
            background: `${gradientColor}`,
            height: expandedHeight,
            transform: 'scale(1.05)',
            zIndex: 10,
            border: '2px solid rgba(0, 0, 0, 0.3)',
            boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
          }}
        >
          <p className="mb-2">{title}</p>
          <p className="text-sm font-thin">{formattedDate}</p>
          {link && (
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="italic font-bold text-sm text-blue-800"
            >
              Open Link in New Tab
            </a>
          )}
        </div>
      )}
    </div>
  );
}