// background.js

// Toggle overlay function
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
      func: () => !!document.getElementById("naina-assistant-ui")
    });

    if (results[0]?.result) {
      // Toggle existing overlay
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          const overlay = document.getElementById("naina-assistant-ui");
          if (overlay) {
            overlay.style.display = overlay.style.display === "none" ? "block" : "none";
          }
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

// Listener for browser action
chrome.action.onClicked.addListener(async (tab) => {
  await toggleOverlay(tab);
});

// Listener for keyboard shortcut
chrome.commands.onCommand.addListener(async (command) => {
  if (command === "toggle-naina") {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab && tab.id) {
      await toggleOverlay(tab);
    }
  }
});

// Listener for context menu
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "toggle-naina-context",
    title: "Naina Assistant",
    contexts: ["page"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "toggle-naina-context") {
    if (tab && tab.id) {
      await toggleOverlay(tab);
    }
  }
});