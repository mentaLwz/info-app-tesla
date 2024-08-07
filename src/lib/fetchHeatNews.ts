import { dbConnect } from './db';
import Tesla from '@/models/Item'; // Assuming you have a Tesla model defined

export async function fetchHeatMapData(): Promise<{ date: string; count: number }[]> {
  try {
    // Connect to the database
    await dbConnect();

    // Aggregate data from MongoDB
    const heatMapData = await Tesla.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          count: {
            $sum: {
              $cond: [
                { $regexMatch: { input: "$score", regex: /^\d+(\.\d+)?$/ } },
                { $toDouble: "$score" },
                0
              ]
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          count: 1
        }
      },
      {
        $sort: { date: 1 }
      }
    ]);

    // Format the data for HeatMapView
    return heatMapData.map(item => ({
      date: item.date,
      count: item.count
    }));

  } catch (error) {
    console.error("Error fetching heat map data:", error);
    throw new Error("Failed to fetch heat map data");
  }
}