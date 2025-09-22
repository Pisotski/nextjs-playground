import Button from "@/ui/common/Button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen border border-red-400">
      <Link href="dashboard">
        <Button>Enter</Button>
      </Link>
    </div>
  );
}
