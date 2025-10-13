(() => {
  'use strict';

  // Check if overlay already exists and toggle it
  const existing = document.getElementById("naina-assistant-ui");
  if (existing) {
    existing.style.display = existing.style.display === "none" ? "block" : "none";
    return;
  }

  // Create the overlay HTML
  const template = `
        <div id="naina-assistant-ui" role="dialog" aria-label="Smart AI Assistant">
      <div id="ui-header">
        <span>Naina Assistant</span>
        <button id="ui-close" title="Close">✖</button>
      </div>
      <div class="search-box">
        <input id="user-input" type="text" placeholder="⌕ Ask your query..." />
        <button id="ai-search" title="Send">
            <svg width="18px" height="18px" viewBox="0 0 20 20" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M1.68542 6.65868C0.758716 6.96758 0.779177 8.28543 1.71502 8.56541L9.20844 10.8072L11.6551 18.5165C11.948 19.4394 13.2507 19.4488 13.5569 18.5302L18.8602 2.62029C19.1208 1.83853 18.3771 1.09479 17.5953 1.35538L1.68542 6.65868ZM5.31842 7.55586L16.3304 3.8852L12.6316 14.9817L10.9548 9.69826C10.8547 9.38295 10.6052 9.13754 10.2883 9.04272L5.31842 7.55586Z" fill="currentColor"/>
                <path d="M17.7674 1.43951L18.8105 2.51742L9.98262 11.0605L8.93948 9.98265L17.7674 1.43951Z" fill="currentColor"/>
                </svg>&nbsp; Go
          </button>
      </div>
      <div id="naina-output">
        <div class="status-message">Ready to help! Ask me anything...</div>
      </div>
      <footer id="footer">
        <div id="features">
          <div id="read-out" title="read out the response">
            <svg viewBox="0 0 24 24" style="width: 20px; height: 20px;" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M10.4 1.8C11.5532 0.262376 14 1.07799 14 3.00001V21.1214C14 23.0539 11.5313 23.8627 10.3878 22.3049L6.49356 17H4C2.34315 17 1 15.6569 1 14V10C1 8.34315 2.34315 7 4 7H6.5L10.4 1.8ZM12 3L8.1 8.2C7.72229 8.70361 7.12951 9 6.5 9H4C3.44772 9 3 9.44772 3 10V14C3 14.5523 3.44772 15 4 15H6.49356C7.13031 15 7.72901 15.3032 8.10581 15.8165L12 21.1214V3Z"
                fill="currentColor"></path>
              <path d="M16.2137 4.17445C16.1094 3.56451 16.5773 3 17.1961 3C17.6635 3 18.0648 3.328 18.1464 3.78824C18.4242 5.35347 19 8.96465 19 12C19 15.0353 18.4242 18.6465 18.1464 20.2118C18.0648 20.672 17.6635 21 17.1961 21C16.5773 21 16.1094 20.4355 16.2137 19.8256C16.5074 18.1073 17 14.8074 17 12C17 9.19264 16.5074 5.8927 16.2137 4.17445Z"
                fill="currentColor"></path>
              <path d="M21.41 5C20.7346 5 20.2402 5.69397 20.3966 6.35098C20.6758 7.52413 21 9.4379 21 12C21 14.5621 20.6758 16.4759 20.3966 17.649C20.2402 18.306 20.7346 19 21.41 19C21.7716 19 22.0974 18.7944 22.2101 18.4509C22.5034 17.5569 23 15.5233 23 12C23 8.47672 22.5034 6.44306 22.2101 5.54913C22.0974 5.20556 21.7716 5 21.41 5Z"
                fill="currentColor"></path>
            </svg>
          </div>
          <div id="save-note" title="save current response as note">
            <svg viewBox="0 0 24 24" style="width:20px; height:20px;" fill="none">
              <path d="M10 12H14M12 10V14M19.9592 15H16.6C16.0399 15 15.7599 15 15.546 15.109C15.3578 15.2049 15.2049 15.3578 15.109 15.546C15 15.7599 15 16.0399 15 16.6V19.9592M20 14.1031V7.2C20 6.07989 20 5.51984 19.782 5.09202C19.5903 4.71569 19.2843 4.40973 18.908 4.21799C18.4802 4 17.9201 4 16.8 4H7.2C6.0799 4 5.51984 4 5.09202 4.21799C4.71569 4.40973 4.40973 4.71569 4.21799 5.09202C4 5.51984 4 6.0799 4 7.2V16.8C4 17.9201 4 18.4802 4.21799 18.908C4.40973 19.2843 4.71569 19.5903 5.09202 19.782C5.51984 20 6.0799 20 7.2 20H14.1031C14.5923 20 14.8369 20 15.067 19.9447C15.2711 19.8957 15.4662 19.8149 15.6451 19.7053C15.847 19.5816 16.0199 19.4086 16.3658 19.0627L19.0627 16.3658C19.4086 16.0199 19.5816 15.847 19.7053 15.6451C19.8149 15.4662 19.8957 15.2711 19.9447 15.067C20 14.8369 20 14.5923 20 14.1031Z"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              </path>
            </svg>
          </div>
          <div id="dyslexia-friendly" title="Dyslexia friendly mode">
            <svg viewBox="0 0 24 24" style="width:20px; height:20px;" fill="none">
              <path d="M22 12V21M2 21L8 3L14 21M11 14H5M19 21C17.3431 21 16 19.6569 16 18V15C16 13.3431 17.3431 12 19 12C20.6569 12 22 13.3431 22 15V18C22 19.6569 20.6569 21 19 21Z"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              </path>
            </svg>
          </div>
          <div id="translate" title="translate the text">
            <svg width="20px" height="20px" viewBox="0 0 20 20"><path d="M7.41 9l2.24 2.24-.83 2L6 10.4l-3.3 3.3-1.4-1.42L4.58 9l-.88-.88c-.53-.53-1-1.3-1.3-2.12h2.2c.15.28.33.53.51.7l.89.9.88-.88C7.48 6.1 8 4.84 8 4H0V2h5V0h2v2h5v2h-2c0 1.37-.74 3.15-1.7 4.12L7.4 9zm3.84 8L10 20H8l5-12h2l5 12h-2l-1.25-3h-5.5zm.83-2h3.84L14 10.4 12.08 15z" fill="currentColor"/></svg>
          </div>
          <div id="saved-collection" title="YOur saved collection">
           <svg viewBox="0 0 24 24" fill="none"><path d="M14 19L17 22L22 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 6V12C4 12 4 15 11 15C18 15 18 12 18 12V6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M11 3C18 3 18 6 18 6C18 6 18 9 11 9C4 9 4 6 4 6C4 6 4 3 11 3Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M11 21C4 21 4 18 4 18V12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          </div>
        </div>
      </footer>
    </div>
  `;

  // Create and append the overlay
  const wrapper = document.createElement("div");
  wrapper.innerHTML = template.trim();
  const overlay = wrapper.firstElementChild;

    // Get DOM elements
  const header = overlay.querySelector("#ui-header");
  const closeBtn = overlay.querySelector("#ui-close");
  const input = overlay.querySelector("#user-input");
  const searchBtn = overlay.querySelector("#ai-search");
  const output = overlay.querySelector("#naina-output");
  const footer = overlay.querySelector("#footer");
  const infoMessage = overlay.querySelector(".info-message");

  
  // Ensure overlay doesn't interfere with page styles and is visible
  overlay.style.all = "unset";
  overlay.style.position = "fixed";
  overlay.style.bottom = "80px";
  overlay.style.right = "40px";
  overlay.style.width = "350px";
  overlay.style.maxWidth = "70vw";
  overlay.style.height = "600px";
  overlay.style.maxHeight = "70vh";
  overlay.style.padding = "6px";
  overlay.style.borderRadius = "16px";
  overlay.style.background = "rgba(113, 115, 121, 0.5)";
  overlay.style.backdropFilter = "blur(1.5px)";
  overlay.style.webkitBackdropFilter = "blur(1.5px)";
  overlay.style.fontFamily = '"Segoe UI", Roboto, Arial, sans-serif';
  overlay.style.zIndex = "2147483647";
  overlay.style.overflow = "hidden";
  overlay.style.pointerEvents = "auto";
  overlay.style.userSelect = "none";
  overlay.style.display = "flex";
  overlay.style.flexDirection = "column";
  overlay.style.boxSizing = "border-box";
  
  document.body.appendChild(overlay);

  // Debug: Log overlay creation
  console.log("Overlay created and appended to DOM:", overlay);
  console.log("Overlay position:", overlay.style.position);
  console.log("Overlay z-index:", overlay.style.zIndex);
  console.log("Overlay display:", overlay.style.display);

  // State management
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;
  let currentSession = null;
  let pageContext = null;
  let isDyslexiaMode = false;

  // Event handler functions
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    overlay.style.left = `${e.clientX - offsetX}px`;
    overlay.style.top = `${e.clientY - offsetY}px`;
    overlay.style.position = "fixed";
  };

  const handleMouseUp = () => {
    isDragging = false;
  };

  const handleDocumentClick = (e) => {
    if (!overlay.contains(e.target)) {
      return;
    }
  };

  // Cleanup function
  function cleanup() {
    if (currentSession) {
      try {
        currentSession.destroy();
      } catch (error) {
        console.error("Error destroying session:", error);
      }
      currentSession = null;
    }
    
    // Stop any ongoing speech synthesis
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
    
    // Remove all event listeners
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    document.removeEventListener("click", handleDocumentClick);
    
    // Remove overlay
    if (overlay && overlay.parentNode) {
      overlay.parentNode.removeChild(overlay);
    }
  }

  // Markdown renderer function
  function renderMarkdown(text) {
    return text
      // Headers
      .replace(/^### (.*$)/gim, '<h3 style="margin: 5px 0 6px 0; font-size: 17px; font-weight: 600;">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 style="margin: 5px 0 6px 0; font-size: 18x; font-weight: 600;">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 style="margin: 5px 0 7px 0; font-size: 19px; font-weight: 700;">$1</h1>')
      
      // Bold text
      .replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight: bold;">$1</strong>')
      .replace(/__(.*?)__/g, '<strong style="font-weight: bold;">$1</strong>')
      
      // Italic text
      .replace(/\*(.*?)\*/g, '<em style="font-style: italic;">$1</em>')
      .replace(/_(.*?)_/g, '<em style="font-style: italic;">$1</em>')
      
      // Code blocks
      .replace(/```([\s\S]*?)```/g, '<pre style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 5px; margin: 4px 0; overflow-x: auto;"><code style="color: #f0f0f0; font-family: \'Courier New\', monospace; font-size: 14px;">$1</code></pre>')
      
      // Inline code
      .replace(/`([^`]+)`/g, '<code style="background: rgba(0,0,0,0.3); padding: 2px 4px; border-radius: 3px; color: #f0f0f0; font-family: \'Courier New\', monospace; font-size: 13px;">$1</code>')
      
      // Lists
      .replace(/^\* (.*$)/gim, '<li style="margin: 2px 0; padding-left: 4px;">$1</li>')
      .replace(/^- (.*$)/gim, '<li style="margin: 2px 0; padding-left: 4px;">$1</li>')
      .replace(/^(\d+)\. (.*$)/gim, '<li style="margin: 2px 0; padding-left: 4px;">$2</li>')
      
      // Wrap consecutive list items in ul
      .replace(/(<li style="margin: 3px 0; padding-left: 5px;">.*<\/li>)/gs, '<ul style="margin: 4px 0; padding-left: 10px;">$1</ul>')
      
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:rgb(175, 213, 255); text-decoration: underline;" target="_blank">$1</a>')
      
      // Line breaks
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>');
  }

  // Utility functions
  function showMessage(message, type = "info") {
    const messageClass = type === "error" ? "error-message" : 
                        type === "loading" ? "loading-message" : 
                        type === "success" ? "success-message" : "info-message";
    
    if (type === "success") {
      // Render markdown for AI responses
      output.innerHTML = `<div class="${messageClass}">${renderMarkdown(message)}</div>`;
    } else {
      output.innerHTML = `<div class="${messageClass}">${message}</div>`;
    }
  }

  function extractMainContent() {
    // Create a temporary container to work with content without modifying the original DOM
    const bodyClone = document.body.cloneNode(true);
    
    // Remove unwanted elements from the clone (not the original page)
    const unwantedSelectors = 'script, style, nav, header, footer, aside, .advertisement, .ads, .sidebar, .menu, .navigation';
    const unwantedElements = bodyClone.querySelectorAll(unwantedSelectors);
    unwantedElements.forEach(el => el.remove());
    
    // Try to find main content areas in the clone
    const mainSelectors = [
      'main',
      '[role="main"]',
      '.main-content',
      '.content',
      '.post-content',
      '.article-content',
      'article',
      '.entry-content',
      'main',

      '.post',
      '#content',
      '#main',
      'div[role="main"]',
      '.article-content',
      '.article-body',
      '.story-body',
      '.article-text',
      '.story-content',
      '[itemprop="articleBody"]',
      // Straits Times specific selectors
      '.paid-premium-content',
      '.str-story-body',
      '.str-article-content',
      '#story-body',
      '.story-content',
      'file'
    ];
    
    let mainContent = '';
    
    for (const selector of mainSelectors) {
      const element = bodyClone.querySelector(selector);
      if (element) {
        mainContent = element.innerText || element.textContent || '';
        break;
      }
    }
    
    // Fallback to body content if no main content found
    if (!mainContent) {
      mainContent = bodyClone.innerText || bodyClone.textContent || '';
    }
    
    // Clean up the content
    mainContent = mainContent
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/\n\s*\n/g, '\n') // Remove empty lines
      .trim();
    
    // Limit content length to avoid token limits
    const maxLength = 8000;
    if (mainContent.length > maxLength) {
      mainContent = mainContent.substring(0, maxLength) + '...';
    }
    
    return mainContent;
  }

  async function extractPageContext() {
    try {
      const context = {
        url: window.location.href,
        title: document.title,
        domain: window.location.hostname,
        content: extractMainContent(),
        timestamp: new Date().toISOString()
      };
      
      console.log("Page context extracted:", context);
      return context;
    } catch (error) {
      console.error("Failed to extract page context:", error);
      return null;
    }
  }

  function buildContextualPrompt(userInput, pageContext) {
    if (!pageContext) {
      return userInput;
    }

    const contextInfo = `
Current Page Context:
- URL: ${pageContext.url}
- Title: ${pageContext.title}
- Domain: ${pageContext.domain}

Page Content:
${pageContext.content}

User Question: ${userInput}

Please provide a helpful response considering the current page context. If the user asks about the current page, use the provided content to give accurate information.
`;

    return contextInfo;
  }

  // Main prompt handling function
  async function handlePrompt() {
    const userInput = input.value.trim();
    if (!userInput) {
      showMessage("Please enter a question or prompt.", "error");
      return;
    }

    // Show loading state
    showMessage("Just a moment...", "loading");
    searchBtn.disabled = true;
    searchBtn.textContent = "Working...";

    try {
      // Extract fresh page context if needed
      if (!pageContext) {
        pageContext = await extractPageContext();
      }

      // Create or reuse session
      if (!currentSession) {
        currentSession = await LanguageModel.create();
      }

      // Build contextual prompt
      const contextualPrompt = buildContextualPrompt(userInput, pageContext);
      
      // Send prompt
      const response = await currentSession.prompt(contextualPrompt);
      
      // Display response
      showMessage(response, "success");
      
      // Clear input
      input.value = "";

    } catch (error) {
      console.error("Prompt error:", error);
      showMessage(`Error: ${error.message || "Something went wrong"}`, "error");
      
      // Clean up session on error
      if (currentSession) {
        currentSession.destroy();
        currentSession = null;
      }
    } finally {
      // Reset button state
      searchBtn.disabled = false;
      searchBtn.innerHTML = `
        <svg width="18px" height="18px" viewBox="0 0 20 20" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M1.68542 6.65868C0.758716 6.96758 0.779177 8.28543 1.71502 8.56541L9.20844 10.8072L11.6551 18.5165C11.948 19.4394 13.2507 19.4488 13.5569 18.5302L18.8602 2.62029C19.1208 1.83853 18.3771 1.09479 17.5953 1.35538L1.68542 6.65868ZM5.31842 7.55586L16.3304 3.8852L12.6316 14.9817L10.9548 9.69826C10.8547 9.38295 10.6052 9.13754 10.2883 9.04272L5.31842 7.55586Z" fill="currentColor"/>
                <path d="M17.7674 1.43951L18.8105 2.51742L9.98262 11.0605L8.93948 9.98265L17.7674 1.43951Z" fill="currentColor"/>
                </svg>&nbsp; Go
      `;
    }
  }

  // Feature handlers
  function setupFeatureHandlers() {
    const readOutBtn = overlay.querySelector("#read-out");
    const saveNoteBtn = overlay.querySelector("#save-note");
    const dyslexiaBtn = overlay.querySelector("#dyslexia-friendly");
    const translateBtn = overlay.querySelector("#translate");
    const modeChangeBtn = overlay.querySelector("#mode-change");

    // Read out functionality
    readOutBtn.addEventListener("click", () => {
      const outputText = output.textContent;
      if (outputText && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(outputText);
        const voices = speechSynthesis.getVoices();
        const femaleVoice = voices.find(v => v.name.toLowerCase().includes('zira'));
        if (femaleVoice) {
          utterance.voice = femaleVoice;
        }
        utterance.rate = 0.9;
        utterance.pitch = 1;
        speechSynthesis.speak(utterance);
      }
    });

    // Save note functionality
    saveNoteBtn.addEventListener("click", () => {
      const outputText = output.textContent;
      if (outputText) {
        const blob = new Blob([`# AI Response - ${new Date().toLocaleString()}\n\n${outputText}`], 
          { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `naina-note-${Date.now()}.md`;
        a.click();
        URL.revokeObjectURL(url);
      }
    });

    // Dyslexia friendly mode
    dyslexiaBtn.addEventListener("click", () => {
      isDyslexiaMode = !isDyslexiaMode;
      output.style.fontFamily = isDyslexiaMode ? 
        'OpenDyslexic, Comic Sans MS", "Comic Sans,' : 
        '"Segoe UI", Roboto, Arial, sans-serif';
      overlay.style.color = isDyslexiaMode ? "#332626" : "#f1f1f1";
      output.style.fontSize = isDyslexiaMode ? '17px': '16px';
      output.style.lineHeight = isDyslexiaMode ? '1.8' : '1.5';
      output.style.background = isDyslexiaMode ? "#f3e6de": "#71737980";
      output.style.color = isDyslexiaMode ? "#332626" : "#f1f1f1";
      input.style.background = "#f3e6de";
      input.style.color = "#332626";
      input.style.caretColor = "#332626";
      input.style.fontFamily = 'OpenDyslexic, "Comic Sans MS", "Comic Sans", sans-serif';
      input.style.letterSpacing = "0.05em";
      input.style.setProperty("--placeholder-color", "#332626");

      // Apply placeholder color using CSS
      const style = document.createElement("style");
      style.textContent = `
        input::placeholder {
          color: var(--placeholder-color, #332626);
          font-family: OpenDyslexic, "Comic Sans MS", "Comic Sans", sans-serif;
          letter-spacing: 0.05em;
        }
      `;
      document.head.appendChild(style);

      searchBtn.style.background = "#f3e6de";
      searchBtn.style.color = "#332626";
      searchBtn.style.fontFamily = 'OpenDyslexic, "Comic Sans MS", "Comic Sans", sans-serif';
      searchBtn.style.letterSpacing = "0.05em";

      footer.style.background = "#f3e6de";
      footer.style.color = "#332626";
      footer.style.fontFamily = 'OpenDyslexic, "Comic Sans MS", "Comic Sans", sans-serif';
      footer.style.letterSpacing = "0.05em";

      output.style.background = "#f3e6de";
      output.style.color = "#332626";
      output.style.fontFamily = 'OpenDyslexic, "Comic Sans MS", "Comic Sans", sans-serif';
      output.style.letterSpacing = "0.05em";
    });

    // Translate functionality
    translateBtn.addEventListener("click", async () => {
      const outputText = output.textContent;
      if (outputText && currentSession) {
        try {
          showMessage("Translating...", "loading");
          const translatePrompt = `Please translate the following text to English (if it's not already in English) or to a more readable format:\n\n${outputText}`;
          const translation = await currentSession.prompt(translatePrompt);
          showMessage(translation, "success");
        } catch (error) {
          showMessage("Translation failed. Please try again.", "error");
        }
      } else {
        showMessage("No text to translate or AI session not available.", "error");
      }
    });

  }

  // Initialize page context
  async function initializePageContext() {
    try {
      pageContext = await extractPageContext();
      if (pageContext) {
        console.log("Page context loaded:", pageContext.title);
        showMessage(`Waiting for your prompt OR something realted:  ${pageContext.title}?`);
      } else {
        showMessage("Ready to help! Ask me anything...", "info");
      }
    } catch (error) {
      console.error("Failed to initialize page context:", error);
      showMessage("Ready to help! Ask me anything...", "info");
    }
  }

  // Event listeners
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
  document.addEventListener("click", handleDocumentClick);

  // Dragging functionality
  header.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - overlay.getBoundingClientRect().left;
    offsetY = e.clientY - overlay.getBoundingClientRect().top;
    overlay.style.transition = "none";
    e.preventDefault();
  });

  // Close button - only way to close the overlay
  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    cleanup();
  });

  // Prevent overlay from closing when clicking inside it
  overlay.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent clicks inside overlay from bubbling up
  });

  // Input handling
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchBtn.click();
    }
  });

  // Search button
  searchBtn.addEventListener("click", async () => {
    await handlePrompt();
  });

  // Clean up on page unload
  window.addEventListener("beforeunload", cleanup);

  // Initialize everything
  setupFeatureHandlers();
  initializePageContext();

  // Focus input for better UX
  input.focus();

})();