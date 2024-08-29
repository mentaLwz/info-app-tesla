import { Suspense } from 'react';
import NewsContainer from './NewsContainer';
import Footer from './Footer';
import fetchNewsBlockList from '@/lib/fetchNewsBlocks';
import getPrevNextPages from '@/lib/getPrevNextPages';

type Props = {
  page: number
}

async function GalleryContent({ page }: Props) {
  const newsBlocksResp = await fetchNewsBlockList(page);
  
  if (!newsBlocksResp || newsBlocksResp.items.length === 0) {
    return <h2 className="m-4 text-2xl font-bold">No news Found</h2>;
  }

  const { limit, totalCount } = newsBlocksResp;
  const { prevPage, nextPage } = getPrevNextPages(page, limit, totalCount);


  return (
    <>
      <div className="recent-news-label font-mono text-center mb-1 mt-0">
        Most recent news about Tesla:
      </div>
      <section className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {newsBlocksResp.items.map((block, index) => (
          <NewsContainer  
            key={`news-${index}-${JSON.stringify(block.id)}`}
            id={block.id}          
            title={block.title}
            link={block.link}
            source={block.source}
            score={block.score}
            date={block.date}
            analyse={block.analyse}
          />
        ))}
      </section>
      <Footer page={page} nextPage={nextPage} prevPage={prevPage} />
    </>
  );
}

export default function Gallery({ page }: Props) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GalleryContent page={page} />
    </Suspense>
  );
}