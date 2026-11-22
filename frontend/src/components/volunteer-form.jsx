"use client";

import { useState } from "react";

const directions = [
    "Помощь на мероприятиях",
    "Работа с подопечными",
    "Переводы и документы",
    "Дизайн и контент",
    "IT и разработка",
    "Другое",
];

const initialForm = {
    name: "",
    email: "",
    phone: "",
    city: "",
    direction: directions[0],
    message: "",
};

export function VolunteerForm() {
    const [form, setForm] = useState(initialForm);
    const [status, setStatus] = useState("idle"); // idle | loading | success | error
    const [error, setError] = useState("");

    function update(field) {
        return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus("loading");
        setError("");

        try {
            const res = await fetch("/api/volunteer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.detail || "Не удалось отправить заявку");
            }

            setStatus("success");
            setForm(initialForm);
        } catch (err) {
            setStatus("error");
            setError(err.message || "Что-то пошло не так");
        }
    }

    if (status === "success") {
        return (
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-8 text-center">
                <div className="text-3xl">✅</div>
                <h3 className="mt-3 text-xl font-semibold text-emerald-900">
                    Спасибо! Заявка отправлена
                </h3>
                <p className="mt-2 text-sm text-emerald-800">
                    Мы свяжемся с вами в течение двух рабочих дней.
                </p>
                <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-6 rounded-xl bg-emerald-600 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                    Отправить ещё одну
                </button>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8"
        >
            <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                        Имя <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={form.name}
                        onChange={update("name")}
                        required
                        minLength={2}
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                        placeholder="Как к вам обращаться"
                    />
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                        Email <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        value={form.email}
                        onChange={update("email")}
                        required
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                        placeholder="you@example.com"
                    />
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                        Телефон
                    </label>
                    <input
                        type="tel"
                        value={form.phone}
                        onChange={update("phone")}
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                        placeholder="+7 ..."
                    />
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                        Город
                    </label>
                    <input
                        type="text"
                        value={form.city}
                        onChange={update("city")}
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                        placeholder="Москва"
                    />
                </div>
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                    Направление <span className="text-red-500">*</span>
                </label>
                <select
                    value={form.direction}
                    onChange={update("direction")}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                >
                    {directions.map((d) => (
                        <option key={d} value={d}>
                            {d}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                    Расскажите о себе
                </label>
                <textarea
                    value={form.message}
                    onChange={update("message")}
                    rows={4}
                    maxLength={2000}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    placeholder="Опыт, свободное время, почему хотите помогать"
                />
                <div className="mt-1 text-right text-xs text-slate-400">
                    {form.message.length}/2000
                </div>
            </div>

            {status === "error" && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                </p>
            )}

            <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {status === "loading" ? "Отправляем..." : "Отправить заявку"}
            </button>
            <p className="text-center text-xs text-slate-400">
                Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
            </p>
        </form>
    );
}
