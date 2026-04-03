"use server";

import { openai } from "@/lib/openai";

export async function askAI(userMessage: string, noteContent: string) {
  try {
    const systemPrompt = `You are a helpful note-taking assistant. You have access to the user's current note content to provide context-aware responses.

Current note content:
${noteContent || "(No note content yet)"}

Instructions:
- Answer the user's question based on their note content when relevant
- Be concise but helpful
- Format your response in HTML (use <p>, <ul>, <li>, <strong>, <code>, etc.)
- If the user asks about their notes, reference specific content from the note
- If asked to summarize, provide a clear HTML-formatted summary`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const reply = response.choices[0]?.message?.content;

    if (!reply) {
      return "<p>Sorry, I couldn't generate a response. Please try again.</p>";
    }

    return reply;
  } catch (error) {
    console.error("AI request failed:", error);
    return "<p>Sorry, there was an error processing your request. Please try again later.</p>";
  }
}
