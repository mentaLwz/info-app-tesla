'use client';
import { useEffect, useState } from 'react';
import NewsContainer from './NewsContainer';
import Footer from './Footer';
import getPrevNextPages from '@/lib/getPrevNextPages';
import type { NewsBlockResp } from "@/models/NewsBlock";

type Props = {
  page: number
}

function GalleryContent({ page }: Props) {
  const [newsBlocksResp, setNewsBlocksResp] = useState<NewsBlockResp | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const cacheKey = `newsBlocksResp_${page}`;

    const isValidCache = (data: any) => {
      const now = new Date().getTime();
      return data && data.timestamp && (now - data.timestamp) < 60 * 60 * 1000;
    };

    const getCachedData = () => {
      const cachedData = localStorage.getItem(cacheKey);
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        if (isValidCache(parsedData)) {
          return parsedData.data;
        }
      }
      return null;
    };

    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/news?page=${page}&limit=20`);
        if (!response.ok) {
          throw new Error('获取新闻失败');
        }
        const data = await response.json();
        setNewsBlocksResp(data);
        localStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: new Date().getTime() }));
      } catch (err) {
        setError(err instanceof Error ? err : new Error('未知错误'));
      } finally {
        setIsLoading(false);
      }
    };

    const cachedData = getCachedData();
    if (cachedData) {
      setNewsBlocksResp(cachedData);
      setIsLoading(false);
    } else {
      fetchData();
    }
  }, [page]);

  if (isLoading) {
    return <div>加载中...</div>;
  }

  if (error || !newsBlocksResp || newsBlocksResp.items.length === 0) {
    return <h2 className="m-4 text-2xl font-bold">未找到新闻</h2>;
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
  return <GalleryContent page={page} />;
}