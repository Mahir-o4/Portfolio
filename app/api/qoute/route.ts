import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://zenquotes.io/api/today", {
      next: { revalidate: 86400 },
    });

    const data = await res.json();
    console.log("Data:",data)

    return NextResponse.json({
      quote: data[0].q,
      author: data[0].a,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch quote" },
      { status: 500 }
    );
  }
}