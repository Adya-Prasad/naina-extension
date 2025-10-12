# Naina Assistant - Chrome Extension

A Chrome extension that provides AI assistance using Chrome's built-in Gemini Nano model through the Prompt API. The extension creates a draggable overlay on any webpage for seamless AI interaction.

## Features

- 🤖 **Chrome Built-in AI**: Uses Gemini Nano model via Chrome's Prompt API
- 🎯 **Draggable Overlay**: Clean, modern UI that can be moved around the page
- ⚡ **Real-time Responses**: Get instant AI responses to your questions
- 🔄 **Session Management**: Maintains conversation context across interactions
- 🎨 **Modern UI**: Beautiful glassmorphism design with smooth animations
- ⌨️ **Keyboard Shortcuts**: Use Ctrl+Shift+Q to toggle the overlay
- 🛡️ **Error Handling**: Comprehensive error handling and user feedback

## Requirements

### System Requirements
- **Operating System**: Windows 10/11, macOS 13+, Linux, or ChromeOS (Chromebook Plus)
- **Storage**: At least 22 GB of free space
- **GPU**: 4+ GB VRAM OR 16+ GB RAM with 4+ CPU cores
- **Network**: Unmetered connection (Wi-Fi/Ethernet recommended)

### Chrome Version
- Chrome 138+ with Prompt API support
- Origin trial participation may be required

## Installation

1. **Clone or download** this repository
2. **Open Chrome** and navigate to `chrome://extensions/`
3. **Enable Developer mode** (toggle in top-right corner)
4. **Click "Load unpacked"** and select the extension folder
5. **Pin the extension** to your toolbar for easy access

## Usage

### Opening the Assistant
- **Click the extension icon** in the toolbar, OR
- **Use keyboard shortcut** Ctrl+Shift+Q

### Interacting with AI
1. **Type your question** in the input field
2. **Press Enter** or click the Send button
3. **Wait for response** (loading indicator will show)
4. **Continue the conversation** - context is maintained

### Moving the Overlay
- **Drag the header** to move the overlay around the page
- **Click the X** to close the overlay

## Code Structure

```
├── manifest.json          # Extension configuration
├── background.js          # Service worker for extension logic
├── content.js            # Content script for page interaction
├── overlay.js            # Main overlay UI and AI functionality
├── overlay.css           # Styling for the overlay
├── naina-icon.png        # Extension icon
└── README.md             # This file
```

## Key Improvements Made

### 1. **Proper Chrome Prompt API Implementation**
- ✅ Correct API availability checking
- ✅ Proper session management
- ✅ Error handling for API failures
- ✅ Resource cleanup on errors

### 2. **Clean Code Architecture**
- ✅ Removed duplicate code
- ✅ Modular function structure
- ✅ Proper event handling
- ✅ Memory leak prevention

### 3. **Enhanced User Experience**
- ✅ Loading states and animations
- ✅ Clear error messages
- ✅ Keyboard shortcuts
- ✅ Responsive design

### 4. **Robust Error Handling**
- ✅ API availability checks
- ✅ Network error handling
- ✅ User-friendly error messages
- ✅ Graceful degradation

## API Usage

The extension uses Chrome's built-in Prompt API:

```javascript
// Check API availability
const availability = await LanguageModel.availability();

// Create session
const session = await LanguageModel.create();

// Send prompt
const response = await session.prompt("Your question here");

// Clean up
session.destroy();
```

## Troubleshooting

### Extension Not Working
1. **Check Chrome version** - Must be 138+
2. **Verify system requirements** - Ensure sufficient storage/RAM
3. **Check network connection** - Must be unmetered
4. **Reload the extension** - Go to chrome://extensions/ and click reload

### AI Not Responding
1. **Check API availability** - Look for error messages in overlay
2. **Verify permissions** - Ensure extension has proper permissions
3. **Check Chrome flags** - Some AI features may need to be enabled
4. **Restart Chrome** - Sometimes required for API initialization

### Performance Issues
1. **Close other tabs** - Free up memory
2. **Check storage space** - Ensure 22GB+ available
3. **Restart the session** - Close and reopen the overlay

## Development

### Testing
1. Load the extension in developer mode
2. Test on various websites
3. Check console for errors
4. Verify API responses

### Customization
- Modify `overlay.css` for styling changes
- Update `overlay.js` for functionality changes
- Adjust `manifest.json` for permissions/configuration

## Privacy & Security

- **No data collection** - All processing happens locally
- **No external API calls** - Uses Chrome's built-in AI
- **No tracking** - Extension doesn't track user behavior
- **Local processing** - AI runs on your device

## License

This project is open source. Feel free to modify and distribute according to your needs.

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review Chrome's Prompt API documentation
3. Check Chrome's built-in AI requirements
4. Verify your system meets the requirements

---

**Note**: This extension requires Chrome's built-in AI features which are still in development. Some features may not be available in all regions or Chrome versions.