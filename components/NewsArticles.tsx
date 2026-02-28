"use client";

import { useEffect, useMemo, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Stack from "./Stack";

type NewsItem = {
  id: string;
  title: string;
  snippet: string;
  link: string;
  image: string | null;
  source: string | null;
};

type NewsApiResponse = {
  status: "success" | "error";
  message?: string;
  news?: NewsItem[];
};

const NewsArticles = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    let isMounted = true;

    const loadNews = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/news", { cache: "no-store" });
        const data = (await response.json()) as NewsApiResponse;

        if (!response.ok || data.status !== "success") {
          throw new Error(data.message || "Unable to load news.");
        }

        if (isMounted) {
          setNews(Array.isArray(data.news) ? data.news.slice(0, 5) : []);
          setError("");
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Unable to load news.");
          setNews([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadNews();

    return () => {
      isMounted = false;
    };
  }, []);

  const cards = useMemo(() => {
    return news.map((item, index) => (
      <article
        key={item.id || `${item.title}-${index}`}
        className="h-full w-full bg-slate-900 text-slate-100 border border-slate-700 flex flex-col overflow-hidden"
      >
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="h-44 max-md:h-28 w-full object-cover shrink-0"
            draggable={false}
            onDragStart={(event) => event.preventDefault()}
          />
        ) : (
          <div className="h-44 max-md:h-28 w-full bg-slate-800 shrink-0" />
        )}
        <div className="flex-1 min-h-0 p-3 max-md:p-2 flex flex-col gap-2 max-md:gap-1">
          <h3 className="text-md max-md:text-xs font-semibold leading-snug line-clamp-4">
            {item.title}
          </h3>
          <p className="text-sm max-md:text-[10px] text-slate-300 leading-relaxed flex-1 min-h-0 overflow-y-auto no-scrollbar pr-1">
            {item.snippet}
          </p>
          <div className="mt-auto flex items-center justify-between">
            <span className="text-[10px] max-md:text-[6px] uppercase tracking-wide text-accent-cyan">
              {item.source || "Tech"}
            </span>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs max-md:text-[8px] font-medium text-violet-300 hover:text-violet-200"
            >
              Read more...
            </a>
          </div>
        </div>
      </article>
    ));
  }, [news]);

  return (
    <div
      ref={ref}
      id = "articles"
      className="w-full md:min-h-screen max-h-screen flex items-center md:justify-around justify-center px-16 max-md:px-4 max-md:flex-col max-md:gap-8 mb-10 max-md:mb-16"
    >
      <div
        className={`flex flex-col gap-5 ${isVisible ? "slide-in-left" : "opacity-0"}`} style={{animationDelay:'0.2s'}}
      >
        <h1 className="text-6xl max-md:text-3xl text-accent-pink">News Articles</h1>
        <p className="max-md:text-sm">Check out what's going on around the world!!</p>
      </div>
      <div className={`${isVisible ? 'slide-in-right' : 'opacity-0'}`}  style={{animationDelay:'0.2s'}}>
        {error ? <p className="mb-2 text-xs text-rose-300">{error}</p> : null}
        {isLoading ? (
          <p className="text-sm max-md:text-xs text-slate-300">Loading articles...</p>
        ) : cards.length ? (
          <div className="w-95 h-115 max-md:w-60 max-md:h-80">
            <Stack
              randomRotation={false}
              sensitivity={200}
              sendToBackOnClick={false}
              cards={cards}
              autoplay={typeof window !== 'undefined' && window.innerWidth < 768}
              autoplayDelay={5000}
              pauseOnHover={true}
            />
          </div>
        ) : (
          <p className="text-sm max-md:text-xs text-slate-300">No articles available.</p>
        )}
      </div>
    </div>
  );
};

export default NewsArticles;
