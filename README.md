# Bellingham

Bellingham life planning dashboard.

## AI

Bellingham supports two AI providers.

### Puter.js

Load Puter.js in the browser:

<script src="https://js.puter.com/v2/"></script>

Then:

import { askAI } from "./src/ai/index.js";

const answer = await askAI("Help me plan my week.", {
  provider: "puter"
});

Puter handles the AI request without requiring a Gemini API key in the frontend.

### Google Gemini

Google Gemini runs through the secure /api/ai Vercel endpoint.

Set this Vercel environment variable:

GEMINI_API_KEY=your_google_ai_studio_key

Optional:

GEMINI_MODEL=gemini-3.8-flash

Then:

import { askAI } from "./src/ai/index.js";

const answer = await askAI("Analyze my weekly priorities.", {
  provider: "google"
});

console.log(answer.text);

The Google API key is server-side only and is not committed to GitHub.

## Install

npm install

## Development

npm run dev
