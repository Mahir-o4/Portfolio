import { NextResponse } from "next/server";

const NEWSDATA_BASE_URL = "https://newsdata.io/api/1/latest";
const API_KEY = process.env.NEWS_API;
const TECH_QUERY =
  "(technology OR tech OR AI OR software OR cybersecurity OR startup OR gadgets OR cloud)";

const CACHE_TTL_MS = 8 * 60 * 1000;

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

const caches = new Map<string, CacheEntry>();

const NEWS_IP_WINDOW_MS = 60 * 1000;
const NEWS_IP_MAX_HITS = 30;
const ipLog = new Map<string, number[]>();

function isIpRateLimited(ip: string): boolean {
  const now = Date.now();
  const entries = ipLog.get(ip) ?? [];
  const fresh = entries.filter((t) => now - t < NEWS_IP_WINDOW_MS);
  if (fresh.length >= NEWS_IP_MAX_HITS) {
    ipLog.set(ip, fresh);
    return true;
  }
  fresh.push(now);
  ipLog.set(ip, fresh);
  return false;
}

const LANGUAGE_RE = /^[a-z]{2}(-[A-Z]{2})?$/;
const PAGE_TOKEN_RE = /^[\w-]{1,128}$/;

export const revalidate = 480;
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

  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  if (isIpRateLimited(ip)) {
    return NextResponse.json(
      { status: "error", message: "Too many requests — try again later." },
      { status: 429 }
    );
  }

  const incomingUrl = new URL(request.url);
  const rawLanguage = incomingUrl.searchParams.get("language")?.trim() || "en";
  const language = LANGUAGE_RE.test(rawLanguage) ? rawLanguage : "en";
  const rawPage = incomingUrl.searchParams.get("page")?.trim() || "";
  const page = PAGE_TOKEN_RE.test(rawPage) ? rawPage : "";

  const cacheKey = `${language}:${page}`;
  const cache = caches.get(cacheKey) ?? null;

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

  try {
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

    caches.set(cacheKey, { payload, fetchedAt: Date.now() });

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