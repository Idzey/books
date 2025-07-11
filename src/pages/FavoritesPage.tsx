import { Link, useLocation, useSearch } from "@tanstack/react-router";
import Search from "../components/main/Search";
import type { PathnameType } from "../types/pathname";
import type { GoogleBookItem } from "../types/Response";
import { useState } from "react";
import BookCard from "../components/BookCard";
import LocalStoreManager from "../utils/localStoreManager";
import Button from "../components/ui/button";
import { Info } from "lucide-react";

export default function FavoritesPage() {
  const location = useLocation();
  const q = useSearch({
    from: "/favorites/",
    select: (search) => search.q || null,
  });

  const [books, setBooks] = useState<GoogleBookItem[]>(
    LocalStoreManager.get("favorites") || []
  );

  const filtredBooks = books.filter((book: GoogleBookItem) => {
    if (!q) return true;
    return book.volumeInfo.title.toLowerCase().includes(q.toLowerCase());
  });

  const handleFavoriteChange = () => {
    setBooks(LocalStoreManager.get("favorites") || []);
  };

  return (
    <>
      <h1 className="text-2xl ms-4 mb-4">Ваши избранные книги:</h1>
      <div className="w-full flex flex-col gap-4 py-2 px-4">
        <Search pathname={location.pathname as PathnameType} search={q} />
        <Link to="/favorites">
          <Button variant="outline">Сбросить фильтры</Button>
        </Link>
      </div>
      <div className="flex flex-wrap items-stretch mt-4">
        {filtredBooks.length > 0 ? (
          filtredBooks.map((book: GoogleBookItem) => (
            <BookCard
              key={book.id}
              book={book}
              onChangeFavorite={handleFavoriteChange}
            />
          ))
        ) : (
          <div className="flex-1 flex flex-col gap-4 justify-center items-center text-gray-500">
            <Info size={70} />
            <p className="text-lg">Нет избранных книг</p>
            <Link to="/">
              <Button>Вернуться на главную</Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
