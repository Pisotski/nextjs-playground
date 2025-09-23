// src/lib/openai-helpers.ts
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getEmbedding(text: string) {
  const response = await client.embeddings.create({
    model: "text-embedding-3-small", // or 3-large
    input: text,
  });

  return response.data[0].embedding;
}
