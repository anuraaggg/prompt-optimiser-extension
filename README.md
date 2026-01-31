# Prompt Optimiser Extension

Optimize your prompts with ease using this Chrome extension. Enter your prompt and customize it by goal, tone, and target audience.

## Features

- **Direct input** - Enter prompts directly in the extension popup
- **Customization options** - Choose from:
  - Goals: Explain, Code, Write, Analyse
  - Tones: Neutral, Formal, Technical
  - Audiences: Beginner, Intermediate, Expert
- **Copy optimized prompt** - One-click copy to clipboard
- **Timeout protection** - 30-second request timeout

## Installation

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select this folder
5. The extension will now appear in your Chrome toolbar

## Files

- `manifest.json` - Extension configuration
- `popup/popup.html` - Popup UI structure
- `popup/popup.js` - Popup logic and API integration
- `popup/popup.css` - Popup styling
- `icons/` - Extension icons

## Usage

1. Click the extension icon in your Chrome toolbar
2. Enter the prompt you want to optimize in the text area
3. Select your desired Goal, Tone, and Target Audience
4. Click "Optimise" and wait for the result
5. Click "Copy" to copy the optimized prompt to your clipboard

## Development

To modify the extension:
1. Edit the relevant files
2. Go to `chrome://extensions/` and click the refresh icon for this extension
3. Test your changes

## Architecture

The extension uses a lightweight popup-only architecture:
- All logic is in the popup (no background service worker or content scripts)
- API calls are made directly from the popup to the backend
- No page interaction required - pure extension-based optimization

