import type { NewsBlock } from "@/models/NewsBlock";
import Link from "next/link";





export default function NewsContainer({
  id,
  title,
  date,
  link,
  source,
  score,
}: NewsBlock) {

  const getGradientColor = (score :number) => {
    const minScore = -5;
    const maxScore = 5;
    const normalizedScore = (score - minScore) / (maxScore - minScore); // 归一化到 0 到 1 之间

    // 使用 HSL 颜色模型从白色到浅蓝
    const hue = 200; // 固定为浅蓝色的色相值
    const saturation = 100 * normalizedScore // 饱和度从 0% 到 100%
    const lightness = 100 - 30 * normalizedScore // 亮度从 100%（白色）到 70%

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`
  };

  if (score == null) {
    score = 0
  }

  const gradientColor = getGradientColor(score);
  return (
    <div className="h-32 bg-cyan-100 shadow-md rounded-xl
  relative overflow-hidden group mx-2 pl-2 pt-2" 
  style={{
    background: `linear-gradient(to right, ${gradientColor}, ${gradientColor})`,
  }}>
      <p>{title}</p>
      <p>{source}</p>
    </div>
  )
}