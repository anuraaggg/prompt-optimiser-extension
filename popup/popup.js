const optimiseBtn = document.getElementById("optimise");
const output = document.getElementById("output");
const copyBtn = document.getElementById("copy");

optimiseBtn.addEventListener("click", async () => {
  const goal = document.getElementById("goal").value;
  const tone = document.getElementById("tone").value;
  const audience = document.getElementById("audience").value;

  output.value = "Optimising...";

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.tabs.sendMessage(
    tab.id,
    { type: "GET_SELECTION" },
    async (response) => {
      if (chrome.runtime.lastError) {
        output.value = "This page does not support text selection.";
        return;
      }

      if (!response || !response.selectedText) {
        output.value = "No text selected.";
        return;
      }

      const combinedPrompt = `
Original Prompt:
${response.selectedText}

Goal: ${goal || "Not specified"}
Tone: ${tone || "Neutral"}
Target Audience: ${audience || "General"}

Rewrite the original prompt accordingly.
      `.trim();

      try {
        const res = await fetch(
          "https://prompt-optimiser-api.onrender.com/optimise",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ optimiserPrompt: combinedPrompt })
          }
        );

        const data = await res.json();

        if (!res.ok) {
          console.error("API error:", data);
          output.value = "Failed to optimise prompt.";
          return;
        }

        output.value = data.optimisedPrompt;
      } catch (err) {
        console.error("Connection error:", err);
        output.value = "Backend not reachable.";
      }
    }
  );
});

copyBtn.addEventListener("click", async () => {
  const text = output.value;

  if (!text || text.includes("Optimised prompt")) return;

  try {
    await navigator.clipboard.writeText(text);
    copyBtn.textContent = "Copied!";

    setTimeout(() => {
      copyBtn.textContent = "Copy";
    }, 1500);
  } catch (err) {
    console.error("Clipboard error:", err);
    copyBtn.textContent = "Failed";
  }
});
