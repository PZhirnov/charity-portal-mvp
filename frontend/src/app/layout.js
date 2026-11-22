import "./globals.css";
import { cookies } from "next/headers";
import Header from "@/components/header";

export const metadata = {
  title: "Добро",
  description: "Помогаем с 2015 года",
};

export default async function RootLayout({ children }) {
  const token = (await cookies()).get("auth-token")?.value;

  // Для простоты считаем токен валидным, если он есть.
  // Строгую проверку (запрос к FastAPI) делаем на защищённых страницах.
  const isAuthenticated = Boolean(token);

  return (
    <html lang="ru">
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        <Header isAuthenticated={isAuthenticated} />
        {children}
      </body>
    </html>
  );
}