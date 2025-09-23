export default function Button({
  children,
  buttonName = "",
  disabled,
  onClick,
  className,
}: {
  children?: React.ReactNode;
  buttonName: string;
  disabled?: boolean;
  onClick?: () => void;
  className: string;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`border rounded-md px-4 py-2 ${
        disabled ? "bg-gray-700" : "bg-amber-700"
      } ${className || ""}`}
    >
      {buttonName}
      {children}
    </button>
  );
}
