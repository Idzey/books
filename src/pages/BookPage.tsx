import { Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { GoogleBookItem } from "../types/Response";
import BooksService from "../services/books.service";
import { AuthorItem, FavoriteButton } from "../components/BookCard";
import Button from "../components/ui/button";
import { ToastContainer } from "react-toastify";
import ErrorToast from "../components/toasts/ErrorToast";
import { ShieldAlert } from "lucide-react";

export default function BookPage() {
  const { bookId } = useParams({
    from: "/book/$bookId",
  });

  const [book, setBook] = useState<GoogleBookItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const book: GoogleBookItem = await BooksService.getBookById(bookId);
        setBook(book);
        setLoading(false);
      } catch {
        setLoading(false);
        setError(true);
        ErrorToast("Ошибка при загрузке книги. Пожалуйста, попробуйте позже.");
      }
    };

    if (bookId) {
      fetchBook();
    }
  }, [bookId]);

  if (error) {
    return (
      <div className="flex-1 flex flex-col gap-4 flex-shrink p-6 justify-center items-center">
        <ShieldAlert size={70} />
        <div className="text-red text-lg">Ошибка при загрузке книги.</div>
        <Link to="/">
          <Button>Вернуться на главную</Button>
        </Link>
        <ToastContainer />
      </div>
    );
  }

  if (!book || loading) {
    return <BookSkeleton />;
  }

  return (
    <>
      <div className="flex-1 flex flex-col md:flex-row flex-shrink p-6 justify-center items-center">
        <div className="flex-shrink-0 w-60 mb-6 md:mb-0 md:w-80">
          <img
            className="w-full h-auto object-contain rounded-lg shadow-lg"
            src={book.volumeInfo.imageLinks?.thumbnail || "/placeholder.png"}
            alt={book.volumeInfo.title}
          />
        </div>
        <div className="w-full mt-6 md:mt-0 flex flex-col gap-2 relative p-2 md:p-6 pt-0">
          <div className="absolute -top-10 right-3 z-10 px-4">
            <FavoriteButton book={book} />
          </div>
          <h1 className="text-2xl font-bold mb-4">{book.volumeInfo.title}</h1>
          <div className="flex flex-wrap gap-4 items-center">
            <p className="text-lg font-bold text-gray-700">Авторство:</p>
            {book.volumeInfo.authors?.map((author, index) => (
              <AuthorItem key={index} author={author} />
            )) || (
              <AuthorItem author="Без автора" />
            )}
          </div>
          <p>
            <span className="text-lg font-bold">Кол-во страниц:</span>{" "}
            {book.volumeInfo.pageCount || "Неизвестно"}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="text-lg font-bold">Опубликовано:</span>{" "}
            {book.volumeInfo.publishedDate || "Неизвестно"}
          </p>
          <p className="text-gray-700 mb-4 text-justify">
            {book.volumeInfo.description || "Без описания."}
          </p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

function BookSkeleton() {
  return (
    <div className="flex-1 flex flex-col md:flex-row flex-shrink p-6 justify-center items-center">
      <div className="flex-shrink-0 w-60 mb-6 md:mb-0 md:w-80">
        <div className="w-full h-96 bg-gray-200 animate-pulse rounded-lg shadow-lg" />
      </div>
      <div className="w-full p-6 pt-0">
        <div className="h-8 bg-gray-200 animate-pulse rounded mb-4 w-3/4" />
        <div className="flex gap-4 items-center mb-4">
          <div className="h-6 bg-gray-200 animate-pulse rounded w-24" />
          <div className="h-6 bg-gray-200 animate-pulse rounded-xl w-20" />
        </div>
        <div className="h-4 bg-gray-200 animate-pulse rounded mb-2 w-1/2" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 animate-pulse rounded w-full" />
          <div className="h-4 bg-gray-200 animate-pulse rounded w-5/6" />
          <div className="h-4 bg-gray-200 animate-pulse rounded w-4/5" />
          <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
        </div>
      </div>
    </div>
  );
}
