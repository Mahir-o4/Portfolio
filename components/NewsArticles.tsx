"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, type Transition } from "motion/react";
import Stack from "./Stack";
import SectionDraft from "@/components/arch/SectionDraft";

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
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const reveal = (delay: number) => ({
    initial: reduced ? {} : { opacity: 0, transform: "translateY(16px)" },
    whileInView: { opacity: 1, transform: "translateY(0px)" },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.28, delay, ease: [0.32, 0.72, 0, 1] } satisfies Transition,
  });

  useEffect(() => {
    let isMounted = true;

    const loadNews = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/news");
        const data = (await response.json()) as NewsApiResponse;

        if (!response.ok || data.status !== "success") {
          throw new Error(data.message || "Unable to load news.");
        }

        if (isMounted) {
          setNews(Array.isArray(data.news) ? data.news : []);
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
      <div key={item.id || `${item.title}-${index}`} className="bezel h-full w-full">
      <article
        className="bezel-core h-full w-full flex flex-col overflow-hidden text-[#000000]"
      >
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="h-44 max-md:h-28 w-full object-cover shrink-0"
            draggable={false}
            onDragStart={(event) => event.preventDefault()}
          />
        ) : (
          <div className="h-44 max-md:h-28 w-full bg-[#EAE6DA] shrink-0" aria-hidden="true" />
        )}
        <div className="flex-1 min-h-0 p-3 max-md:p-2 flex flex-col gap-2 max-md:gap-1">
          <h3 className="text-base max-md:text-xs font-semibold leading-snug line-clamp-4">
            {item.title}
          </h3>
          <p className="text-sm max-md:text-[10px] leading-relaxed flex-1 min-h-0 overflow-y-auto pr-1" style={{ color: "var(--text-secondary)" }}>
            {item.snippet}
          </p>
          <div className="mt-auto flex items-center justify-between">
            <span className="code-text text-[10px] max-md:text-[8px] uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
              {item.source || "Tech"}
            </span>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs max-md:text-[10px] font-medium text-[#000000] underline underline-offset-4 decoration-[rgba(22,19,14,0.3)] hover:decoration-[#000000]"
            >
              Read more...
            </a>
          </div>
        </div>
      </article>
      </div>
    ));
  }, [news]);

  return (
    <section
      ref={ref}
      id="articles"
      className="relative w-full cv-auto px-16 max-md:px-4 py-24 md:py-36 mb-10 max-md:mb-16 overflow-hidden"
    >
      <SectionDraft section="news" variant="sheet" tone="paper" />

      <div className="container-page">
        <motion.div {...reveal(0)} className="flex items-center gap-3 mb-8">
          <span className="eyebrow">
            tech wire
          </span>
          <span className="h-px flex-1 max-w-12 bg-[rgba(22,19,14,0.2)]" />
          <span className="ml-auto code-text text-xs" style={{ color: "var(--text-dim)" }}>
            ~/news
          </span>
        </motion.div>
      </div>
      <div className="w-full md:min-h-screen min-h-auto flex items-center md:justify-around justify-center max-md:flex-col max-md:gap-8">
      <motion.div
        {...reveal(0.1)}
        className="flex flex-col gap-5"
      >
        <h2 className="type-heading text-5xl max-md:text-3xl" style={{ color: "var(--text)" }}>News Articles</h2>
        <p className="max-md:text-sm" style={{ color: "var(--text-secondary)" }}>Check out what&apos;s going on around the world!</p>
      </motion.div>
      <motion.div {...reveal(0.2)}>
        {error ? <p className="mb-2 text-xs text-[#9A2B1E]">{error}</p> : null}
        {isLoading ? (
          <p className="text-sm max-md:text-xs" style={{ color: "var(--text-secondary)" }}>Loading articles...</p>
        ) : cards.length ? (
          <div className="w-95 h-115 max-md:w-60 max-md:h-80">
            <Stack
              randomRotation={false}
              sensitivity={200}
              sendToBackOnClick={false}
              cards={cards}
              autoplay={true}
              autoplayDelay={8000}
              pauseOnHover={true}
            />
          </div>
        ) : (
          <p className="text-sm max-md:text-xs" style={{ color: "var(--text-secondary)" }}>No articles available.</p>
        )}
        {!isLoading && !error && cards.length ? (
          <p className="code-text mt-3 text-center text-xs" style={{ color: "var(--text-dim)" }}>
            Swipe through the deck for more
          </p>
        ) : null}
      </motion.div>
      </div>
    </section>
  );
};

export default NewsArticles;
