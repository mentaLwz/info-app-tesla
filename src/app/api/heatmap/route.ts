import { NextResponse } from 'next/server';
import { fetchHeatMapData } from '@/lib/fetchHeatNews';

export async function GET() {
  try {
    const data = await fetchHeatMapData();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching heat map data:", error);
    return NextResponse.json({ error: "Failed to fetch heat map data" }, { status: 500 });
  }
}