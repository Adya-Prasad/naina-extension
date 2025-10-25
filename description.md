# Naina Assistant - Chrome Extension

## Project Overview

Naina Assistant is a Chrome extension that provides AI assistance using Chrome's built-in Gemini Nano model through the Prompt API. The extension creates a draggable, resizable overlay on any webpage for seamless AI interaction with context awareness of the current page.

Naina names with meaning having vision, so same as its name reflect, naina can see your page, what happend

## What We Built

### Core Features

1. **AI Chat Interface**
   - Real-time chat with Chrome's built-in Gemini Nano AI
   - Persistent conversation history within a session
   - Context-aware responses based on current webpage content
   - Streaming responses for better UX
   - Chat-style interface with user messages (right-aligned blue bubbles) and AI responses (left-aligned plain text)

2. **Page Context Awareness**
   - Automatically extracts and analyzes current webpage content
   - Shows page title in welcome message
   - AI can answer questions about the current page
   - Smart context usage (only when relevant to user's query)

3. **Translation Feature**
   - Translate entire conversation to 13+ languages
   - Uses Chrome's built-in Translator API
   - Preserves HTML formatting (lists, line breaks, bold text, code blocks)
   - Translates text nodes while keeping structure intact
   - Supports: Arabic, Bangla, Chinese, French, German, Hindi, Italian, Korean, Portuguese, Russian, Spanish, Tamil, Telugu

4. **Dyslexia-Friendly Mode**
   - OpenDyslexic font for better readability
   - Adjusted colors (beige background, dark brown text)
   - Increased line height and letter spacing
   - Applies to all elements (input, output, buttons, user messages)

5. **Text-to-Speech (Read Aloud)**
   - Reads AI responses using browser's speech synthesis
   - Prioritizes female voices (Zira)
   - Adjustable rate and pitch
   - Toggle on/off by clicking again

6. **Save Notes Feature**
   - Save conversations to local storage
   - View saved notes in a dedicated collection page
   - Beautiful card-based UI for saved notes
   - Delete notes with confirmation modal
   - View full note content in modal

7. **Draggable & Resizable Overlay**
   - Drag from header or footer
   - Resize from left or right edges
   - Maintains position across interactions
   - Fixed positioning on viewport

8. **Markdown Rendering**
   - Headers (H1, H2, H3)
   - Bold and italic text
   - Code blocks with syntax highlighting
   - Inline code
   - Bullet and numbered lists
   - Links
   - Smart line break handling

## Technical Architecture

### File Structure

```
naina-extension/
├── manifest.json              # Extension configuration
├── background.js              # Service worker for extension logic
├── content_script.js          # Injects overlay into pages
├── overlay.js                 # Main overlay UI and AI functionality
├── overlay.css                # Styling for the overlay
├── markdown_renderer.js       # Markdown to HTML converter
├── collection.html            # Saved notes page
├── collection.js              # Saved notes functionality
├── collection.css             # Saved notes styling
├── images/                    # Extension icons
├── fonts/                     # OpenDyslexic font files
└── testings/                  # Test files
```

### Key Technologies

- **Chrome Built-in AI APIs:**
  - Prompt API (Gemini Nano)
  - Translator API
  - Language Detector API (referenced)

- **Web APIs:**
  - Speech Synthesis API
  - Chrome Storage API
  - Chrome Runtime Messaging
  - TreeWalker API (for translation)

- **Vanilla JavaScript** - No frameworks, pure JS
- **CSS3** - Modern styling with flexbox, animations
- **HTML5** - Semantic markup

## Development Journey

### Phase 1: Initial Setup & Basic Chat
- Set up Chrome extension structure
- Implemented basic overlay with draggable functionality
- Integrated Chrome's Prompt API
- Created simple input/output interface

### Phase 2: Chat Interface Transformation
**Problem:** Initially, the extension cleared output after each response, showing only the latest message.

**Solution:** 
- Transformed into a persistent chat interface
- User messages appear as styled bubbles (right-aligned)
- AI responses appear as plain text (left-aligned)
- All messages remain visible until extension is closed
- Added chat history array to track conversation

### Phase 3: Styling & UX Improvements
**Problems Faced:**

1. **Translation Language Selector Misalignment**
   - Issue: `#translation-lang` div was moving upward on some sites (devpost.com) and stretching on others (Chrome docs)
   - Root Cause: External website CSS was overriding our styles
   - Solution: Added explicit width/height constraints (27px x 27px), `flex-shrink: 0`, `box-sizing: border-box`, and reset margins/padding

2. **Horizontal Overflow from Code Blocks**
   - Issue: Wide code blocks caused horizontal scrollbar on entire output div
   - Solution: 
     - Added `overflow-x: hidden` to output container
     - Added `overflow-x: auto` to `<pre>` blocks only
     - Custom scrollbar styling for code blocks
     - Set `max-width: 100%` on code blocks

3. **Excessive Line Breaks**
   - Issue: AI responses had 4+ `<br>` tags at the end, creating huge gaps
   - Root Cause: Markdown renderer was converting every newline to `<br>` without cleanup
   - Solution:
     - Trim input text before processing
     - Convert double newlines to `<br><br><br>` (paragraph spacing)
     - Clean up 5+ consecutive breaks to max 3
     - Remove breaks after lists (lists have natural spacing)

4. **Empty List Items**
   - Issue: Empty `<li>` elements with only `::marker` appearing
   - Root Cause: Empty lines in markdown were creating empty list items
   - Solution: Added `.filter(item => item.length > 0)` after trimming list items

### Phase 4: Translation Feature Overhaul
**Problems Faced:**

1. **Only Translating Last Response**
   - Issue: Translation only worked on `OutputResponseCopy` (last AI response)
   - Solution: Changed to translate all visible content in output div

2. **Lost Formatting After Translation**
   - Issue: Translated text appeared as continuous line without formatting
   - Root Cause: Using `textContent` lost all HTML structure (lists, breaks, bold, etc.)
   - Solution: Created `translateElement()` function using TreeWalker API
     - Walks through DOM tree
     - Finds only text nodes
     - Translates each text node individually
     - Preserves all HTML tags and structure

3. **Clearing Previous Chat**
   - Issue: Translation cleared entire output and showed only translated text
   - Solution: Translate messages in-place without clearing output

### Phase 5: Code Cleanup & Optimization
**Problems Faced:**

1. **Unnecessary Classes**
   - Issue: Too many wrapper classes (`assistant-message`, `ai-response`, `chat-message` everywhere)
   - Solution: Removed redundant classes, kept only essential ones:
     - `.user-message` for user bubbles
     - `.ai-response-temp` for tracking streaming (removed after completion)
     - Simple classes for temp messages (`.info-msg`, `.error-msg`, `.success-msg`)

2. **Chat History Not Persisting**
   - Issue: During cleanup, accidentally made `addUserMessage()` clear output every time
   - Root Cause: `output.innerHTML = ""` was always executed
   - Solution: Only clear output if it contains welcome message

3. **Animation Overload**
   - Issue: Pulse animation during streaming was distracting
   - Solution: Removed `.ai-streaming` class and all animations

### Phase 6: Dyslexia Mode Enhancement
**Problem:** User messages weren't styled in dyslexia mode

**Solution:** Added border color and background color changes for `.user-message` elements in dyslexia mode toggle handler

## Challenges & Solutions

### Challenge 1: External CSS Conflicts
**Problem:** Website CSS was interfering with extension styling

**Solutions:**
- Used `!important` sparingly
- Added explicit sizing constraints
- Reset margins and padding
- Used `box-sizing: border-box`
- Set high z-index values

### Challenge 2: Markdown Rendering
**Problem:** Balancing proper formatting with clean output

**Solutions:**
- Smart line break handling (different rules for paragraphs vs lists)
- Filter empty list items
- Limit consecutive breaks
- Preserve code block formatting with horizontal scroll

### Challenge 3: Translation with Formatting
**Problem:** Standard text translation loses all HTML structure

**Solution:** 
- Used TreeWalker API to traverse DOM
- Translate only text nodes
- Keep all HTML tags intact
- Preserve lists, breaks, bold, code blocks

### Challenge 4: Context Awareness
**Problem:** AI needs page context but shouldn't always use it

**Solution:**
- Extract page content intelligently (remove nav, ads, etc.)
- Limit content to 8000 characters
- System prompt instructs AI to use context only when relevant
- Show page title in welcome message

## Key Learnings

1. **Chrome Built-in AI APIs are powerful** but require careful handling of model downloads and availability checks

2. **DOM manipulation is tricky** - Preserving HTML structure while modifying content requires TreeWalker API

3. **CSS isolation is crucial** - Extension styles must be defensive against external CSS

4. **UX matters** - Small details like line spacing, animations, and loading states make huge difference

5. **Markdown rendering is complex** - Need different rules for different elements (paragraphs, lists, code)

6. **Translation isn't just text replacement** - Must preserve formatting and structure

7. **Accessibility is important** - Dyslexia mode, keyboard shortcuts, and read-aloud features improve usability

## Future Improvements

- Add language detection for automatic source language
- Implement conversation export (PDF, TXT)
- Add theme customization
- Support for more languages
- Offline mode with cached responses
- Better error recovery
- Conversation search functionality
- Keyboard shortcuts for all features

## Conclusion

Naina Assistant demonstrates the power of Chrome's built-in AI capabilities combined with thoughtful UX design. Through iterative development and problem-solving, we created a robust, accessible, and user-friendly AI assistant that works seamlessly across any webpage.

The project showcases:
- Deep understanding of Chrome Extension APIs
- Advanced DOM manipulation techniques
- Careful attention to UX and accessibility
- Problem-solving through iterative refinement
- Clean, maintainable code architecture

---

**Built with ❤️ using Chrome's Built-in AI**
