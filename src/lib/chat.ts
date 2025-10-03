import { ChatMessages } from "@/lib/models";
import { dbConnect } from "@/lib/mongodb";
import { mockUser, mockProgram } from "@/lib/mock";

export async function createNewChat(message: string): Promise<string> {
  dbConnect();
  const { _id: programId } = mockProgram;
  const { _id: userId } = mockUser;

  const response = await ChatMessages.create({
    assistantType: "langchain",
    programId,
    state: "NC",
    userId,
    chatMessages: [
      {
        role: "user",
        content: message,
      },
    ],
  });

  return response._id.toString();
}
