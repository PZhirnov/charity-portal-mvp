import Link from "next/link";

export const metadata = {
  title: "О фонде — Название фонда",
  description:
    "Мы помогаем людям с 2015 года: программы, отчёты и команда, которой можно доверять.",
};

const stats = [
  { value: "10+", label: "лет работы" },
  { value: "12 000", label: "благополучателей" },
  { value: "48", label: "программ" },
  { value: "97%", label: "средств идёт напрямую" },
];

const values = [
  {
    icon: "🤝",
    title: "Прозрачность",
    text: "Публикуем отчёты и документы. Каждый рубль можно отследить.",
  },
  {
    icon: "❤️",
    title: "Человек в центре",
    text: "Мы не «помогаем нуждающимся» — мы работаем вместе с людьми.",
  },
  {
    icon: "🌱",
    title: "Устойчивость",
    text: "Строим системные решения, а не разовые акции.",
  },
  {
    icon: "🛡️",
    title: "Ответственность",
    text: "Проверяем каждую программу и отчитываемся перед донорами.",
  },
];

const team = [
  { name: "Анна Иванова", role: "Директор фонда", initials: "АИ" },
  { name: "Пётр Смирнов", role: "Руководитель программ", initials: "ПС" },
  { name: "Мария Козлова", role: "Финансовый директор", initials: "МК" },
  { name: "Игорь Волков", role: "Координатор волонтёров", initials: "ИВ" },
];

export default function AboutPage() {
  return (
    <main className="bg-white text-slate-900">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-20 pb-16 text-center">
        <p className="mb-4 inline-block rounded-full bg-emerald-50 px-4 py-1 text-sm font-medium text-emerald-700">
          О фонде
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Помогаем системно, <span className="text-emerald-600">а не разово</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
          Мы — команда, которая с 2015 года создаёт программы поддержки в
          образовании, здравоохранении и социальной сфере. Работаем открыто и
          отчитываемся за каждый шаг.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/donate"
            className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
          >
            Поддержать фонд
          </Link>
          <Link
            href="/reports"
            className="rounded-xl border border-slate-200 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Смотреть отчёты
          </Link>
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

      {/* Mission */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Наша миссия</h2>
            <p className="mt-4 text-slate-600">
              Мы верим, что помощь должна быть системной и уважительной. Вместо
              разовых акций мы строим программы, которые меняют жизнь людей
              надолго: поддерживаем образование, доступ к медицине и
              профессиональное развитие.
            </p>
            <p className="mt-4 text-slate-600">
              Каждая программа проходит независимую оценку, а результаты мы
              публикуем в открытых отчётах. Доверие доноров — наш главный
              капитал.
            </p>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 p-8">
            <blockquote className="text-lg font-medium text-slate-800">
              «Помощь — это не жалость. Это уважение и совместная работа.»
            </blockquote>
            <div className="mt-4 text-sm text-slate-600">
              — Анна Иванова, директор фонда
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-slate-50/60 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight">
            Наши ценности
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="text-2xl">{v.icon}</div>
                <h3 className="mt-3 font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-center text-3xl font-bold tracking-tight">
          Команда
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-slate-600">
          Небольшая команда, которая отвечает за программы, финансы и работу с
          волонтёрами.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <div
              key={m.name}
              className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-lg font-bold text-emerald-700">
                {m.initials}
              </div>
              <div className="mt-4 font-semibold">{m.name}</div>
              <div className="text-sm text-slate-500">{m.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="rounded-3xl bg-emerald-600 px-8 py-14 text-center text-white shadow-xl shadow-emerald-600/20">
          <h2 className="text-3xl font-bold tracking-tight">
            Хотите помочь?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-emerald-50">
            Поддержите фонд донатом или станьте волонтёром — мы расскажем, как
            это работает.
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