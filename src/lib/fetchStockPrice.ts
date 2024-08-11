import { dbConnect } from './db';
import TeslaStock from '@/models/Stock';
import { z } from 'zod';

// Define Zod schemas
const DayDataSchema = z.object({
  date: z.string(),
  open: z.number(),
  high: z.number(),
  low: z.number(),
  close: z.number(),
  volume: z.number(),
  dividends: z.number(),
  stock_splits: z.number(),
});

const StockDataSchema = z.object({
  year: z.number(),
  data: z.instanceof(Map).or(z.record(z.string(), DayDataSchema)),
});

export default async function fetchTeslaStock(year: number): Promise<{ date: string; value: number }[]> {
  try {
    await dbConnect();

    console.log(`Fetching stock data for year: ${year}`);
    const stockDocument = await TeslaStock.findOne({ year });
    
    if (!stockDocument) {
      console.log('No stock document found');
      throw new Error(`No stock data found for year ${year}`);
    }

    // Parse and validate the data using Zod
    const parsedData = StockDataSchema.parse(stockDocument.toObject({ flattenMaps: false }));

    const dataEntries = Array.from(parsedData.data as Map<string, z.infer<typeof DayDataSchema>>);
    

    // Calculate percentage changes
    const changes = dataEntries.map(([_, dayData]) => 
      (dayData.close - dayData.open) / dayData.open
    );

    // Calculate mean and standard deviation
    const mean = changes.reduce((sum, change) => sum + change, 0) / changes.length;
    const stdDev = Math.sqrt(changes.reduce((sum, change) => sum + Math.pow(change - mean, 2), 0) / changes.length);

    const processedData = dataEntries.map(([date, dayData]) => {
      const changePercentage = (dayData.close - dayData.open) / dayData.open;
      
      // Normalize using z-score, then scale to 0-30 range
      const zScore = (changePercentage - mean) / stdDev;
      const normalizedValue = Math.round((zScore + 3) / 6 * 30);

      return {
        date,
        value: Math.max(0, Math.min(30, normalizedValue))
      };
    });
    

    // console.log('Processed data:', processedData);

    processedData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return processedData;

  } catch (error) {
    console.error("Error fetching Tesla stock data:", error);
    throw error;
  }
}