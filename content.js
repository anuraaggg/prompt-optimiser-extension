let lastSelectedText = "";

document.addEventListener("mouseup", () => {
  const selection = window.getSelection().toString().trim();
  if (selection) {
    lastSelectedText = selection;
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "GET_SELECTION") {
    sendResponse({ selectedText: lastSelectedText });
  }
});
