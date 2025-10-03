import Button from "@/ui/common/Button";

type InputWithButtonPropTypes = {
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  buttonName: string;
};

export default function InputWithButton({
  handleClick,
  buttonName,
  handleChange,
}: InputWithButtonPropTypes) {
  return (
    <div className="flex items-center gap-2 border-t">
      <input
        type="text"
        className="flex-1 border rounded px-1 py-1"
        onChange={handleChange}
      />
      <Button onClick={handleClick} buttonName={buttonName} />
    </div>
  );
}
