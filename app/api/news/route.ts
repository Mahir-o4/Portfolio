import { NextResponse } from "next/server";

const NEWSDATA_BASE_URL = "https://newsdata.io/api/1/latest";
const API_KEY = process.env.NEWS_API;
const TECH_QUERY =
  "(technology OR tech OR AI OR software OR cybersecurity OR startup OR gadgets OR cloud)";

// ── In-memory cache ──────────────────────────────────────────────────────────
// Budget: 200 calls/day → 1 call per 7.2 min minimum.
// TTL set to 8 min (480s) = max 180 calls/day, leaving a 20-call safety buffer.
// This cache lives for the lifetime of the server process (dev hot-reload safe
// because the timestamp gate prevents double-fetching within the same window).
// In production on Vercel, ISR revalidate below also caches at the CDN edge.

const CACHE_TTL_MS = 8 * 60 * 1000; // 8 minutes

type CachedPayload = {
  status: "success";
  count: number;
  nextPage: string | null;
  news: NewsItem[];
};

type CacheEntry = {
  payload: CachedPayload;
  fetchedAt: number; // Date.now()
};

// Module-level singleton — shared across requests in the same process
let cache: CacheEntry | null = null;

// ── ISR: also cache at the Next.js / CDN edge (production only) ───────────────
// 480 seconds aligns with the in-memory TTL above.
export const revalidate = 480;

// ── Types ────────────────────────────────────────────────────────────────────
type NewsDataArticle = {
  article_id?: string;
  title?: string;
  description?: string;
  link?: string;
  image_url?: string;
  pubDate?: string;
  source_name?: string;
};

type NewsItem = {
  id: string;
  title: string;
  snippet: string;
  link: string;
  image: string | null;
  publishedAt: string | null;
  source: string | null;
};

function toSnippet(text: string, maxLength = 200) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}...`;
}

// ── Handler ──────────────────────────────────────────────────────────────────
export async function GET(request: Request) {
  if (!API_KEY) {
    return NextResponse.json(
      {
        status: "error",
        message: "Missing NEWS_API key in environment variables.",
      },
      { status: 500 }
    );
  }

  // 1. Serve from in-memory cache if still fresh
  const now = Date.now();
  if (cache && now - cache.fetchedAt < CACHE_TTL_MS) {
    return NextResponse.json(cache.payload, {
      status: 200,
      headers: {
        "X-Cache": "HIT",
        "X-Cache-Age": String(Math.floor((now - cache.fetchedAt) / 1000)),
        "Cache-Control": `public, s-maxage=${revalidate}, stale-while-revalidate=60`,
      },
    });
  }

  // 2. Cache miss — call newsdata.io
  try {
    const incomingUrl = new URL(request.url);
    const language = incomingUrl.searchParams.get("language")?.trim() || "en";
    const page = incomingUrl.searchParams.get("page")?.trim();

    const upstreamParams = new URLSearchParams({
      apikey: API_KEY,
      q: TECH_QUERY,
      category: "technology",
      language,
      size: "10",
      removeduplicate: "1",
    });

    if (page) upstreamParams.set("page", page);

    const upstreamUrl = `${NEWSDATA_BASE_URL}?${upstreamParams.toString()}`;
    const response = await fetch(upstreamUrl, {
      method: "GET",
      headers: { Accept: "application/json" },
      // Let Next.js ISR handle CDN-level caching; no "no-store" here
      next: { revalidate },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          status: "error",
          message: data?.results?.message || data?.message || "Unable to fetch news.",
        },
        { status: response.status }
      );
    }

    const articles = Array.isArray(data?.results)
      ? (data.results as NewsDataArticle[])
      : [];

    const news: NewsItem[] = articles.map((item) => ({
      id: item.article_id ?? "",
      title: item.title ?? "Untitled",
      snippet: toSnippet((item.description || "").replace(/\s+/g, " ").trim() || "No summary available."),
      link: item.link ?? "",
      image: item.image_url ?? null,
      publishedAt: item.pubDate ?? null,
      source: item.source_name ?? null,
    }));

    const payload: CachedPayload = {
      status: "success",
      count: news.length,
      nextPage: data?.nextPage ?? null,
      news,
    };

    // 3. Store in-memory cache
    cache = { payload, fetchedAt: Date.now() };

    return NextResponse.json(payload, {
      status: 200,
      headers: {
        "X-Cache": "MISS",
        "X-Cache-Age": "0",
        "Cache-Control": `public, s-maxage=${revalidate}, stale-while-revalidate=60`,
      },
    });
  } catch {
    return NextResponse.json(
      { status: "error", message: "Failed to fetch news from NewsData." },
      { status: 502 }
    );
  }
}