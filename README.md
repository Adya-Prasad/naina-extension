## Inspiration

Web browsing is an integral part of our lives, whether you're working, reading, or developing on the web. You have to interact in a browser. And you can't perform everything in an LLM chatbot, nor can you frequently switch tabs for AI help—and you need an internet connection. To solve this shortcoming, you need seamless AI assistance (an extension) that works on every tab page, always ready at your service to boost your productivity.

Other browser AI assistants (extensions) have very confusing and cluttered UIs and also require an active internet connection, user agreements, along with privacy concerns about monitoring your browser activity. So I created **Naina Assistant** with a clean and handy interface that lives in your browser, works both offline and online, and has no compromises on privacy or monitoring. _Everything under user control_.

> As the name **Naina** implies 'Vision' this extension can also see and understand what you're working on to provide context-specific help.

## What it does

Introducing **Naina Assistant**, a browser extension and multimodal AI companion that you can open on any webpage, ask your questions about that page or any general topic, and it will instantly provide you with accurate help and explanations, enhancing your productivity and learning capabilities.

1. **Clean and customizable UI:** Naina Assistant's UI is very minimal and focused so that it doesn't distract you from your work and helps you with your problems. It has a customizable interface; you can **drag** and **resize** it to your convenience, and it doesn't hide your current tab page.

It's a multi-featured AI extension that fulfills all your needs.

2. **User inputs & outputs:** Real-time chat with Chrome's built-in Gemini Nano AI provides context-specific and general responses/explanations, with no cloud requests and built with a privacy-first approach.
3. **Page Context Awareness:** Automatically extracts and analyzes current webpage content. Contains smart context usage—uses context only when relevant to user's query, otherwise provides general responses. Naina can understand `code` and files too.
4. **No external request sending:** For responses, it doesn't rely on the internet, any cloud requests, or additional API requests. Everything happens in the user's browser.
5. **Works both online and offline:** Whether you live in a remote area or have an unstable internet connection, it works seamlessly. It only requires an internet connection the first time to download the model.
6. **Persistent conversation history:** Persistent conversation history within a session for better context memory.
7. **Text-to-Speech (Read Aloud):** Reads AI responses using the browser's speech synthesis so that you can do _**multitasking**_. Toggle on/off by clicking again.
8. **Save Notes Feature:** One-click save conversations to local storage—everything under user control with no privacy trade-off. _Save your important read-later notes in just one click_.
9. **Dyslexia-Friendly Mode:** Naina has been designed to be suitable for **people with dyslexia**. Users can change color, background color, and font to dyslexia-friendly settings in one click.
10. **Multilingual Translation:** Users can translate AI responses into their desired language.
11. **Collection Save Page:** All saved notes organized in one place. Users can revise saved chats and manage saved notes on the collection page.
12. **Multiple shortcuts to open extension instantly:** Providing convenient and boosting your productivity without breaking your focus is the primary goal of Naina. User can open Naina chat in three ways:
    - Default method: from extension pin bar
    - Keyboard shortcut: **Ctrl + Shift + Q**
    - Right-click context menu → 'Naina Assistant' option
13. **Local in-device storage:** All saved chat data is stored locally in your browser—no sharing and no cloud storage.

## How I built it

Naina is empowered by Chrome's built-in Gemini Nano AI API. I developed Naina with **multimodal ability** with robust and simple technical implementation for stable and fast working.

- **AI APIs:**
  - **Prompt API** (Gemini Nano) for intelligent language model responses with streaming support
  - **Translator API** for multi-language translation (13+ languages)
- **Speech Synthesis:** Browser's built-in Web Speech API for text-to-speech functionality with voice selection.
- **Page context extraction:** DOM manipulation to clone and clean webpage content. Extracts main content from semantic HTML tags (main, article, .content)
- **Local note saving:** Chrome Storage API (`chrome.storage.local`) for persistent data storage
- **DOM Traversal:** TreeWalker API for format-preserving translation (translates text nodes while keeping HTML structure intact)

## Requirements:

