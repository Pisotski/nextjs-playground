"use client";

import InputWithButton from "@/ui/common/InputWithButton";
import { useRouter } from "next/navigation";

export default function newChat() {
  // function startChat() {
  //   console.log("chat started");
  // }

  return (
    <div className="flex flex-col min-h-full min-w-full text-center">
      <div className="flex-1 overflow-y-auto border border-amber-600">
        Message history
      </div>
      <InputWithButton buttonName={"SEND"} />
    </div>
  );
}
