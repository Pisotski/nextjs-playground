import { jaccardSimilarity } from "@/app/api/jaccard-similarity/helpers";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const leftSide = data.get("textLeft");
    const rightSide = data.get("textRight");
    if (typeof leftSide !== "string" || typeof rightSide !== "string") {
      throw new Error("leftSide or rightSide is missing or not a string");
    }
    const result = jaccardSimilarity(leftSide, rightSide);
    return NextResponse.json(
      {
        success: true,
        data: result,
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
