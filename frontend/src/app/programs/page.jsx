import Link from "next/link";

export const metadata = {
  title: "Программы — Название фонда",
  description:
    "Программы фонда: образование, медицина, социальная поддержка. Узнайте, как мы помогаем, и выберите направление для поддержки.",
};

const programs = [
  {
    slug: "education",
    title: "Образование",
    tag: "Дети и подростки",
    description:
      "Стипендии, репетиторы и доступ к современным учебным материалам для детей из семей в трудной ситуации.",
    raised: 840000,
    goal: 1200000,
    color: "emerald",
  },
  {
    slug: "health",
    title: "Доступная медицина",
    tag: "Здоровье",
    description:
      "Оплата обследований, лекарств и реабилитации для людей, которым отказала система.",
    raised: 1560000,
    goal: 2000000,
    color: "teal",
  },
  {
    slug: "shelter",
    title: "Временное жильё",
    tag: "Социальная поддержка",
    description:
      "Квартиры и центры временного проживания для семей, оказавшихся без дома.",
    raised: 420000,
    goal: 900000,
    color: "sky",
  },
  {
    slug: "mentorship",
    title: "Наставничество",
    tag: "Развитие",
    description:
      "Подбор наставников для подростков: помощь с профессией, учебой и первыми шагами в карьере.",
    raised: 310000,
    goal: 600000,
    color: "violet",
  },
  {
    slug: "food",
    title: "Продовольственная помощь",
    tag: "Базовая поддержка",
    description:
      "Наборы продуктов и горячие обеды для людей, которые не могут себя обеспечить.",
    raised: 670000,
    goal: 800000,
    color: "amber",
  },
  {
    slug: "legal",
    title: "Юридическая помощь",
    tag: "Права",
    description:
      "Бесплатные консультации юристов по вопросам жилья, труда и социальных выплат.",
    raised: 190000,
    goal: 400000,
    color: "rose",
  },
];

const colorMap = {
  emerald: {
    badge: "bg-emerald-50 text-emerald-700",
    bar: "bg-emerald-500",
    button: "bg-emerald-600 hover:bg-emerald-700",
  },
  teal: {
    badge: "bg-teal-50 text-teal-700",
    bar: "bg-teal-500",
    button: "bg-teal-600 hover:bg-teal-700",
  },
  sky: {
    badge: "bg-sky-50 text-sky-700",
    bar: "bg-sky-500",
    button: "bg-sky-600 hover:bg-sky-700",
  },
  violet: {
    badge: "bg-violet-50 text-violet-700",
    bar: "bg-violet-500",
    button: "bg-violet-600 hover:bg-violet-700",
  },
  amber: {
    badge: "bg-amber-50 text-amber-700",
    bar: "bg-amber-500",
    button: "bg-amber-600 hover:bg-amber-700",
  },
  rose: {
    badge: "bg-rose-50 text-rose-700",
    bar: "bg-rose-500",
    button: "bg-rose-600 hover:bg-rose-700",
  },
};

function formatMoney(value) {
  return new Intl.NumberFormat("ru-RU").format(value) + " ₽";
}

function ProgressBar({ raised, goal, color }) {
  const percent = Math.min(Math.round((raised / goal) * 100), 100);
  const c = colorMap[color] || colorMap.emerald;

  return (
    <div>
      <div className="flex justify-between text-sm text-slate-600">
        <span className="font-semibold text-slate-900">
          {formatMoney(raised)}
        </span>
        <span>из {formatMoney(goal)}</span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${c.bar}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="mt-1 text-xs text-slate-500">{percent}% собрано</div>
    </div>
  );
}

export default function ProgramsPage() {
  return (
    <main className="bg-white text-slate-900">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-20 pb-12 text-center">
        <p className="mb-4 inline-block rounded-full bg-emerald-50 px-4 py-1 text-sm font-medium text-emerald-700">
          Программы
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Направления, <span className="text-emerald-600">которые меняют жизнь</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
          Каждая программа проходит независимую оценку. Выберите направление,
          которое вам близко, и поддержите его — или помогите фонду в целом.
        </p>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((p) => {
            const c = colorMap[p.color] || colorMap.emerald;
            return (
              <article
                key={p.slug}
                className="flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <span
                  className={`inline-block w-fit rounded-full px-3 py-1 text-xs font-medium ${c.badge}`}
                >
                  {p.tag}
                </span>
                <h2 className="mt-4 text-xl font-semibold">{p.title}</h2>
                <p className="mt-2 flex-1 text-sm text-slate-600">
                  {p.description}
                </p>
                <div className="mt-6">
                  <ProgressBar
                    raised={p.raised}
                    goal={p.goal}
                    color={p.color}
                  />
                </div>
                <div className="mt-6 flex gap-3">
                  <Link
                    href={`/programs/${p.slug}`}
                    className="flex-1 rounded-xl border border-slate-200 px-4 py-2 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Подробнее
                  </Link>
                  <Link
                    href={`/donate?program=${p.slug}`}
                    className={`flex-1 rounded-xl px-4 py-2 text-center text-sm font-semibold text-white transition ${c.button}`}
                  >
                    Поддержать
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="rounded-3xl bg-slate-900 px-8 py-14 text-center text-white">
          <h2 className="text-3xl font-bold tracking-tight">
            Не знаете, что выбрать?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-300">
            Поддержите фонд в целом — мы распределим средства туда, где помощь
            нужна больше всего.
          </p>
          <Link
            href="/donate"
            className="mt-8 inline-block rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600"
          >
            Поддержать фонд
          </Link>
        </div>
      </section>
    </main>
  );
}