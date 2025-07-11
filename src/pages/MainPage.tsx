import { useEffect, useRef, useState } from "react";
import BooksService from "../services/books.service";
import { Link, useLocation, useSearch } from "@tanstack/react-router";
import type { GoogleBookItem } from "../types/Response";
import BookCard, { BookCardSkeleton } from "../components/BookCard";
import Search from "../components/main/Search";
import type { PathnameType } from "../types/pathname";
import ErrorToast from "../components/toasts/ErrorToast";
import InfoToast from "../components/toasts/InfoToast";
import { ShieldAlert } from "lucide-react";
import CategoryBlock from "../components/main/CategoryBlock";
import Button from "../components/ui/button";

export default function MainPage() {
  const location = useLocation();
  const q = useSearch({
    from: "/",
    select: (search) => search.q || null,
  });
  const filter = useSearch({
    from: "/",
    select: (search) => search.filter || null,
  });

  const [books, setBooks] = useState<GoogleBookItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setError(false);
    setLoading(true);
    setStartIndex(0);
    setHasMore(true);
    setBooks([]);
  }, [q, filter]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);

        const books = await BooksService.getListBooks(
          startIndex,
          12,
          q,
          filter
        );

        if (!books || books.length == 0) {
          setLoading(false);
          setHasMore(false);
          InfoToast("Ничего не найдено по вашему запросу");
          return;
        }

        if (books.length < 12) {
          setHasMore(false);
        }        

        if (startIndex == 0) {
          setBooks(books);
        } else {
          setBooks((prevBooks) => [...prevBooks, ...books]);
        }

        setLoading(false);
      } catch {
        ErrorToast("Не удалось загрузить книги. Попробуйте позже");
        setLoading(false);
        setError(true);
        setHasMore(false);
      }

      return () => {
        setLoading(false);
      };
    };

    fetchBooks();
  }, [startIndex, q, filter]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStartIndex((prev) => prev + 12);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
  }, [loading, startIndex]);

  return (
    <>      
      <div className="w-full flex flex-col gap-4 py-2 px-4">
        <Search pathname={location.pathname as PathnameType} search={q} />
        <div className="w-full flex flex-wrap gap-4 justify-between items-center">
          <CategoryBlock
            pathname={location.pathname as PathnameType}
            filter={filter}
          />
          <Link to="/">
            <Button variant="outline">Сбросить фильтры</Button>
          </Link>
        </div>
      </div>
      {error && (
        <div className="flex-1 flex flex-col gap-4 flex-shrink p-6 justify-center items-center">
          <ShieldAlert size={70} />
          <div className="text-red text-lg">Ошибка при загрузке книг.</div>
          <p className="text-gray-500">Пожалуйста, попробуйте позже.</p>
          <Link to="/">
            <Button>
              Вернуться на главную
            </Button>
          </Link>
        </div>
      )}
      <div className="flex flex-wrap items-stretch mt-4">
        {books.map((book: GoogleBookItem) => (
          <BookCard key={book.id} book={book} />
        ))}
        {loading &&
          hasMore &&
          Array.from({ length: 12 }).map((_, index) => (
            <BookCardSkeleton key={index} />
          ))}
      </div>
      {!loading && hasMore && (
        <div
          ref={loaderRef}
          className="w-full flex justify-center items-center py-4"
        />
      )}
    </>
  );
}
