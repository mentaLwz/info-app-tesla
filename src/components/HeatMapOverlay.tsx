'use client';

import React from 'react';
import HeatMapView from './HeatMap';

interface HeatMapOverlayProps {
  data: any[]; // Replace 'any' with your actual data type
  onClose: () => void;
}

const HeatMapOverlay: React.FC<HeatMapOverlayProps> = ({ data, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-4/5 h-4/5 max-w-4xl max-h-4xl overflow-auto">
        <button 
          onClick={onClose}
          className="float-right text-gray-600 hover:text-gray-800"
        >
          Close
        </button>
        <HeatMapView value={data} />
      </div>
    </div>
  );
};

export default HeatMapOverlay;