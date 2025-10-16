// background.js

// Toggle overlay function
async function toggleOverlay(tab) {
  try {
    const url = tab?.url || "";
    
    // Only inject on http(s) and file pages to prevent chrome:// URL errors
    if (!/^https?:\/\/|^file:\/\//i.test(url)) {
      console.warn("Refusing to inject into this page (not http/https or file):", url);
      return;
    }

    // Check if overlay already exists
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id, allFrames: true },
      func: () => !!document.getElementById("naina-assistant-ui")
    });

    if (results.some(frameResult => frameResult.result)) {
      // Toggle existing overlay in all frames where it exists
      await chrome.scripting.executeScript({
        target: { tabId: tab.id, allFrames: true },
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
      target: { tabId: tab.id, allFrames: true },
      files: ["overlay.css"]
    });

    // Inject overlay JS
    await chrome.scripting.executeScript({
      target: { tabId: tab.id, allFrames: true },
      files: ["markdown_renderer.js", "overlay.js"]
    });

  } catch (err) {
    console.error("Overlay toggle failed:", err);
  }
}

// Listener for keyboard shortcut
chrome.commands.onCommand.addListener(async (command, tab) => {
  if (command === "toggle-naina") {
    await toggleOverlay(tab);
  }
});

// Listener for browser action
chrome.action.onClicked.addListener(async (tab) => {
  await toggleOverlay(tab);
});

// Listener 
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "openCollectionPage") {
    const collectionUrl = chrome.runtime.getURL("collection.html");
    chrome.tabs.create({ url: collectionUrl });
  }
});


// Listener for context menu
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "toggle-naina-context",
    title: "Naina Assistant",
    contexts: ["page", "frame"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "toggle-naina-context") {
    if (tab && tab.id) {
      await toggleOverlay(tab);
    }
  }
});