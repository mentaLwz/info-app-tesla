

interface HeatMapItem {
  date: string;
  count: number;
}

export async function fetchHeatMapData(): Promise<HeatMapItem[]> {
  try {
    console.log("Fetching heat map data from API");
    const response = await fetch(`${process.env.API_BASE_URL}/heatmap`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // 假设 API 返回的数据已经是正确的格式
    // 如果需要,您可以在这里添加额外的数据处理逻辑

    console.log(`Fetched ${data.length} heat map items`);
    return data;

  } catch (error) {
    console.error("Error fetching heat map data:", error);
    throw new Error("Failed to fetch heat map data");
  }
}