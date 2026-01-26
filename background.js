// Unused - API calls now made directly from popup.js
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

