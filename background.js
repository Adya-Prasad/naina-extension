// background.js
chrome.action.onClicked.addListener(async (tab) => {
  try {
    const url = tab?.url || "";
    // Only inject on http(s) pages. This prevents "Cannot access a chrome:// URL" errors.
    if (!/^https?:\/\//i.test(url)) {
      console.warn("Refusing to inject into this page (not http/https):", url);
      return;
    }

    // Insert CSS first (so styles apply as soon as markup is added)
    await chrome.scripting.insertCSS({
      target: { tabId: tab.id },
      files: ["overlay.css"]
    });

    // Inject overlay JS that creates the DOM and behavior.
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["overlay.js"]
    });
  } catch (err) {
    console.error("Injection failed:", err);
  }
});
