"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { href: "/", label: "Главная" },
  { href: "/about", label: "О фонде" },
  { href: "/programs", label: "Программы" },
  { href: "/news", label: "Новости" },
  { href: "/reports", label: "Отчёты" },
  { href: "/volunteer", label: "Волонтёрам" },
];

export default function Header({ isAuthenticated = false }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setOpen(false);
    router.push("/");
    router.refresh(); // перерисовываем серверные компоненты (шапка обновится)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        {/* Логотип */}
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-sm font-bold text-white">
            Ф
          </span>
          <span className="text-lg font-semibold tracking-tight">
            Название фонда
          </span>
        </Link>

        {/* Десктопное меню */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive(item.href)
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Действия справа */}
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <Link
                href="/dashboard"
                className="hidden rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 sm:inline-block"
              >
                Личный кабинет
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="hidden rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 sm:inline-block"
              >
                Выйти
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="hidden rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 sm:inline-block"
            >
              Войти
            </Link>
          )}

          <Link
            href="/donate"
            className="hidden rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 sm:inline-block"
          >
            Поддержать
          </Link>

          {/* Бургер */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 md:hidden"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      {open && (
        <nav className="border-t border-slate-100 bg-white md:hidden">
          <div className="mx-auto flex max-w-5xl flex-col px-6 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-3 text-sm font-medium transition ${
                  isActive(item.href)
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </Link>
            ))}

            <div className="my-3 border-t border-slate-100" />

            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Личный кабинет
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-lg px-3 py-3 text-left text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Выйти
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Войти
              </Link>
            )}

            <Link
              href="/donate"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-xl bg-emerald-600 px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Поддержать
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}