import clsx from "clsx";

export default function Button({
  children,
  buttonName = "",
  disabled,
  active = true,
  onClick,
  className,
  type,
  skew,
}: {
  children?: React.ReactNode;
  buttonName: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  skew?: string;
}) {
  if (disabled) active = false;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "border px-4 py-2 rounded",
        active
          ? "bg-amber-700 hover:bg-amber-600"
          : "bg-gray-700 hover:bg-gray-600",
        className
      )}
    >
      <span className={`inline-block ${skew}`}>{buttonName}</span>
      {children}
    </button>
  );
}
