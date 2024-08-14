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

const BlurGradientBackground: React.FC<BlurGradientBackgroundProps> = ({ colors }) => {
  const boxId = 'blur-gradient-bg';

  useEffect(() => {
    let bgInstance: any = null;

    const initBackground = () => {
      if (window.Color4Bg) {
        bgInstance = new window.Color4Bg.AestheticFluidBg({
          dom: boxId,
          colors: colors,
          loop: true
        });
      }
    };

    const script = document.createElement('script');
    script.src = '/AestheticFluidBg.min.js';
    script.async = true;
    
    script.onload = () => {
      // Use setTimeout to ensure the DOM is ready
      setTimeout(initBackground, 0);
    };

    document.body.appendChild(script);

    return () => {
      if (bgInstance && bgInstance.destroy) {
        bgInstance.destroy();
      }
      document.body.removeChild(script);
    };
  }, [colors]);

  return <div id={boxId} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} />;
};

export default BlurGradientBackground;