**1. Browser Requirements:**
1a. Chrome Version: Chrome 127+ (Stable) or Chrome 138+ (for all features) [Chrome Canary]
1b. Operating System: Windows, macOS, Linux, or ChromeOS
1c. Internet Connection (unmetered): Required only for fetching articles from URLs (AI processing works offline and locally)

**2. AI Model Requirements**
2a. Gemini Nano: Built-in AI model (downloads automatically on first use)
2b. Storage Space: At least 22 GB of free space on the volume that contains your Chrome profile
2c. GPU: Strictly more than 4 GB of VRAM. CPU: 16 GB of RAM or more and 4 CPU cores or more.

3. Enable Chrome AI Features
   3a. `chrome://flags/#optimization-guide-on-device-model`
   3b. `chrome://flags/#prompt-api-for-gemini-nano`
   3c. `chrome://flags/#translation-api`

## Setup and Run

### Installation Steps

1. **Clone or Download the Repository**

   ```bash
   git clone https://github.com/YOUR-USERNAME/naina-extension.git
   ```

   Or download as ZIP and extract it.

2. **Enable above Chrome AI Features** and restart Chrome after enabling these flags

3. **Load the Extension**

   - Open Chrome and go to `chrome://extensions/`
   - Enable **Developer mode** (toggle in the top-right corner)
   - Click **"Load unpacked"**
   - Select the `naina-extension` folder (the one containing `manifest.json`)

4. **Pin the Extension**

   - Click the puzzle icon (🧩) in the Chrome toolbar
   - Find "Naina Assistant" and click the pin icon
   - The extension icon will now appear in your toolbar

5. **First-Time Setup**
   - Click the Naina Assistant icon or press **Ctrl + Shift + Q**
   - The chat interface will open, give your first input, it will download model automatically (this may take 2-5 minutes)
   - You'll see a download progress indicator
   - Once complete, you're ready to use Naina!

### Usage


### Troubleshooting

**Extension not loading:**

- Make sure all Chrome flags are enabled
- Restart Chrome completely
- Check that you're using Chrome 127+ or Chrome Canary 138+

**AI model not downloading:**

- Ensure you have 22+ GB free storage
- Check your internet connection (unmetered)
- Verify GPU/RAM requirements are met
- Try reloading the extension

**Extension not responding:**

- Refresh the webpage
- Reload the extension from `chrome://extensions/`
- Check browser console for errors (F12 → Console tab)

**Making Changes:**

1. Edit the files as needed
2. Go to `chrome://extensions/`
3. Click the reload icon (🔄) on the Naina Assistant card
4. Test your changes

### Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

#### License

This project is open source and available under the MIT License.

## Challenges I ran into

Ensuring Naina's accurate responses and smooth running features was a challenging task. These challenges taught me a lot:

1. **CSS Conflicts with External Websites:** Website CSS was overriding extension styles, breaking the overlay layout. I solved this by creating defensive CSS with explicit sizing constraints, high z-index values, and testing across multiple websites.

2. **Markdown Rendering Accuracy:** AI responses needed proper formatting (lists, code blocks, headers). I tackled this by building a custom markdown-to-HTML converter with smart line break handling and filtering empty list items.

3. **Persistent Chat History:** Managing multiple follow-up inputs/outputs in the same session was tricky—it conflicted with translation and note saving. I solved it by transforming from single-response to conversation array structure, storing messages with type identifiers (user/assistant), and using TreeWalker API to translate text nodes while preserving HTML structure.

4. **Extension Context Invalidation:** When the extension reloads, Chrome APIs throw errors. I handled this with comprehensive error handling, checking `chrome.runtime.id` availability, and providing user-friendly fallback messages.

## Accomplishments that I'm proud of

Solved a shortcoming need by creating a seamless and customizable extension that doesn't compromise on privacy and is always available at your fingertips.

## What I learned

- Privacy-first principles
- Safe DOM extraction & filtering and DOM traversal
- Deep dive into the browser's speech synthesis
- Working with client-side APIs

## What's next for Naina Assistant

- Direct multilingual input and output
- Memory management
- Media support in chat
