import mongoose from 'mongoose';
import mongooseLong from 'mongoose-long';
import { nullable, z } from 'zod';

// 注册 mongoose-long 插件
mongooseLong(mongoose);

// 通过 `Types.Long` 使用 `Long` 类型
const { Types } = mongoose;
const { Long } = Types;

// 定义一个自定义的 zod 验证器来处理 Long 类型
const longValidator = z.object({
  low: z.number(),
  high: z.number(),
  unsigned: z.boolean(),
});

const dateValidator = z.union([
  z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date string",
  }),
  z.date(),
]);

const ItemSchema = z.object({
  id: longValidator,
  title: z.string(),
  date: dateValidator,
  link: z.string().nullable().optional(),
  source: z.string().nullable().optional(),
  score: z.number().nullable().optional(),
});


export const NewsBlockRespScheme = z.object({
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
  totalCount: z.number(),
  items: z.array(ItemSchema)
})


export type NewsBlock = z.infer<typeof ItemSchema>

export type NewsBlockResp = z.infer<typeof NewsBlockRespScheme>