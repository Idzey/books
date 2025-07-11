import { Heart } from "lucide-react";
import type { GoogleBookItem } from "../types/Response";
import Button from "./ui/button";
import LocalStoreManager from "../utils/localStoreManager";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import InfoToast from "./toasts/InfoToast";

function BookCard({
  book,
  onChangeFavorite,
}: {
  book: GoogleBookItem;
  onChangeFavorite?: () => void;
}) {
  return (
    <>
      <Link
        to="/book/$bookId"
        params={{ bookId: book.id }}
        className="relative items-stretch border-1 border-gray-light py-3 overflow-hidden flex flex-col basis-full md:basis-1/3 lg:basis-1/4 flex-shrink-0 cursor-pointer"
      >
        <div className="absolute top-3 right-3 z-10 px-4">
          <FavoriteButton book={book} onChangeFavorite={onChangeFavorite} />
        </div>
        <img
          className="w-full h-70 object-contain"
          src={book.volumeInfo.imageLinks?.thumbnail || "/placeholder.jpg"}
          alt={book.volumeInfo.title}
        />
        <div className="py-2 px-4 flex flex-col h-full">
          <div className="flex flex-col flex-grow">
            <h3 className="text-xl font-bold line-clamp-2 underline underline-offset-4">
              {book.volumeInfo.title}
            </h3>
            <div className="flex flex-wrap gap-1 mt-2 mb-4">
              {book.volumeInfo.authors?.slice(0, 2).map((author, index) => (
                <AuthorItem key={index} author={author} />
              )) || (
                <AuthorItem author="Без автора" />
              )}
            </div>
          </div>
          <p className="text-md text-gray-dark line-clamp-3 text-justify mt-auto">
            {book.volumeInfo.description || "Без описания."}
          </p>
        </div>
      </Link>
    </>
  );
}

export function AuthorItem({ author }: { author: string }) {
  return (
    <div className="flex w-fit p-1 px-2 items-center bg-blue-light rounded-xl">
      <p className="flex text-xs text-white">{author}</p>
    </div>
  );
}

export function FavoriteButton({
  book,
  onChangeFavorite,
}: {
  book: GoogleBookItem;
  onChangeFavorite?: () => void;
}) {
  const [isFavorite, setIsFavorite] = useState(() => {
    const favorites = LocalStoreManager.get("favorites") || [];
    return favorites.some((item: GoogleBookItem) => item.id == book.id);
  });

  const handleRemoveFavorite = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.stopPropagation();
    evt.preventDefault();
    
    const favorites = LocalStoreManager.get("favorites") || [];
    const updated = favorites.filter(
      (item: GoogleBookItem) => item.id !== book.id
    );
    LocalStoreManager.set("favorites", updated);

    if (onChangeFavorite) {
      onChangeFavorite();
    }

    InfoToast("Книга удалена из избранного");
    setIsFavorite(false);
  };

  const handleAddFavorite = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.stopPropagation();
    evt.preventDefault();

    const favorites = LocalStoreManager.get("favorites") || [];
    if (!favorites.some((item: GoogleBookItem) => item.id == book.id)) {
      LocalStoreManager.set("favorites", [...favorites, book]);
      setIsFavorite(true);
    }

    if (onChangeFavorite) {
      onChangeFavorite();
    }
    
    InfoToast("Книга добавлена в избранное");
  };

  if (isFavorite) {
    return (
      <Button size="icon" onClick={handleRemoveFavorite}>
        <Heart fill="blue" strokeWidth={0} />
      </Button>
    );
  }

  return (
    <Button size="icon" onClick={handleAddFavorite}>
      <Heart />
    </Button>
  );
}

export function BookCardSkeleton() {
  return (
    <div className="items-stretch border-1 border-gray-light py-3 flex flex-col basis-full md:basis-1/3 lg:basis-1/4 cursor-pointer">
      <div className="px-4">
        <div className="w-full h-70 bg-gray-200 animate-pulse" />
      </div>
      <div className="py-2 px-4 flex flex-col flex-grow h-full">
        <div className="flex-grow">
          <div className="space-y-2">
            <div className="h-6 bg-gray-200 animate-pulse rounded w-1/2" />
          </div>

          <div className="flex flex-wrap gap-1 mt-2 mb-4">
            <div className="h-6 bg-gray-200 animate-pulse rounded-xl w-20" />
          </div>
        </div>
        <div className="space-y-2 mt-auto">
          <div className="h-4 bg-gray-200 animate-pulse rounded w-full" />
          <div className="h-4 bg-gray-200 animate-pulse rounded w-4/5" />
          <div className="h-4 bg-gray-200 animate-pulse rounded w-2/3" />
        </div>
      </div>
    </div>
  );
}

export default BookCard;
