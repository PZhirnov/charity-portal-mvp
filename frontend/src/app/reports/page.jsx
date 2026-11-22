import { ReportsCharts } from "@/components/reports-charts";

export const metadata = {
    title: "Отчёты — Название фонда",
    description: "Финансовые отчёты фонда: поступления, расходы, распределение средств.",
};

const API_URL = process.env.API_URL_INTERNAL || "http://localhost:8000";

async function getReports() {
    try {
        const res = await fetch(`${API_URL}/api/reports/summary`, {
            cache: "no-store",
        });
        if (!res.ok) return null;
        return res.json();
    } catch {
        return null;
    }
}

function formatMoney(value) {
    return new Intl.NumberFormat("ru-RU").format(value) + " ₽";
}

export default async function ReportsPage() {
    const data = await getReports();

    return (
        <main className="bg-white text-slate-900">
            <section className="mx-auto max-w-5xl px-6 pt-20 pb-12 text-center">
                <p className="mb-4 inline-block rounded-full bg-emerald-50 px-4 py-1 text-sm font-medium text-emerald-700">
                    Отчёты
                </p>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                    Куда идут <span className="text-emerald-600">ваши средства</span>
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
                    Мы публикуем финансовые данные открыто. Ниже — сводка за последний
                    год: поступления, расходы и распределение средств.
                </p>
            </section>

            {!data ? (
                <section className="mx-auto max-w-5xl px-6 pb-24">
                    <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
                        Отчёты временно недоступны. Попробуйте позже.
                    </p>
                </section>
            ) : (
                <>
                    {/* Сводные цифры */}
                    <section className="border-y border-slate-100 bg-slate-50/60">
                        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 py-12 sm:grid-cols-4">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-emerald-700">
                                    {formatMoney(data.total_raised)}
                                </div>
                                <div className="mt-1 text-sm text-slate-600">Поступило</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-slate-900">
                                    {formatMoney(data.total_spent)}
                                </div>
                                <div className="mt-1 text-sm text-slate-600">Израсходовано</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-emerald-700">
                                    {new Intl.NumberFormat("ru-RU").format(data.donors_count)}
                                </div>
                                <div className="mt-1 text-sm text-slate-600">Доноров</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-slate-900">
                                    {data.programs_count}
                                </div>
                                <div className="mt-1 text-sm text-slate-600">Программ</div>
                            </div>
                        </div>
                    </section>

                    {/* Графики */}
                    <section className="mx-auto max-w-5xl px-6 py-16">
                        <ReportsCharts data={data} />
                    </section>

                    {/* Пояснение */}
                    <section className="mx-auto max-w-5xl px-6 pb-24">
                        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 text-sm text-slate-600">
                            <h2 className="mb-2 text-base font-semibold text-slate-900">
                                Как читать отчёты
                            </h2>
                            <p>
                                Данные обновляются ежемесячно. Суммы указаны в рублях. Под
                                «Программами» понимаются прямые расходы на помощь
                                благополучателям, под «Администрацией» — зарплаты сотрудников и
                                аренда, под «Фандрайзингом» — расходы на сбор средств. Резерв
                                формируется для покрытия сезонных колебаний поступлений.
                            </p>
                        </div>
                    </section>
                </>
            )}
        </main>
    );
}
