import { chatWithPuter } from "./puter.js";

export async function askAI(prompt, options = {}) {
  const provider = options.provider || "puter";

  if (provider === "puter") {
    return chatWithPuter(prompt, options);
  }

  if (provider === "google") {
    const response = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: prompt,
        previousInteractionId: options.previousInteractionId
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Google AI request failed.");
    }

    return data;
  }

  throw new Error("Unsupported AI provider: " + provider);
}
