import { NextResponse } from 'next/server';
import fetchTeslaStock from '@/lib/fetchStockPrice';
export const runtime = "edge";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const year = parseInt(searchParams.get('year') || '2024', 10);

  if (isNaN(year)) {
    return NextResponse.json({ error: "Invalid year format" }, { status: 400 });
  }

  try {
    const data = await fetchTeslaStock(year);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching stock price data:", error);
    return NextResponse.json({ error: "Failed to fetch stock price data" }, { status: 500 });
  }
}