import Link from "next/link";

export const metadata = {
  title: "Новости — Название фонда",
  description: "Новости и события благотворительного фонда.",
};

const API_URL = process.env.API_URL_INTERNAL || "http://localhost:8000";
const PER_PAGE = 3;

async function getNews(page) {
  try {
    const res = await fetch(
      `${API_URL}/api/news?page=${page}&limit=${PER_PAGE}`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function NewsPage({ searchParams }) {
  const page = Math.max(1, Number(searchParams?.page) || 1);
  const news = await getNews(page);

  return (
    <main className="bg-white text-slate-900">
      <section className="mx-auto max-w-5xl px-6 pt-20 pb-12 text-center">
        <p className="mb-4 inline-block rounded-full bg-emerald-50 px-4 py-1 text-sm font-medium text-emerald-700">
          Новости
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Что происходит <span className="text-emerald-600">в фонде</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
          События, отчёты и истории людей, которым мы помогаем.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-8">
        {news.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
            Новостей пока нет. Загляните позже.
          </p>
        ) : (
          <div className="space-y-4">
            {news.map((n) => (
              <article
                key={n.slug}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-md sm:flex sm:items-start sm:gap-6"
              >
                <div className="sm:w-32 sm:shrink-0">
                  <div className="text-sm font-medium text-slate-500">
                    {formatDate(n.date)}
                  </div>
                </div>
                <div className="mt-3 sm:mt-0">
                  <h2 className="text-xl font-semibold">
                    <Link
                      href={`/news/${n.slug}`}
                      className="hover:text-emerald-700"
                    >
                      {n.title}
                    </Link>
                  </h2>
                  <p className="mt-2 text-sm text-slate-600">{n.excerpt}</p>
                  <Link
                    href={`/news/${n.slug}`}
                    className="mt-3 inline-block text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    Читать →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Пагинация */}
        <nav className="mt-10 flex items-center justify-center gap-3">
          {page > 1 ? (
            <Link
              href={`/news?page=${page - 1}`}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              ← Назад
            </Link>
          ) : (
            <span className="pointer-events-none rounded-xl border border-slate-100 bg-slate-50 px-4 py-2 text-sm text-slate-300">
              ← Назад
            </span>
          )}
          <span className="text-sm text-slate-500">Страница {page}</span>
          {news.length === PER_PAGE ? (
            <Link
              href={`/news?page=${page + 1}`}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Вперёд →
            </Link>
          ) : (
            <span className="pointer-events-none rounded-xl border border-slate-100 bg-slate-50 px-4 py-2 text-sm text-slate-300">
              Вперёд →
            </span>
          )}
        </nav>
      </section>
    </main>
  );
}
