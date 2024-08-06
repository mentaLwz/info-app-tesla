import type { NewsBlock } from "@/models/NewsBlock";
import Link from "next/link";
import { stringify } from "querystring";





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
    const hue = 130; // 固定为浅蓝色的色相值
    const saturation = 100 * normalizedScore // 饱和度从 0% 到 100%
    const lightness = 100 - 30 * normalizedScore // 亮度从 100%（白色）到 70%

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`
  };


  const newdate = new Date(date);

// 使用 toLocaleString 方法格式化日期
const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',   // 'numeric' or '2-digit'
  month: 'short',    // 'numeric', '2-digit', 'narrow', 'short', 'long'
  day: '2-digit',    // 'numeric' or '2-digit'
  hour: '2-digit',   // 'numeric' or '2-digit'
  minute: '2-digit', // 'numeric' or '2-digit'
  second: '2-digit', // 'numeric' or '2-digit'
  hour12: false,     // true or false
  timeZone: 'Asia/Shanghai' // 使用中国标准时间
};

const formattedDate = date.toLocaleString('en-US', options);
  if (score == null) {
    score = 0
  }

  const gradientColor = getGradientColor(score);
  return (
    <div className="h-32 shadow-lg rounded-xl
  relative overflow-hidden group mx-2 pl-3 pt-3 pr-2 font-mono font-bold
  hover:shadow-2xl transform hover:scale-150 hover:z-10 hover:bg-red-300 hover:text-black hover:h-36 transition-all duration-500 ease-in-out " 
  style={{
    background: `linear-gradient(to right, ${gradientColor}, ${gradientColor})`,
  }}>
      <p>{title}</p>
      <p className="hidden text-sm font-thin group-hover:block">{formattedDate.toString()}</p>
      <span></span>
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer"
        className="hidden group-hover:block transition-opacity duration-500 ease-in-out italic font-bold text-sm text-yellow-600">
          Open Link in New Tab
        </a>
      ) : (
        <span>No link available</span>
      )}
    </div>
  )
}