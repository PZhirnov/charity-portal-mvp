"use client";

// Здесь и живут графики Recharts.
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

const PIE_COLORS = ["#059669", "#0d9488", "#0284c7", "#7c3aed"];

function formatMoneyShort(value) {
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)} млн`;
    if (value >= 1_000) return `${Math.round(value / 1_000)} тыс`;
    return String(value);
}

function formatMoney(value) {
    return new Intl.NumberFormat("ru-RU").format(value) + " ₽";
}

function ChartCard({ title, subtitle, children }) {
    return (
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold">{title}</h3>
            {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
            <div className="mt-6 h-72 w-full">{children}</div>
        </div>
    );
}

export function ReportsCharts({ data }) {
    return (
        <div className="grid gap-6 lg:grid-cols-2">
            {/* Поступления и расходы по месяцам */}
            <div className="lg:col-span-2">
                <ChartCard
                    title="Поступления и расходы по месяцам"
                    subtitle="Сравнение доходов и расходов за последний год"
                >
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={data.monthly}
                            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#059669" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="spend" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                            <YAxis
                                tickFormatter={formatMoneyShort}
                                tick={{ fontSize: 12 }}
                                width={60}
                            />
                            <Tooltip formatter={(v) => formatMoney(v)} />
                            <Legend />
                            <Area
                                type="monotone"
                                dataKey="donations"
                                name="Поступления"
                                stroke="#059669"
                                strokeWidth={2}
                                fill="url(#income)"
                            />
                            <Area
                                type="monotone"
                                dataKey="expenses"
                                name="Расходы"
                                stroke="#f97316"
                                strokeWidth={2}
                                fill="url(#spend)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>

            {/* Распределение расходов */}
            <ChartCard
                title="Распределение расходов"
                subtitle="По категориям за последний год"
            >
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data.expenses_by_category}
                            dataKey="amount"
                            nameKey="category"
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={90}
                            paddingAngle={2}
                        >
                            {data.expenses_by_category.map((_, i) => (
                                <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(v) => formatMoney(v)} />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </ChartCard>

            {/* Год к году */}
            <ChartCard
                title="Динамика по годам"
                subtitle="Поступления и расходы по годам"
            >
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.yearly} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                        <YAxis
                            tickFormatter={formatMoneyShort}
                            tick={{ fontSize: 12 }}
                            width={60}
                        />
                        <Tooltip formatter={(v) => formatMoney(v)} />
                        <Legend />
                        <Bar dataKey="raised" name="Поступления" fill="#059669" radius={[6, 6, 0, 0]} />
                        <Bar dataKey="spent" name="Расходы" fill="#f97316" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </ChartCard>
        </div>
    );
}
