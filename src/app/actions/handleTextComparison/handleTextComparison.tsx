"use server";

import {
  cosineSimilarityFromVectors,
  getEmbedding,
  jaccardSimilarity,
  textSimilarityInstruction,
} from "@/app/actions/handleTextComparison/helpers";
import { client } from "@/lib/openai";

type Method = "jaccard" | "cosine" | "llm";

export async function handleTextComparison(formData: FormData, method: Method) {
  const textLeft = formData.get("textLeft")?.toString() || "";
  const textRight = formData.get("textRight")?.toString() || "";
  if (!textLeft || !textRight) {
    return { success: false, error: "Both fields are required" };
  }

  if (method === "jaccard") {
    const result = jaccardSimilarity(textLeft, textRight);
    return { success: true, data: result };
  }

  if (method === "cosine") {
    const [embeddingA, embeddingB] = await Promise.all([
      getEmbedding(textLeft),
      getEmbedding(textRight),
    ]);
    const result = cosineSimilarityFromVectors(embeddingA, embeddingB);

    return { success: true, data: result };
  }

  if (method === "llm") {
    const llmResponse = await client.responses.create({
      model: "gpt-5-mini",
      input:
        textSimilarityInstruction + ` Gold: "${textLeft}". AI: "${textRight}"`,
    });
    const answerObject = JSON.parse(llmResponse.output_text);
    return {
      success: true,
      data: answerObject.score,
      reasoning: answerObject.reasoning,
    };
  }

  return { success: false, error: "Unknown method" };
}
