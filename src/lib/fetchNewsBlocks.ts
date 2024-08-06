import type { NewsBlock, NewsBlockResp } from "@/models/NewsBlock";
import { NewsBlockRespScheme } from "@/models/NewsBlock";
import env from "./env";


import { dbConnect } from '@/lib/db';
import Tesla from '@/models/Item';


export async function getData(page:number, limit:number) {

  // 解析查询参数
  


  // 连接数据库
  await dbConnect();

  // // 获取所有 item 的数量
  // const totalCount = await Item.countDocuments({});

  // // 查询数据库，按 id 倒序排序
  // const items = await Item.find({})
  //   .sort({ id: -1 }) // 按 id 倒序排序
  //   .skip((page - 1) * limit)
  //   .limit(limit)
  //   .exec();

  console.log("Database connected");

  // 获取所有 item 的数量
  const totalCount = await Tesla.countDocuments({});
  console.log(`Total count: ${totalCount}`);

  // 查询数据库，按 id 倒序排序
  const items = await Tesla.find({})
    .sort({ id: -1 }) // 按 id 倒序排序
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

export default async function fetchNewsBlockList(page:number):
Promise<NewsBlockResp | undefined> {

  try {
    const res = await getData(page, 20)
    console.log(res)
    const newsBlockList: NewsBlockResp = NewsBlockRespScheme.parse(res)
    // console.log(newsBlockList)
    const parseData = NewsBlockRespScheme.parse(newsBlockList)

    if (parseData.items.length === 0 ) return undefined
    return parseData
  } catch (e) {
    if (e instanceof Error) console.log(e.stack)
  }
  
}