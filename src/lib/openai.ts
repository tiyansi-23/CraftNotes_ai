import OpenAI from "openai";

let openaiClient: OpenAI | null = null;

export function getOpenAIClient(): OpenAI {
  if (openaiClient) {
    return openaiClient;
  }

  const apiKey = process.env.OPENAI_API_KEY || process.env.NVIDIA_API_KEY;
  const baseURL = process.env.OPENAI_BASE_URL || "https://integrate.api.nvidia.com/v1";

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY or NVIDIA_API_KEY environment variable is not set");
  }

  openaiClient = new OpenAI({ apiKey, baseURL });
  return openaiClient;
}
