export default function Button({
  children,
  className = "",
  variant = "solid",
  size = "default",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "outline" | "solid";
  size?: "default" | "icon";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const baseClasses =
    "cursor-pointer font-semibold rounded focus:outline-none focus:shadow-outline transition-colors";

  const variantClasses = {
    solid: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    outline:
      "border-2 border-gray-300 bg-transparent hover:bg-gray-100 text-gray-800",
  };

  const sizeClasses = {
    default: "py-2 px-4",
    icon: "p-2 w-10 h-10 flex items-center justify-center",
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
}
