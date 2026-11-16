import { GoogleGenAI } from "@google/genai";

const MODEL = process.env.GEMINI_MODEL || "gemini-3.8-flash";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({
      error: "GEMINI_API_KEY is not configured on the server."
    });
  }

  try {
    const body = req.body || {};
    const input = body.input ?? body.prompt;

    if (!input || typeof input !== "string") {
      return res.status(400).json({ error: "A prompt or input string is required." });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const interaction = await ai.interactions.create({
      model: MODEL,
      input,
      ...(body.previousInteractionId
        ? { previous_interaction_id: body.previousInteractionId }
        : {})
    });

    return res.status(200).json({
      provider: "google",
      model: MODEL,
      interactionId: interaction.id,
      text: interaction.output_text ?? ""
    });
  } catch (error) {
    console.error("Gemini request failed:", error);

    return res.status(500).json({
      error: "Gemini request failed.",
      details: error instanceof Error ? error.message : String(error)
    });
  }
}
