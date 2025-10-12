// background.js
chrome.action.onClicked.addListener(async (tab) => {
  await toggleOverlay(tab);
});

chrome.commands.onCommand.addListener(async (command) => {
  if (command === "toggle-naina") {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab && tab.id) {
      await toggleOverlay(tab);
    }
  }
});

async function toggleOverlay(tab) {
  try {
    const url = tab?.url || "";
    
    // Only inject on http(s) pages to prevent chrome:// URL errors
    if (!/^https?:\/\//i.test(url)) {
      console.warn("Refusing to inject into this page (not http/https):", url);
      return;
    }

    // Check if overlay already exists
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => document.getElementById("naina-assistant-ui")
    });

    if (results[0]?.result) {
      // Show existing overlay if it's hidden, otherwise do nothing
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          const overlay = document.getElementById("naina-assistant-ui");
          if (overlay && overlay.style.display === "none") {
            overlay.style.display = "block";
          }
          // If overlay is already visible, don't hide it - keep it open
        }
      });
      return;
    }

    // Insert CSS first
    await chrome.scripting.insertCSS({
      target: { tabId: tab.id },
      files: ["overlay.css"]
    });

    // Inject overlay JS
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["overlay.js"]
    });

  } catch (err) {
    console.error("Overlay toggle failed:", err);
  }
}
