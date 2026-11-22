const API_URL = process.env.API_URL_INTERNAL || "http://localhost:8000";

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/`, { cache: "no-store" });
    const data = await res.json();
    return Response.json({ ok: true, backend: data });
  } catch (e) {
    return Response.json(
      { ok: false, error: "FastAPI недоступен" },
      { status: 502 }
    );
  }
}
