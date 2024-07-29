import fetchNewsBlockList from "@/lib/fetchNewsBlocks";
import type { NewsBlockResp } from "@/models/NewsBlock";
import NewsContainer from "./NewsContainer";
import Footer from "./Footer";
import getPrevNextPages from "@/lib/getPrevNextPages";

type Props = {
  page?: number | undefined
}

export default async function Gallery({ page }: Props) {
  let url = "api?page=" + page

  const newsBlocksResp: NewsBlockResp | undefined = await fetchNewsBlockList(url)
  
  if (!newsBlocksResp || newsBlocksResp.items.length === 0) return <h2 className="m-4 text-2xl font-bold">No news Found</h2>

  const limit = newsBlocksResp.limit
  const totalCount = newsBlocksResp.totalCount
  if (page === undefined) page = 0
  const { prevPage, nextPage } = getPrevNextPages(page, limit, totalCount)
  const footerProps = {page, nextPage, prevPage}

  return (
    <>
      <section className="
      m-4 
      grid sm:grid-cols-1 
      md:grid-cols-2 
      lg:grid-cols-3 
      xl:grid-cols-5 
      gap-5"
      >
        {
          newsBlocksResp.items.map(block => (
            <NewsContainer  
            id={block.id}          
            key={block.id.toString()} // 假设每个 block 有一个唯一的 id 属性
            title={block.title}
            link={block.link}
            source={block.source}
            score={block.score}
            date={block.date}></NewsContainer>
          ))
        }
      </section>
      <Footer {...footerProps} />
    </>
  )

}




