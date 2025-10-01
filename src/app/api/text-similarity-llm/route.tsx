import { textSimilarityInstruction as instruction } from "@/app/api/text-similarity-llm/helpers";
import { client } from "@/lib/openai-helpers";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const leftSide = data.get("textLeft");
    const rightSide = data.get("textRight");
    const citations = ` Gold Citation: "${leftSide}". Generated Answer: "${rightSide}"`;
    const response = await client.responses.create({
      model: "gpt-5",
      input: instruction + citations,
    });

    console.log(response.output_text);
    const answerObject = JSON.parse(response.output_text);
    return NextResponse.json(
      {
        success: true,
        data: answerObject.score,
        reasoning: answerObject.reasoning,
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Server Error: Jaccard Similarity. Try Again";
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
