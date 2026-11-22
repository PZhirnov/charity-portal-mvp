import Link from "next/link";

export default function NewsNotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-bold">Новость не найдена</h1>
      <p className="mt-3 text-slate-600">
        Возможно, она была удалена или ссылка неверна.
      </p>
      <Link
        href="/news"
        className="mt-8 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
      >
        Ко всем новостям
      </Link>
    </main>
  );
}
