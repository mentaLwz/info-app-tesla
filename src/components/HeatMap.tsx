'use client';

import HeatMap from '@uiw/react-heat-map';

export default function HeatMapView({ value }: { value: { date: string; count: number }[] }) {
  const currentYear = new Date().getFullYear();
  const startDate = new Date(`${currentYear}-01-01`);

  const formattedValue = value.map(item => ({
    date: item.date,
    count: item.count,
  }));

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
      />
    </div>
  );
}