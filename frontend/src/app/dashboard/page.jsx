import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getMe(token) {
  
  const API_URL = process.env.API_URL_INTERNAL || "http://localhost:8000";
  const res = await fetch(`${API_URL}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function DashboardPage() {
  const token = (await cookies()).get("auth-token")?.value;

  if (!token) {
    redirect("/login");
  }

  const user = await getMe(token);
  if (!user) {
    redirect("/login");
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="text-3xl font-bold">Личный кабинет</h1>
      <p className="mt-2 text-slate-600">Вы вошли как {user.email}</p>
      {/* Здесь ваш контент дашборда */}
    </main>
  );
}