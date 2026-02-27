"use client";

import { useEffect, useState } from "react";

type Quote = {
  quote: string;
  author: string;
};

export default function QuoteCard() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/quote')
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch quote");
        return res.json();
      })
      .then((data) => setQuote(data))
      .catch(() => setError("Could not load quote right now."));
  }, []);

  if (error) return <p className="text-sm text-red-300">{error}</p>;
  if (!quote) return <p className="text-sm text-slate-200">Loading...</p>;

  return (
    <div className="relative w-full max-w-sm md:max-w-xl text-slate-100">
      <div className="relative border-2 border-slate-400/80 bg-slate-950/85 px-4 py-4 md:px-5 md:py-5">
      <h1 className="font-extrabold text-lg md:text-xl text-slate-50 mb-2">Quote Of The Day:</h1>
        <span className="absolute -top-3 md:-top-4 left-3 text-3xl md:text-4xl leading-none text-slate-200/90">
          “
        </span>
        <p className="pr-4 md:pr-6 italic text-sm md:text-base tracking-normal text-slate-100 leading-relaxed">
          {quote.quote}
        </p>
      </div>

      <div className=" flex justify-end">
        <div className="relative border border-slate-400/80 bg-slate-950/85 px-3 md:px-4 py-2 text-xs md:text-sm font-semibold text-slate-300">
          <span className="absolute -top-4 md:-top-5 right-1 text-2xl md:text-3xl leading-none text-slate-200/90">
            ”
          </span>
          — {quote.author}
        </div>
      </div>
    </div>
  );
}