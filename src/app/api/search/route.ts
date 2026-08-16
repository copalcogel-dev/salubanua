import { NextResponse } from "next/server";
import { getArticles } from "@/lib/content";
import { getDestinations } from "@/lib/destinations";
import { getCategories } from "@/lib/categories";
import type { SearchResult } from "@/lib/searchTypes";

function matches(query: string, ...fields: (string | null | undefined)[]) {
  const q = query.toLowerCase();
  return fields.some((f) => f?.toLowerCase().includes(q));
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get("q") ?? "").trim();
  const lang = searchParams.get("lang") === "en" ? "en" : "id";

  if (query.length < 2) return NextResponse.json({ results: [] });

  const results: SearchResult[] = [];

  const destinations = await getDestinations();
  for (const d of destinations) {
    if (matches(query, d[lang].title, d[lang].subtitle, d[lang].desc, d.category)) {
      results.push({
        type: "destination",
        title: d[lang].title,
        description: d[lang].desc,
        href: "/destinations",
      });
    }
  }

  const categories = await getCategories();
  for (const c of categories) {
    if (matches(query, c[lang].title, c[lang].desc, c.key)) {
      results.push({
        type: "category",
        title: c[lang].title,
        description: c[lang].desc,
        href: "/destinations",
      });
    }
  }

  const articles = await getArticles();
  for (const a of articles) {
    if (matches(query, a[lang].title, a[lang].excerpt, a.category, a.author)) {
      results.push({
        type: "story",
        title: a[lang].title,
        description: a[lang].excerpt,
        href: `/stories/${a.slug}`,
      });
    }
  }

  return NextResponse.json({ results: results.slice(0, 20) });
}
