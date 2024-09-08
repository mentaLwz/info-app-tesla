import type { NewsBlock, NewsBlockResp } from "@/models/NewsBlock";
import { NewsBlockRespScheme } from "@/models/NewsBlock";
import env from './env';

const API_BASE_URL = env.API_BASE_URL;

export async function getData(page: number, limit: number): Promise<NewsBlockResp> {
  const response = await fetch(`${API_BASE_URL}/news?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch news data');
  }
  return await response.json();
}

export async function getNewsByDate(date: string): Promise<NewsBlock[]> {
  const response = await fetch(`${API_BASE_URL}/news?date=${date}`);
  if (!response.ok) {
    throw new Error('Failed to fetch news by date');
  }
  return await response.json();
}

export default async function fetchNewsBlockList(page: number): Promise<NewsBlockResp | undefined> {
  try {
    const res = await getData(page, 20);
    const newsBlockList: NewsBlockResp = NewsBlockRespScheme.parse(res);
    if (newsBlockList.items.length === 0) return undefined;
    return newsBlockList;
  } catch (e) {
    if (e instanceof Error) console.log(e.stack);
  }
}