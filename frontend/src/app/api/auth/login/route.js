import { cookies } from "next/headers";

export async function POST(request) {
  const body = await request.json();
  const API_URL = process.env.API_URL_INTERNAL || "http://localhost:8000";
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    return Response.json({ error: "Неверный email или пароль" }, { status: 401 });
  }

  const data = await res.json();

  // Устанавливаем HttpOnly cookie
  (await cookies()).set("auth-token", data.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 дней
  });

  return Response.json({ ok: true });
}
