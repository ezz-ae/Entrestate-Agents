import { Index } from "@upstash/vector";
import OpenAI from "openai";

const index = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL!,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN!,
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getEmbedding(text: string) {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text.replace(/\n/g, " "),
  });
  return response.data[0].embedding;
}

export interface VectorMetadata {
  name: string;
  developer: string;
  price_from_aed: number;
  city: string;
  area: string;
  completion_year: number;
  description_chunk: string;
}

export async function hybridSearch(query: string, filters?: string) {
  const vector = await getEmbedding(query);
  
  const results = await index.query({
    vector,
    topK: 5,
    includeMetadata: true,
    filter: filters,
  });

  return results;
}
