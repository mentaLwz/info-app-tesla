import { z } from 'zod';

// Define Zod schemas
const StockDataSchema = z.array(z.object({
  date: z.string(),
  count: z.number(),
  open: z.number(),
  close: z.number()
}));

export default async function fetchTeslaStock(year: number): Promise<z.infer<typeof StockDataSchema>> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/stock?year=${year}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch stock data for year ${year}`);
    }
    const data = await response.json();
    return StockDataSchema.parse(data);
  } catch (error) {
    console.error("Error fetching Tesla stock data:", error);
    throw error;
  }
}