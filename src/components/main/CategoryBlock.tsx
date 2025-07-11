import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import type { PathnameType } from "../../types/pathname";
import clsx from "clsx";

export default function CategoryBlock({
  filter,
  pathname,
}: {
  filter: string | null;
  pathname: PathnameType;
}) {
  const navigate = useNavigate();
  const [currentCategory, setCurrentCategory] = useState<string | null>(
    filter || ""
  );

  useEffect(() => {
    navigate({
      to: pathname,
      search: (prev) => ({
        ...prev,
        filter: currentCategory || "",
      }),
      replace: true,
    });
  }, [currentCategory, navigate, pathname]);

  const categories = [
    { value: "", label: "Все" },
    { value: "ebooks", label: "Электронные книги" },
    { value: "free-ebooks", label: "Бесплатные книги" },
    { value: "full", label: "Полные версии" },
    { value: "paid-ebooks", label: "Платные книги" },
    { value: "partial", label: "Фрагменты" },
  ];

  const handleChangeCategory = (newValue: string) => {
    setCurrentCategory(newValue);
  };

  return (
    <div className="flex items-center gap-4 w-full">
      <p className="text-lg shrink-0">Категории: </p>
      <div className="flex overflow-x-auto whitespace-nowrap text-sm text-white bg-gray-dark rounded-3xl overflow-hidden w-full max-w-fit">
        {categories.map((category) => (
          <CategoryItem
            key={category.value}
            pathname={pathname}
            currentCategory={currentCategory}
            category={category}
            setCategory={handleChangeCategory}
          />
        ))}
      </div>
    </div>
  );
}

function CategoryItem({
  currentCategory,
  category,
  setCategory,
}: {
  pathname: PathnameType;
  currentCategory: string | null;
  category: { value: string; label: string };
  setCategory: (value: string) => void;
}) {
  return (
    <div
      onClick={() => setCategory(category.value)}
      className={clsx(
        "cursor-pointer p-1 px-3 flex border-white border-s-1 boder-s-2 hover:bg-gray-light transition-colors duration-200",
        {
          "bg-gray-light text-white": category.value == currentCategory,
        }
      )}
    >
      <p>{category.label}</p>
    </div>
  );
}
