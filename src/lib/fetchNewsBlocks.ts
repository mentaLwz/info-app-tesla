import type { NewsBlock, NewsBlockResp } from "@/models/NewsBlock";
import { NewsBlockRespScheme } from "@/models/NewsBlock";
import env from "./env";




export default async function fetchNewsBlockList(page:number):
Promise<NewsBlockResp | undefined> {

  // console.log(url)
  // url = "http://localhost:3000/"+url
  const isServer = typeof window === 'undefined';
  const baseUrl = isServer ? process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000' : '';
  const url = `${baseUrl}/api?page=${page}`;


  try {
    const res = await fetch(url, {
      headers: {
        Authorization: env.API_KEY
      },
      next: { revalidate: 60 },
    })
    if (!res.ok) throw Error("Fetch news block error!\n")
    
    const newsBlockList: NewsBlockResp = await res.json()
    // console.log(newsBlockList)
    const parseData = NewsBlockRespScheme.parse(newsBlockList)

    if (parseData.items.length === 0 ) return undefined
    return parseData
  } catch (e) {
    if (e instanceof Error) console.log(e.stack)
  }
  
}