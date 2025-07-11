import { Link, useLocation } from "@tanstack/react-router";
import clsx from "clsx";
import { Book, BookHeart, House } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full flex justify-center fixed top-0 left-0 z-50">
        <div className="flex gap-2 text-white bg-gray-dark rounded-b-2xl px-4 py-2">
            <div className="flex items-center gap-2 mr-3">
              <Book />
              <p className="text-lg text-white">Book</p>
            </div>
            <HeaderItem icon={<House size={20} />} text="Главная" link="/" />
            <HeaderItem icon={<BookHeart size={20} />} text="Избранное" link="/favorites" />
        </div>
    </header>
  );
}

function HeaderItem({
  text,
  link,
  icon
}: {
  text: string;
  link: string;
  icon: React.ReactNode;
}) {
  const location = useLocation();
  
  return (
    <Link
      to={link}
      className={clsx("flex gap-1 p-2 border-1 border-gray-light rounded-xl hover:bg-gray-light hover:text-white transition-colors duration-200",
        {
          "bg-gray-light text-white": location.pathname === link,
        }
      )}
    >
      {icon}
      <p className="text-sm">{text}</p>
    </Link>
  );

}