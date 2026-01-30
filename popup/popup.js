const optimiseBtn = document.getElementById("optimise");
const output = document.getElementById("output");
const copyBtn = document.getElementById("copy");

optimiseBtn.addEventListener("click", async () => {
  const inputPrompt = document.getElementById("input").value.trim();

  if (!inputPrompt) {
    output.value = "Please enter a prompt to optimize.";
    return;
  }

  const goal = document.getElementById("goal").value;
  const tone = document.getElementById("tone").value;
  const audience = document.getElementById("audience").value;

  output.value = "Optimising...";
  optimiseBtn.disabled = true;

  const combinedPrompt = `
Original Prompt:
${inputPrompt}

Goal: ${goal || "Not specified"}
Tone: ${tone || "Neutral"}
Target Audience: ${audience || "General"}

Rewrite the original prompt accordingly.
  `.trim();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);

  try {
    const res = await fetch(
      "https://prompt-optimiser-api.onrender.com/optimise",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ optimiserPrompt: combinedPrompt }),
        signal: controller.signal
      }
    );

    clearTimeout(timeout);

    const data = await res.json();

    if (!res.ok) {
      console.error("API error:", data);
      output.value = "Failed to optimise prompt.";
      return;
    }

    output.value = data.optimisedPrompt;
  } catch (err) {
    clearTimeout(timeout);
    console.error("Request error:", err);
    
    if (err.name === "AbortError") {
      output.value = "Request timed out (30s). Please try again.";
    } else {
      output.value = "Backend not reachable.";
    }
  } finally {
    optimiseBtn.disabled = false;
  }
});

copyBtn.addEventListener("click", async () => {
  const text = output.value;

  if (!text || text.includes("Optimising") || text.includes("Failed") || text.includes("Backend") || text.includes("timed out") || text.includes("Please enter")) return;

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
