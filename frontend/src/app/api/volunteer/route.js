const API_URL = process.env.API_URL_INTERNAL || "http://localhost:8000";

export async function POST(request) {
    const body = await request.json();

    const res = await fetch(`${API_URL}/api/volunteer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        // FastAPI возвращает detail — строку или массив ошибок валидации
        const detail = data.detail;
        const message =
            typeof detail === "string"
                ? detail
                : Array.isArray(detail)
                    ? detail.map((d) => d.msg).join("; ")
                    : "Ошибка отправки";
        return Response.json({ detail: message }, { status: res.status });
    }

    return Response.json(data, { status: 201 });
}