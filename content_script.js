// content_script.js - Simple msg listener for overlay toggling
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "toggleOverlay") {
    // The overlay is now handled directly by background.js
    // This file can be kept minimal or removed if not needed
    sendResponse({ success: true });
  }
});
