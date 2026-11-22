import { VolunteerForm } from "@/components/volunteer-form";

export const metadata = {
    title: "Волонтёрам — Название фонда",
    description:
        "Станьте волонтёром фонда: помощь на мероприятиях, работа с подопечными, дизайн, IT и другое.",
};

const benefits = [
    {
        icon: "🤝",
        title: "Реальная помощь",
        text: "Вы видите, как ваше время меняет жизнь конкретных людей.",
    },
    {
        icon: "📚",
        title: "Обучение",
        text: "Проводим вводные встречи и учим работе с подопечными.",
    },
    {
        icon: "🕒",
        title: "Гибкий график",
        text: "От нескольких часов в месяц до полной занятости — как удобно вам.",
    },
    {
        icon: "🌍",
        title: "Сообщество",
        text: "Знакомства с людьми, которым не всё равно.",
    },
];

export default function VolunteerPage() {
    return (
        <main className="bg-white text-slate-900">
            {/* Hero */}
            <section className="mx-auto max-w-5xl px-6 pt-20 pb-12 text-center">
                <p className="mb-4 inline-block rounded-full bg-emerald-50 px-4 py-1 text-sm font-medium text-emerald-700">
                    Волонтёрам
                </p>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                    Помогать <span className="text-emerald-600">проще, чем кажется</span>
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
                    Нам нужны руки, головы и сердца. Заполните форму — мы расскажем, как
                    всё устроено, и подберём направление под ваш график.
                </p>
            </section>

            {/* Что даёт волонтёрство */}
            <section className="border-y border-slate-100 bg-slate-50/60">
                <div className="mx-auto grid max-w-5xl gap-6 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
                    {benefits.map((b) => (
                        <div
                            key={b.title}
                            className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
                        >
                            <div className="text-2xl">{b.icon}</div>
                            <h2 className="mt-3 font-semibold">{b.title}</h2>
                            <p className="mt-2 text-sm text-slate-600">{b.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Форма */}
            <section className="mx-auto max-w-5xl px-6 py-20">
                <div className="grid gap-12 lg:grid-cols-2">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">
                            Оставьте заявку
                        </h2>
                        <p className="mt-4 text-slate-600">
                            Заполните форму — координатор свяжется с вами в течение двух
                            рабочих дней. Никаких обязательств: сначала познакомимся и
                            расскажем, чем можно помочь.
                        </p>

                        <div className="mt-8 space-y-4">
                            <div className="flex gap-3">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700">
                                    1
                                </span>
                                <p className="text-sm text-slate-600">
                                    Вы оставляете заявку и указываете удобное время.
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700">
                                    2
                                </span>
                                <p className="text-sm text-slate-600">
                                    Координатор звонит и подбирает направление.
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700">
                                    3
                                </span>
                                <p className="text-sm text-slate-600">
                                    Вы проходите короткое вводное обучение и начинаете.
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 rounded-2xl border border-slate-100 bg-slate-50 p-5 text-sm text-slate-600">
                            <p className="font-semibold text-slate-900">Есть вопросы?</p>
                            <p className="mt-1">
                                Напишите на{" "}
                                <a
                                    href="mailto:volunteer@example.org"
                                    className="text-emerald-700 underline"
                                >
                                    volunteer@example.org
                                </a>
                            </p>
                        </div>
                    </div>

                    <VolunteerForm />
                </div>
            </section>
        </main>
    );
}
