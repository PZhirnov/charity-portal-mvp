import Link from "next/link";
import { notFound } from "next/navigation";

const API_URL = process.env.API_URL_INTERNAL || "http://localhost:8000";

async function getNewsItem(slug) {
  const res = await fetch(`${API_URL}/api/news/${slug}`, {
    cache: "no-store",
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Не удалось загрузить новость");
  return res.json();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = await getNewsItem(slug);
  if (!item) return { title: "Новость не найдена" };
  return {
    title: `${item.title} — Название фонда`,
    description: item.excerpt,
  };
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function NewsItemPage({ params }) {
  const { slug } = await params;
  const item = await getNewsItem(slug);

  if (!item) notFound();

  return (
    <main className="bg-white text-slate-900">
      <article className="mx-auto max-w-3xl px-6 pt-20 pb-16">
        <Link
          href="/news"
          className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
        >
          ← Все новости
        </Link>
        <div className="mt-6 text-sm font-medium text-slate-500">
          {formatDate(item.date)}
        </div>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          {item.title}
        </h1>
        <p className="mt-4 text-lg text-slate-600">{item.excerpt}</p>
        <div className="prose prose-slate mt-8 max-w-none">
          {item.content
            ? item.content.split("\n").map((p, i) => <p key={i}>{p}</p>)
            : null}
        </div>
      </article>
    </main>
  );
}
