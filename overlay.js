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
            <input id="user-input" type="text" placeholder="⌕ Ask your querry..." />
            <button id="ai-search" title="Send">
                <svg viewBox="0 0 100 100" style="width: 17px; height: 17px;">
                    <path
                        d="M 25 5 L 75 5 Q 95 5 95 25 L 95 70 Q 95 90 75 90 L 55 90 L 50 98 L 45 90 L 25 90 Q 5 90 5 70 L 5 25 Q 5 5 25 5 Z"
                        fill="none" stroke="currentColor" stroke-width="8" stroke-linejoin="round" />
                    <g transform="rotate(-45 50 50)">
                        <rect x="72" y="30" width="6" height="40" rx="3" fill="currentColor" />
                        <path d="M 20 50 L 58 50 M 58 50 L 46 38 M 58 50 L 46 62" stroke="currentColor" stroke-width="8"
                            stroke-linecap="round" stroke-linejoin="round" fill="none" />
                    </g>
                </svg>&nbsp; Go
            </button>
        </div>
        <div id="naina-output">
            <div class="status-message">Ready to help! Ask your querrt...</div>
        </div>
        <footer>
            <div id="features">
                <div id="read-out" title="read out the response">
                    <svg viewBox="0 0 24 24" style="width: 20px; height: 20px;" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M10.4 1.8C11.5532 0.262376 14 1.07799 14 3.00001V21.1214C14 23.0539 11.5313 23.8627 10.3878 22.3049L6.49356 17H4C2.34315 17 1 15.6569 1 14V10C1 8.34315 2.34315 7 4 7H6.5L10.4 1.8ZM12 3L8.1 8.2C7.72229 8.70361 7.12951 9 6.5 9H4C3.44772 9 3 9.44772 3 10V14C3 14.5523 3.44772 15 4 15H6.49356C7.13031 15 7.72901 15.3032 8.10581 15.8165L12 21.1214V3Z"
                            fill="currentColor"></path>
                        <path
                            d="M16.2137 4.17445C16.1094 3.56451 16.5773 3 17.1961 3C17.6635 3 18.0648 3.328 18.1464 3.78824C18.4242 5.35347 19 8.96465 19 12C19 15.0353 18.4242 18.6465 18.1464 20.2118C18.0648 20.672 17.6635 21 17.1961 21C16.5773 21 16.1094 20.4355 16.2137 19.8256C16.5074 18.1073 17 14.8074 17 12C17 9.19264 16.5074 5.8927 16.2137 4.17445Z"
                            fill="currentColor"></path>
                        <path
                            d="M21.41 5C20.7346 5 20.2402 5.69397 20.3966 6.35098C20.6758 7.52413 21 9.4379 21 12C21 14.5621 20.6758 16.4759 20.3966 17.649C20.2402 18.306 20.7346 19 21.41 19C21.7716 19 22.0974 18.7944 22.2101 18.4509C22.5034 17.5569 23 15.5233 23 12C23 8.47672 22.5034 6.44306 22.2101 5.54913C22.0974 5.20556 21.7716 5 21.41 5Z"
                            fill="currentColor"></path>
                    </svg>
                </div>
                <div id="save-note" title="save current response as note">
                    <svg viewBox="0 0 24 24" style="width:20px; height:20px;" fill="none">
                        <path
                            d="M10 12H14M12 10V14M19.9592 15H16.6C16.0399 15 15.7599 15 15.546 15.109C15.3578 15.2049 15.2049 15.3578 15.109 15.546C15 15.7599 15 16.0399 15 16.6V19.9592M20 14.1031V7.2C20 6.07989 20 5.51984 19.782 5.09202C19.5903 4.71569 19.2843 4.40973 18.908 4.21799C18.4802 4 17.9201 4 16.8 4H7.2C6.0799 4 5.51984 4 5.09202 4.21799C4.71569 4.40973 4.40973 4.71569 4.21799 5.09202C4 5.51984 4 6.0799 4 7.2V16.8C4 17.9201 4 18.4802 4.21799 18.908C4.40973 19.2843 4.71569 19.5903 5.09202 19.782C5.51984 20 6.0799 20 7.2 20H14.1031C14.5923 20 14.8369 20 15.067 19.9447C15.2711 19.8957 15.4662 19.8149 15.6451 19.7053C15.847 19.5816 16.0199 19.4086 16.3658 19.0627L19.0627 16.3658C19.4086 16.0199 19.5816 15.847 19.7053 15.6451C19.8149 15.4662 19.8957 15.2711 19.9447 15.067C20 14.8369 20 14.5923 20 14.1031Z"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        </path>
                    </svg>
                </div>
                <div id="dyslexia-friendly" title="Dyslexia friendly mode">
                    <svg viewBox="0 0 24 24" style="width:20px; height:20px;" fill="none">
                        <path
                            d="M22 12V21M2 21L8 3L14 21M11 14H5M19 21C17.3431 21 16 19.6569 16 18V15C16 13.3431 17.3431 12 19 12C20.6569 12 22 13.3431 22 15V18C22 19.6569 20.6569 21 19 21Z"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        </path>
                    </svg>
                </div>
                <div id="mode-change" title="change mode">
                    <svg viewBox="0 0 16 16" style="width:20px; height:20px;" fill="currentColor">
                        <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 13V2a6 6 0 1 1 0 12z" />
                    </svg>
                </div>
      </div>
        </footer>
    </div>
  `;

  // Create and append the overlay
  const wrapper = document.createElement("div");
  wrapper.innerHTML = template.trim();
  const overlay = wrapper.firstElementChild;
  
  // Ensure overlay doesn't interfere with page styles
  overlay.style.all = "unset";
  overlay.style.position = "fixed";
  overlay.style.zIndex = "2147483647";
  overlay.style.pointerEvents = "auto";
  overlay.style.userSelect = "none";
  
  document.body.appendChild(overlay);

  // Get DOM elements
  const header = overlay.querySelector("#ui-header");
  const closeBtn = overlay.querySelector("#ui-close");
  const input = overlay.querySelector("#user-input");
  const searchBtn = overlay.querySelector("#ai-search");
  const output = overlay.querySelector("#naina-output");

  // State management
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;
  let currentSession = null;
  let pageContext = null;
  let isDyslexiaMode = false;

  // Event handler references for cleanup
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
    
    // Remove all event listeners
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    document.removeEventListener("click", handleDocumentClick);
    
    // Remove overlay
    if (overlay && overlay.parentNode) {
      overlay.parentNode.removeChild(overlay);
    }
  }

  // Add event listeners
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

  // Add a click listener to the document that does nothing for overlay clicks
  document.addEventListener("click", handleDocumentClick);

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

  // Old handlePrompt function removed - using enhanced version below

  // Check API availability
  async function checkAPIAvailability() {
    try {
      if (typeof LanguageModel === 'undefined') {
        return 'unavailable';
      }
      
      const availability = await LanguageModel.availability();
      return availability;
    } catch (error) {
      console.error("Availability check failed:", error);
      return 'unavailable';
    }
  }

  // Show message in output area
  function showMessage(message, type = "info") {
    const messageClass = type === "error" ? "error-message" : 
                        type === "loading" ? "loading-message" : 
                        type === "success" ? "success-message" : "info-message";
    
    output.innerHTML = `<div class="${messageClass}">${message}</div>`;
  }

  // Clean up on page unload
  window.addEventListener("beforeunload", cleanup);

  // Page context extraction functions
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

  function extractMainContent() {
    // Create a temporary container to work with content without modifying the original DOM
    const tempContainer = document.createElement('div');
    
    // Clone the body content to avoid modifying the original page
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
      '.entry-content'
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

  // Feature handlers
  function setupFeatureHandlers() {
    const readOutBtn = overlay.querySelector("#read-out");
    const saveNoteBtn = overlay.querySelector("#save-note");
    const dyslexiaBtn = overlay.querySelector("#dyslexia-friendly");
    const modeChangeBtn = overlay.querySelector("#mode-change");

    // Read out functionality
    readOutBtn.addEventListener("click", () => {
      const outputText = output.textContent;
      if (outputText && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(outputText);
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
        'OpenDyslexic, Arial, sans-serif' : 
        '"Segoe UI", Roboto, Arial, sans-serif';
      output.style.fontSize = isDyslexiaMode ? '16px' : '14px';
      output.style.lineHeight = isDyslexiaMode ? '1.8' : '1.5';
      dyslexiaBtn.style.color = isDyslexiaMode ? '#4a9eff' : '#a0a0a0';
    });

    // Mode change (placeholder for future features)
    modeChangeBtn.addEventListener("click", () => {
      showMessage("Mode change feature coming soon!", "info");
    });
  }

  // Initialize page context
  async function initializePageContext() {
    try {
      pageContext = await extractPageContext();
      if (pageContext) {
        console.log("Page context loaded:", pageContext.title);
        showMessage(`Ready! I can see you're on: ${pageContext.title}`, "info");
      } else {
        showMessage("Ready to help! Ask me anything...", "info");
      }
    } catch (error) {
      console.error("Failed to initialize page context:", error);
      showMessage("Ready to help! Ask me anything...", "info");
    }
  }

  // Enhanced prompt handling with context
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
        <svg viewBox="0 0 100 100" style="width: 17px; height: 17px;">
          <path d="M 25 5 L 75 5 Q 95 5 95 25 L 95 70 Q 95 90 75 90 L 55 90 L 50 98 L 45 90 L 25 90 Q 5 90 5 70 L 5 25 Q 5 5 25 5 Z" 
                fill="none" stroke="currentColor" stroke-width="8" stroke-linejoin="round"/>
          <g transform="rotate(-45 50 50)">
            <rect x="72" y="30" width="6" height="40" rx="3" fill="currentColor"/>
            <path d="M 20 50 L 58 50 M 58 50 L 46 38 M 58 50 L 46 62" 
                  stroke="currentColor" stroke-width="8" stroke-linecap="round" 
                  stroke-linejoin="round" fill="none"/>
          </g>
        </svg>&nbsp; Go
      `;
    }
  }

  // Initialize everything
  setupFeatureHandlers();
  initializePageContext();

  // Focus input for better UX
  input.focus();

})();