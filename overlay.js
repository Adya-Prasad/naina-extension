// overlay.js
(() => {
  // Toggle if already present
  const existing = document.getElementById("naina-assistant-ui");
  if (existing) {
    existing.style.display = existing.style.display === "none" ? "block" : "none";
    return;
  }

  // Template for the overlay (no external fetch)
  const template = `
            <div id="naina-assistant-ui" role="dialog" aria-label="Smart AI Assistant">
      <div id="ui-header"><span>Naina Assistant</span><button id="ui-close" title="Close">✖</button></div>
      <div class="search-box">
        <input id="user-input" type="text" placeholder="⌕ Give your command sir..." />
        <button id="ai-search" title="Send">go &nbsp; <svg fill="currentColor" width="18px" height="18px" viewBox="0 0 24 24"><g transform="rotate(45 12 10)"><path d="M8.71,7.71,11,5.41V15a1,1,0,0,0,2,0V5.41l2.29,2.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42l-4-4a1,1,0,0,0-.33-.21,1,1,0,0,0-.76,0,1,1,0,0,0-.33.21l-4,4A1,1,0,1,0,8.71,7.71Z"/></g><path d="M21,12a1,1,0,0,0-1,1v6a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V13a1,1,0,0,0-2,0v6a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V13A1,1,0,0,0,21,12Z"/></svg></button>
      </div>
      <div id="naina-output">Ready at your services with chrome built-in ai</div>
    </div>
  `;

  const wrapper = document.createElement("div");
  wrapper.innerHTML = template.trim();
  const el = wrapper.firstElementChild;
  // Append overlay to body
  document.body.appendChild(el);

  // Ensure top-most stacking
  el.style.zIndex = "2147483647";

  // Init interactions
  (function initAIOverlay() {
    const ai = el;
    const header = ai.querySelector("#ui-header");
    const closeBtn = ai.querySelector("#ui-close");
    const input = ai.querySelector("#user-input");
    const searchBtn = ai.querySelector("#ai-search");
    const output = ai.querySelector("#naina-output");

    // Dragging
    let isDragging = false, offsetX = 0, offsetY = 0;
    header.addEventListener("mousedown", (e) => {
      isDragging = true;
      offsetX = e.clientX - ai.getBoundingClientRect().left;
      offsetY = e.clientY - ai.getBoundingClientRect().top;
      ai.style.transition = "none";
      e.preventDefault();
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      ai.style.left = `${e.clientX - offsetX}px`;
      ai.style.top = `${e.clientY - offsetY}px`;
      ai.style.right = "auto";
      ai.style.bottom = "auto";
      ai.style.position = "fixed";
    });

    document.addEventListener("mouseup", () => {
      if (isDragging) isDragging = false;
      ai.style.transition = "all 0.15s ease";
    });

    // Close
    closeBtn.addEventListener("click", () => ai.remove());

    // Search (placeholder)
    searchBtn.addEventListener("click", () => {
      const q = input.value.trim();
      if (!q) {
        output.textContent = "Please type something...";
        return;
      }
      output.textContent = "Thinking...";
      // Later: replace this stub with actual Gemini Nano call
      setTimeout(() => {
        output.textContent = `Result for "${q}" (placeholder).`;
      }, 600);
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") searchBtn.click();
    });
  })();
})();
