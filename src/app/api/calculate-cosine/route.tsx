import { getEmbedding } from "@/lib/openai-helpers";
import { NextResponse, NextRequest } from "next/server";
import { cosineSimilarityFromVectors } from "@/app/api/calculate-cosine/helpers";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const leftSide = data.get("textLeft");
    const rightSide = data.get("textRight");
    if (typeof leftSide !== "string" || typeof rightSide !== "string") {
      throw new Error("textLeft or textRight is missing or not a string");
    }
    const [embeddingA, embeddingB] = await Promise.all([
      getEmbedding(leftSide),
      getEmbedding(rightSide),
    ]);
    const similarity = cosineSimilarityFromVectors(embeddingA, embeddingB);
    return NextResponse.json(
      {
        success: true,
        data: similarity,
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Server Error: Cosine Similarity. Try Again";
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
