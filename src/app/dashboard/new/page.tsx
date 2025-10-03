"use client";

import InputWithButton from "@/ui/common/InputWithButton";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function NewChat() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  async function handleStartChat() {
    try {
      const response = await fetch("/api/chat/create-new-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      const result = await response.json();
      console.log(result.data);
    } catch (e) {
      console.error("Error Creating New Chat", e);
    }
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setMessage(e.target.value);
  }

  return (
    <div className="flex flex-col min-h-full min-w-full text-center">
      <div className="flex-1 overflow-y-auto border border-amber-600">
        Message history new
      </div>
      <InputWithButton
        buttonName={"SEND"}
        handleClick={handleStartChat}
        handleChange={handleInputChange}
      />
    </div>
  );
}
