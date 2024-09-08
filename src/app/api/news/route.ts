import { NextResponse } from 'next/server';
import { getNewsByDate, getData } from '@/lib/fetchNewsBlocks';

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');
  const page = searchParams.get('page');
  const limit = searchParams.get('limit');
  
  try {
    if (date) {
      const news = await getNewsByDate(date);
      return NextResponse.json(news);
    } else if (page && limit) {
      const pageNum = parseInt(page, 10);
      const limitNum = parseInt(limit, 10);
      if (isNaN(pageNum) || isNaN(limitNum)) {
        return NextResponse.json({ error: 'Invalid page or limit' }, { status: 400 });
      }
      const newsData = await getData(pageNum, limitNum);
      return NextResponse.json(newsData);
    } else {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}