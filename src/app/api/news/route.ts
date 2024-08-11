import { NextResponse } from 'next/server';
import { getNewsByDate } from '@/lib/fetchNewsBlocks';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');
  
  if (!date) {
    return NextResponse.json({ error: 'Date is required' }, { status: 400 });
  }

  const news = await getNewsByDate(date);
  return NextResponse.json(news);
}