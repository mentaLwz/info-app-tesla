import mongoose from 'mongoose';
import { z } from 'zod';

// Zod schemas for validation
const longValidator = z.union([
  z.string(),
  z.object({
    low: z.number(),
    high: z.number(),
    unsigned: z.boolean(),
  })
]);

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
});

export type NewsBlock = z.infer<typeof ItemSchema>;
export type NewsBlockResp = z.infer<typeof NewsBlockRespScheme>;

// Define mongoose schema
const NewsBlockSchema = new mongoose.Schema({
  id: String,
  title: String,
  date: Date,
  link: String,
  source: String,
  score: Number,
});

// Create and export the model using a function
export function getNewsBlockModel() {
  return mongoose.models.NewsBlock || mongoose.model('NewsBlock', NewsBlockSchema);
}