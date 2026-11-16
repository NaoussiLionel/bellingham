export async function chatWithPuter(prompt, options = {}) {
  if (!prompt || typeof prompt !== "string") {
    throw new Error("A prompt is required.");
  }

  if (typeof window === "undefined" || !window.puter) {
    throw new Error(
      "Puter.js is not loaded. Add https://js.puter.com/v2/ to the browser app."
    );
  }

  return window.puter.ai.chat(prompt, {
    model: options.model || "gpt-6-luna",
    serviceSpeed: options.serviceSpeed || "standard",
    ...options
  });
}
