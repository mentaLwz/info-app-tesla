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

  return (
    <div className="h-32 bg-white shadow-md rounded-xl
  relative overflow-hidden group" >
      <p>{title}</p>
      <p>{source}</p>
    </div>
  )
}