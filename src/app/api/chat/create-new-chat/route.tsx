import { NextResponse } from "next/server";
import { ApiResponse } from "@/lib/types/ApiResponse";
import { createNewChat } from "@/lib/chat";

export async function POST(request: Request) {
  const response: ApiResponse<{ id: string }> = {
    success: false,
  };

  try {
    const { message } = await request.json();
    if (!message || typeof message !== "string")
      throw new Error("Invalid message");

    const chatId = await createNewChat(message);
    response.success = true;
    response.data = { id: chatId };
  } catch (e: any) {
    response.error = e?.message || "An error occurred";
  }

  return NextResponse.json(response, { status: response.success ? 200 : 500 });
}
