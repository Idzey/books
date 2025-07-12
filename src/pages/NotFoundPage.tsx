import { Link } from "@tanstack/react-router";
import Button from "../components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-lg text-gray-dark mb-6">
        Страница не найдена
      </p>
      <Link to="/">
        <Button>На главную</Button>
      </Link>
    </div>
  );
}
