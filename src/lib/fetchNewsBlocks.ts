import type { NewsBlock, NewsBlockResp } from "@/models/NewsBlock";
import { NewsBlockRespScheme } from "@/models/NewsBlock";
import env from "./env";


import { dbConnect } from '@/lib/db';
import Tesla from '@/models/Item';

export async function getData(page: number, limit: number) {
  // 解析查询参数
  


  // 连接数据库
  await dbConnect();
  console.log("Database connected");

  // 获取所有 item 的数量
  const totalCount = await Tesla.countDocuments({});
  console.log(`Total count: ${totalCount}`);

  // 查询数据库，按 id 倒序排序
  const items = await Tesla.find({})
    .sort({ date: -1, id: -1 }) // 按 id 倒序排序
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();

  console.log(`Tesla found: ${items.length}`);


  // 计算总页数
  const totalPages = Math.ceil(totalCount / limit);

  // 返回结果
  return {
    page,
    limit,
    totalPages,
    totalCount,
    items,
  };
}

export async function getNewsByDate(date: string): Promise<NewsBlock[]> {
  await dbConnect();
  console.log("Database connected for date query");

  const startDate = new Date(date);
  const endDate = new Date(date);
  endDate.setDate(endDate.getDate() + 1);

  try {
    const items = await Tesla.find({
      date: { $gte: startDate, $lt: endDate }
    }).sort({ date: -1, id: -1 }).exec();

    console.log(`Tesla items found for ${date}: ${items.length}`);

    return items;
  } catch (e) {
    if (e instanceof Error) console.log(e.stack);
    return [];
  }
  // return []
}

export default async function fetchNewsBlockList(page: number): Promise<NewsBlockResp | undefined> {
  try {
    const res = await getData(page, 20)
    const newsBlockList: NewsBlockResp = NewsBlockRespScheme.parse(res)
    if (newsBlockList.items.length === 0 ) return undefined
    return newsBlockList
  } catch (e) {
    if (e instanceof Error) console.log(e.stack)
  }
  
}