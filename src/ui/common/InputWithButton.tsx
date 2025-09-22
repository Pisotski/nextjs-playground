import Button from "@/ui/common/Button";

type InputWithButtonPropTypes = {
  handleClick?: () => void;
  buttonName: string;
};

export default function InputWithButton({
  handleClick,
  buttonName,
}: InputWithButtonPropTypes) {
  return (
    <div className="flex items-center gap-2 border-t">
      <input type="text" className="flex-1 border rounded px-1 py-1" />
      <Button onClick={handleClick} buttonName={buttonName} />
    </div>
  );
}
