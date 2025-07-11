export default function Input({
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
  name
}: {
  type?: string;
  placeholder?: string;
  value: string | null;
  onChange?: (value: string) => void;
  className?: string;
  name?: string;
}) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value || ""}
      onChange={(evt) => onChange && onChange(evt.target.value)}
      className={`border border-gray-light rounded-md p-2 ${className}`}
    />
  );
}
