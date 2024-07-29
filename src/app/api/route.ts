import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import Tesla from '@/models/Item';


export async function GET(request: Request) {

  // 解析查询参数
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 30);

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
  return NextResponse.json({
    page,
    limit,
    totalPages,
    totalCount,
    items,
  });
}