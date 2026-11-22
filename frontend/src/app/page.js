import Link from "next/link";

const API_URL = process.env.API_URL_INTERNAL || "http://localhost:8000";

async function getPrograms() {
  try {
    const res = await fetch(`${API_URL}/api/programs?limit=3`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

const stats = [
  { value: "10+", label: "лет работы" },
  { value: "12 000", label: "благополучателей" },
  { value: "48", label: "программ" },
  { value: "97%", label: "средств идёт напрямую" },
];

const trust = [
  {
    icon: "📊",
    title: "Открытые отчёты",
    text: "Публикуем финансовые и программные отчёты каждый квартал.",
  },
  {
    icon: "🔍",
    title: "Независимая оценка",
    text: "Каждая программа проходит внешнюю экспертизу.",
  },
  {
    icon: "🤝",
    title: "Партнёры",
    text: "Работаем с проверенными НКО и государственными учреждениями.",
  },
];

const news = [
  {
    slug: "winter-campaign",
    date: "12 ноября 2026",
    title: "Зимняя кампания: собрали 80% за первый месяц",
    excerpt:
      "Благодаря 1 200 донорам мы почти закрыли сбор на зимнюю помощь семьям.",
  },
  {
    slug: "new-partnership",
    date: "3 ноября 2026",
    title: "Новое партнёрство с сетью клиник",
    excerpt:
      "Теперь подопечные фонда смогут проходить обследования бесплатно в 14 городах.",
  },
  {
    slug: "annual-report",
    date: "28 октября 2026",
    title: "Годовой отчёт за 2025 год",
    excerpt:
      "Как мы потратили средства, чего достигли и какие планы на следующий год.",
  },
];

function formatMoney(value) {
  return new Intl.NumberFormat("ru-RU").format(value) + " ₽";
}

export default async function HomePage() {
  const programs = await getPrograms();

  return (
    <main className="bg-white text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-50/80 to-white" />
        <div className="mx-auto max-w-5xl px-6 pt-20 pb-16 text-center">
          <p className="mb-4 inline-block rounded-full bg-emerald-100 px-4 py-1 text-sm font-medium text-emerald-800">
            Помогаем с 2015 года
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Помощь, которой{" "}
            <span className="text-emerald-600">можно доверять</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            Мы создаём системные программы поддержки в образовании, медицине и
            социальной сфере. Каждый рубль — под отчётом.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/donate"
              className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
            >
              Поддержать фонд
            </Link>
            <Link
              href="/programs"
              className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Наши программы
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-slate-100 bg-slate-50/60">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 py-12 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-bold text-emerald-700">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-slate-600">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Programs (из FastAPI) */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Активные программы
            </h2>
            <p className="mt-2 text-slate-600">
              Выберите направление, которое вам близко.
            </p>
          </div>
          <Link
            href="/programs"
            className="text-sm font-semibold text-emerald-700 hover:text-emerald-800"
          >
            Все программы →
          </Link>
        </div>

        {programs.length === 0 ? (
          <p className="mt-10 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
            Программы скоро появятся. Загляните позже.
          </p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((p) => {
              const percent = p.goal
                ? Math.min(Math.round((p.raised / p.goal) * 100), 100)
                : 0;
              return (
                <article
                  key={p.slug}
                  className="flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-slate-600">
                    {p.description}
                  </p>
                  <div className="mt-5">
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold">
                        {formatMoney(p.raised)}
                      </span>
                      <span className="text-slate-500">
                        из {formatMoney(p.goal)}
                      </span>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-emerald-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                      {percent}% собрано
                    </div>
                  </div>
                  <Link
                    href={`/programs/${p.slug}`}
                    className="mt-5 rounded-xl border border-slate-200 px-4 py-2 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Подробнее
                  </Link>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Trust */}
      <section className="bg-slate-50/60 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight">
            Почему нам доверяют
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {trust.map((t) => (
              <div
                key={t.title}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
              >
                <div className="text-2xl">{t.icon}</div>
                <h3 className="mt-3 font-semibold">{t.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-3xl font-bold tracking-tight">Новости фонда</h2>
          <Link
            href="/news"
            className="text-sm font-semibold text-emerald-700 hover:text-emerald-800"
          >
            Все новости →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {news.map((n) => (
            <article
              key={n.slug}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="text-xs font-medium text-slate-500">{n.date}</div>
              <h3 className="mt-2 font-semibold">{n.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{n.excerpt}</p>
              <Link
                href={`/news/${n.slug}`}
                className="mt-4 inline-block text-sm font-semibold text-emerald-700 hover:text-emerald-800"
              >
                Читать →
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="rounded-3xl bg-emerald-600 px-8 py-14 text-center text-white shadow-xl shadow-emerald-600/20">
          <h2 className="text-3xl font-bold tracking-tight">
            Одна помощь — одна история
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-emerald-50">
            Поддержите фонд донатом или станьте волонтёром. Мы расскажем, как
            это работает и куда идут средства.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/donate"
              className="rounded-xl bg-white px-6 py-3 font-semibold text-emerald-700 transition hover:bg-emerald-50"
            >
              Сделать донат
            </Link>
            <Link
              href="/volunteer"
              className="rounded-xl border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Стать волонтёром
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}