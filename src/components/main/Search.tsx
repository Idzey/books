import { useNavigate } from "@tanstack/react-router";
import Input from "../ui/input";
import { useState, useEffect } from "react";
import type { PathnameType } from "../../types/pathname";

export default function Search({ search, pathname }: { search: string | null, pathname: PathnameType }) {
  const navigate = useNavigate();
  const [value, setValue] = useState(search || "");
  const [debouncedValue, setDebouncedValue] = useState(search || "");

  useEffect(() => {
    setValue(search || "");
    setDebouncedValue(search || "");
  }, [search]);

  useEffect(() => {
    setValue("");
    setDebouncedValue("");
  }, [pathname])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  useEffect(() => {
    navigate({
      to: pathname,
      search: (prev) => ({
        ...prev,
        q: debouncedValue,
      }),
      replace: true,
    });
  }, [debouncedValue, navigate, pathname]);

  const onChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="w-full">
      <Input
        className="w-full"
        name="search"
        value={value}
        onChange={onChange}
        placeholder="Введите название..."
      />
    </div>
  );
}
