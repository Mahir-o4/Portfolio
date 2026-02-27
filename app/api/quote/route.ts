import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://zenquotes.io/api/today", {
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      throw new Error(`API responded with status ${res.status}`);
    }

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0 || !data[0].q || !data[0].a) {
      throw new Error("Invalid response format from quote API");
    }

    return NextResponse.json({
      quote: data[0].q,
      author: data[0].a,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch quote" },
      { status: 500 },
    );
  }
}
