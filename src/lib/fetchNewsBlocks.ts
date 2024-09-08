import type { NewsBlock, NewsBlockResp } from "@/models/NewsBlock";
import { NewsBlockRespScheme } from "@/models/NewsBlock";


const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getData(page: number, limit: number): Promise<NewsBlockResp> {
  const url = `${API_BASE_URL}/news?page=${page}&limit=${limit}`;
  console.log("Fetching URL:", url);
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error("API response not OK:", response.status, response.statusText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    console.error("Error details:", JSON.stringify(error, Object.getOwnPropertyNames(error)));
    throw error;
  }
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