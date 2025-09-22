export default function Button({
  children,
  buttonName = "",
  onClick,
}: {
  children?: React.ReactNode;
  buttonName: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-2/3 border bg-amber-700 rounded-md px-4 py-2"
    >
      {buttonName}
      {children}
    </button>
  );
}
