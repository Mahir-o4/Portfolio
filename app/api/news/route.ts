import { NextResponse } from "next/server";

const NEWSDATA_BASE_URL = "https://newsdata.io/api/1/latest";
const API_KEY = process.env.NEWS_API ;
const TECH_QUERY = "(technology OR tech OR AI OR software OR cybersecurity OR startup OR gadgets OR cloud)";

type NewsDataArticle = {
	article_id?: string;
	title?: string;
	description?: string;
	link?: string;
	image_url?: string;
	pubDate?: string;
	source_name?: string;
};

function toSnippet(text: string, maxLength = 2000) {
	if (text.length <= maxLength) {
		return text;
	}

	return `${text.slice(0, maxLength).trimEnd()}...`;
}

export async function GET(request: Request) {
	if (!API_KEY) {
		return NextResponse.json(
			{
				status: "error",
				message:
					"Missing NewsData API key. Set NEWSDATA_API_KEY in your environment.",
			},
			{ status: 500 }
		);
	}

	try {
		const incomingUrl = new URL(request.url);
		const language = incomingUrl.searchParams.get("language")?.trim() || "en";
		const page = incomingUrl.searchParams.get("page")?.trim();
		const size = 10;

		const upstreamParams = new URLSearchParams({
			apikey: API_KEY,
			q: TECH_QUERY,
			category: "technology",
			language,
			size: String(size),
			removeduplicate: "1",
		});

		if (page) {
			upstreamParams.set("page", page);
		}

		const upstreamUrl = `${NEWSDATA_BASE_URL}?${upstreamParams.toString()}`;
		const response = await fetch(upstreamUrl, {
			method: "GET",
			headers: {
				Accept: "application/json",
			},
			cache: "no-store",
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

		const news = articles.map((item) => {
			const rawSnippet = (item.description || "").replace(/\s+/g, " ").trim();

			return {
				id: item.article_id ?? "",
				title: item.title ?? "Untitled",
				snippet: toSnippet(rawSnippet || "No summary available."),
				link: item.link ?? "",
				image: item.image_url ?? null,
				publishedAt: item.pubDate ?? null,
				source: item.source_name ?? null,
			};
		});

		return NextResponse.json(
			{
				status: "success",
				count: news.length,
				nextPage: data?.nextPage ?? null,
				news,
			},
			{ status: 200 }
		);
	} catch {
		return NextResponse.json(
			{
				status: "error",
				message: "Failed to fetch news from NewsData.",
			},
			{ status: 502 }
		);
	}
}