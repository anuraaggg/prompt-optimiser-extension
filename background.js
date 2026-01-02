chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "OPTIMISE_PROMPT") {
    const { rawPrompt, goal, tone, audience } = request.payload;

    const optimiserPrompt = buildOptimiserPrompt(
      rawPrompt,
      goal,
      tone,
      audience
    );

    callOptimiserAPI(optimiserPrompt)
      .then((optimisedPrompt) => {
        sendResponse({ optimisedPrompt });
      })
      .catch((err) => {
        console.error("Optimiser API error:", err);
        sendResponse({ optimisedPrompt: "Failed to optimise prompt." });
      });

    // IMPORTANT: keep the message channel open
    return true;
  }
});

function buildOptimiserPrompt(rawPrompt, goal, tone, audience) {
  return `
You are an expert prompt optimisation engine.

Task:
Rewrite the user's prompt to maximise clarity, specificity,
and output quality.

Rules:
- Do NOT answer the prompt
- Do NOT add factual content
- Preserve original intent
- Only add structure and constraints

Context:
Goal: ${goal || "Not specified"}
Tone: ${tone || "Neutral"}
Audience: ${audience || "General"}

Original prompt:
${rawPrompt}
`.trim();
}

async function callOptimiserAPI(optimiserPrompt) {
  const res = await fetch("https://prompt-optimiser-api.onrender.com/optimise", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ optimiserPrompt })
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "API error");
  }

  return data.optimisedPrompt;
}
