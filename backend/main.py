from fastapi import FastAPI, HTTPException, Depends, Query
from pydantic import BaseModel
from auth import create_access_token, verify_password, get_current_user, TokenData

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class LoginRequest(BaseModel):
    email: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

# В реальном приложении пользователи берутся из БД
FAKE_USERS_DB = {
    "user@example.com": {
        "id": "1",
        "email": "user@example.com",
        "hashed_password": "$2b$12$KIXQx8Z0fJ9l3mN5oP7qReYvT2wU4sA6bC8dE0fG2hI4jK6lM8nO"  # хэш пароля "password123"
    }
}

@app.post("/api/auth/login", response_model=TokenResponse)
async def login(req: LoginRequest):
    user = FAKE_USERS_DB.get(req.email)

    # вернуть при корректном
    # if not user or not verify_password(req.password, user["hashed_password"]):
    #     raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_access_token(user_id=user["id"], email=user["email"])
    return {"access_token": token}

@app.get("/api/auth/me")
async def me(current_user: TokenData = Depends(get_current_user)):
    return {"id": current_user.user_id, "email": current_user.email}

# страница новости
class NewsOut(BaseModel):
    slug: str
    title: str
    excerpt: str
    date: str          # ISO-строка, например "2026-11-12"
    content: str | None = None  # полный текст — только в детальном эндпоинте

NEWS = [
    {
        "slug": "winter-campaign",
        "title": "Зимняя кампания: собрали 80% за первый месяц",
        "excerpt": "Благодаря 1 200 донорам мы почти закрыли сбор на зимнюю помощь семьям.",
        "date": "2026-11-12",
        "content": "Полный текст новости о зимней кампании...",
    },
    {
        "slug": "new-partnership",
        "title": "Новое партнёрство с сетью клиник",
        "excerpt": "Теперь подопечные фонда смогут проходить обследования бесплатно в 14 городах.",
        "date": "2026-11-03",
        "content": "Полный текст новости о партнёрстве...",
    },
    {
        "slug": "annual-report",
        "title": "Годовой отчёт за 2025 год",
        "excerpt": "Как мы потратили средства, чего достигли и какие планы на следующий год.",
        "date": "2026-10-28",
        "content": "Полный текст новости об отчёте...",
    },
    {
        "slug": "volunteer-day",
        "title": "День волонтёра: как это было",
        "excerpt": "Более 200 человек приняли участие в осеннем дне волонтёра.",
        "date": "2026-10-15",
        "content": "Полный текст новости о дне волонтёра...",
    },
    {
        "slug": "new-office",
        "title": "Открыли новый офис в Казани",
        "excerpt": "Теперь фонд принимает подопечных и в столице Татарстана.",
        "date": "2026-10-01",
        "content": "Полный текст новости об офисе...",
    },
]

@app.get("/api/news", response_model=list[NewsOut])
async def list_news(
    page: int = Query(1, ge=1),
    limit: int = Query(3, ge=1, le=50),
):
    start = (page - 1) * limit
    return NEWS[start : start + limit]

@app.get("/api/news/{slug}", response_model=NewsOut)
async def get_news(slug: str):
    for item in NEWS:
        if item["slug"] == slug:
            return item
    raise HTTPException(status_code=404, detail="Новость не найдена")


### Отчеты
class MonthlyReport(BaseModel):
    month: str          # "Янв", "Фев", ...
    donations: int      # поступления, ₽
    expenses: int       # расходы, ₽

class CategoryReport(BaseModel):
    category: str
    amount: int

class ReportsSummary(BaseModel):
    total_raised: int
    total_spent: int
    donors_count: int
    programs_count: int
    monthly: list[MonthlyReport]
    expenses_by_category: list[CategoryReport]
    yearly: list[dict]  # { year: 2024, raised: ..., spent: ... }

@app.get("/api/reports/summary", response_model=ReportsSummary)
async def reports_summary():
    return {
        "total_raised": 12450000,
        "total_spent": 11780000,
        "donors_count": 3420,
        "programs_count": 48,
        "monthly": [
            {"month": "Янв", "donations": 620000, "expenses": 580000},
            {"month": "Фев", "donations": 740000, "expenses": 690000},
            {"month": "Мар", "donations": 910000, "expenses": 850000},
            {"month": "Апр", "donations": 830000, "expenses": 800000},
            {"month": "Май", "donations": 1050000, "expenses": 990000},
            {"month": "Июн", "donations": 980000, "expenses": 940000},
            {"month": "Июл", "donations": 1120000, "expenses": 1080000},
            {"month": "Авг", "donations": 1210000, "expenses": 1150000},
            {"month": "Сен", "donations": 1340000, "expenses": 1290000},
            {"month": "Окт", "donations": 1280000, "expenses": 1220000},
            {"month": "Ноя", "donations": 1420000, "expenses": 1380000},
            {"month": "Дек", "donations": 1490000, "expenses": 1430000},
        ],
        "expenses_by_category": [
            {"category": "Программы", "amount": 8246000},
            {"category": "Администрация", "amount": 1178000},
            {"category": "Фандрайзинг", "amount": 942400},
            {"category": "Резерв", "amount": 1178000},
        ],
        "yearly": [
            {"year": 2021, "raised": 6200000, "spent": 5900000},
            {"year": 2022, "raised": 7800000, "spent": 7400000},
            {"year": 2023, "raised": 9100000, "spent": 8600000},
            {"year": 2024, "raised": 10800000, "spent": 10200000},
            {"year": 2025, "raised": 12450000, "spent": 11780000},
        ],
    }


from datetime import datetime
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr, Field

class VolunteerApplication(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str | None = Field(None, max_length=20)
    city: str | None = Field(None, max_length=100)
    direction: str = Field(..., min_length=2, max_length=100)
    message: str | None = Field(None, max_length=2000)

# В реальном проекте — таблица в БД
VOLUNTEER_APPLICATIONS: list[dict] = []

@app.post("/api/volunteer", status_code=201)
async def create_volunteer_application(app: VolunteerApplication):
    record = {
        "id": len(VOLUNTEER_APPLICATIONS) + 1,
        "created_at": datetime.utcnow().isoformat(),
        **app.model_dump(),
    }
    VOLUNTEER_APPLICATIONS.append(record)
    return {"ok": True, "id": record["id"]}

class VolunteerApplication(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str | None = Field(None, max_length=20)
    city: str | None = Field(None, max_length=100)
    direction: str = Field(..., min_length=2, max_length=100)
    message: str | None = Field(None, max_length=2000)

# В реальном проекте — таблица в БД
VOLUNTEER_APPLICATIONS: list[dict] = []

@app.post("/api/volunteer", status_code=201)
async def create_volunteer_application(app: VolunteerApplication):
    record = {
        "id": len(VOLUNTEER_APPLICATIONS) + 1,
        "created_at": datetime.utcnow().isoformat(),
        **app.model_dump(),
    }
    VOLUNTEER_APPLICATIONS.append(record)
    return {"ok": True, "id": record["id"]}