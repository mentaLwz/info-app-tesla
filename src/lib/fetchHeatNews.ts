import { dbConnect } from '@/lib/db';
import Tesla from '@/models/Item'; // Assuming you have a Tesla model defined

export async function fetchHeatMapData(): Promise<{ date: string; count: number }[]> {
  try {
    // Connect to the database
    console.log("hello from fetchHeatMapData")
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

    // Get the current date
    const currentDate = new Date();
    // Calculate the date one year ago
    const oneYearAgo = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate());

    // Filter and map the data
    return heatMapData
      .filter(item => new Date(item.date) >= oneYearAgo)
      .map(item => ({
        date: item.date,
        count: item.count
      }));

  } catch (error) {
    console.error("Error fetching heat map data ---:", error);
    throw new Error("Failed to fetch heat map data");
  }
}