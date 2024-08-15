'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    Color4Bg: any;
  }
}

interface BlurGradientBackgroundProps {
  colors: string[];
}

// This function is outside the component to ensure it's only defined once
const loadScript = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve();
    script.onerror = (e) => reject(e);
    document.body.appendChild(script);
  });
};

const BlurGradientBackground: React.FC<BlurGradientBackgroundProps> = ({ colors }) => {
  const boxId = 'blur-gradient-bg';
  const bgInstanceRef = useRef<any>(null);

  useEffect(() => {
    const initBackground = async () => {
      if (!window.Color4Bg) {
        console.log('Loading AestheticFluidBg script');
        await loadScript('/AestheticFluidBg.min.js');
        console.log('AestheticFluidBg script loaded');
      }

      if (window.Color4Bg && !bgInstanceRef.current) {
        console.log('Initializing AestheticFluidBg');
        bgInstanceRef.current = new window.Color4Bg.AestheticFluidBg({
          dom: boxId,
          colors: colors,
          loop: true
        });
        console.log('AestheticFluidBg initialized');
      }
    };

    initBackground();

    return () => {
      if (bgInstanceRef.current && bgInstanceRef.current.destroy) {
        console.log('Destroying AestheticFluidBg instance');
        bgInstanceRef.current.destroy();
        bgInstanceRef.current = null;
      }
    };
  }, [colors]);

  return (
    <div 
      id={boxId} 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100vh', 
        zIndex: -1,
        backgroundColor: colors[0]
      }} 
    />
  );
};

export default BlurGradientBackground;