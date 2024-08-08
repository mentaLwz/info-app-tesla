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

  const getGradientColor = (score: number) => {
    const minScore = -5;
    const maxScore = 5;
    const normalizedScore = (score - minScore) / (maxScore - minScore);
    const hue = 130;
    const saturation = Math.round(100 * normalizedScore);
    const lightness = Math.round(100 - 30 * normalizedScore);
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Shanghai'
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
      ref={contentRef}
      className={`shadow-lg rounded-xl relative overflow-hidden mx-2 p-3 font-mono font-bold
        transition-all duration-300 ease-in-out`}
      style={{
        background: gradientColor,
        height: isHovered ? expandedHeight : '8rem',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        zIndex: isHovered ? 10 : 'auto',
        border: isHovered ? '2px solid rgba(0, 0, 0, 0.3)' : '2px solid transparent',
        boxShadow: isHovered ? '0 0 15px rgba(0, 0, 0, 0.2)' : 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <p className="mb-2">{title}</p>
      <p className={`text-sm font-thin transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        {formattedDate}
      </p>
      {link && (
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
          className={`italic font-bold text-sm text-blue-800 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        >
          Open Link in New Tab
        </a>
      )}
    </div>
  );
}