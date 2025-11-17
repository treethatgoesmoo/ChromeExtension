# Universal Media Controller

A Chrome extension that provides unified media controls across all your tabs. Control playback, volume, and navigation for any media playing in your browser from a single, convenient popup.

## Features

- **Play/Pause Control**: Toggle playback across all tabs with media
- **Track Navigation**: Skip to next/previous tracks
- **Volume Control**: Adjust volume with a slider or quick buttons
- **Mute/Unmute**: Quickly mute all media
- **Seek Controls**: Jump forward or backward by 10 seconds
- **Tab Management**: See which tabs are playing media and click to switch to them
- **Keyboard Shortcuts**: Control media without using the mouse
- **Persistent Settings**: Volume and mute preferences are remembered

## Installation

### Install from Chrome Web Store
*(Coming soon)*

### Install as Developer Extension

1. **Clone or Download** this repository to your local machine

2. **Create Icons** (optional but recommended):
   - See `icons/ICONS_README.md` for instructions on creating proper icon files
   - Basic placeholder icons are provided, but you may want to create better ones

3. **Open Chrome Extensions Page**:
   - Open Chrome browser
   - Navigate to `chrome://extensions/`
   - Or click Menu (⋮) → More Tools → Extensions

4. **Enable Developer Mode**:
   - Toggle the "Developer mode" switch in the top-right corner

5. **Load the Extension**:
   - Click "Load unpacked" button
   - Navigate to and select the `ChromeExtension` folder
   - Click "Select Folder"

6. **Verify Installation**:
   - The Universal Media Controller should appear in your extensions list
   - You should see the extension icon in your Chrome toolbar
   - If not visible, click the puzzle piece icon and pin the extension

## Usage

### Basic Controls

1. **Open the Controller**: Click the extension icon in your toolbar

2. **Play/Pause**:
   - Click the play/pause button
   - Keyboard shortcut: `Space` or `K`

3. **Volume Control**:
   - Use the slider to set volume
   - Click +/- buttons for quick adjustments
   - Click speaker icon to mute/unmute
   - Keyboard shortcuts: `Arrow Up` (increase), `Arrow Down` (decrease), `M` (mute)

4. **Track Navigation**:
   - Click previous/next buttons
   - Keyboard shortcuts: `P` (previous), `N` (next)

5. **Seek**:
   - Click -10s or +10s buttons
   - Keyboard shortcuts: `Arrow Left` (back), `Arrow Right` (forward)

### Keyboard Shortcuts

When the popup is open:
- `Space` or `K` - Play/Pause
- `Arrow Left` - Seek backward 10s
- `Arrow Right` - Seek forward 10s
- `Arrow Up` - Volume up
- `Arrow Down` - Volume down
- `M` - Mute/Unmute
- `N` - Next track
- `P` - Previous track

### Managing Multiple Tabs

- The extension shows a list of all tabs with active media
- Click on any tab in the list to switch to it
- Controls affect all tabs with media simultaneously
- Click "Refresh" to update the tab list

## How It Works

The extension consists of three main components:

1. **Content Script** (`content.js`):
   - Injected into all web pages
   - Detects and controls HTML5 audio/video elements
   - Monitors for dynamically added media

2. **Background Service Worker** (`background.js`):
   - Manages communication between tabs and popup
   - Tracks which tabs have active media
   - Routes control commands to appropriate tabs

3. **Popup Interface** (`popup.html/js/css`):
   - Provides the user interface
   - Displays media controls and active tabs
   - Handles user interactions

## Supported Media Types

The extension works with:
- HTML5 `<audio>` elements
- HTML5 `<video>` elements
- Most streaming services (YouTube, Spotify Web, SoundCloud, etc.)
- Any website using standard HTML5 media players

## Limitations

- Does not control native media players (outside the browser)
- Some websites may have restrictions that prevent control
- Next/Previous may not work on all sites (depends on site implementation)
- Media Session API support varies by website

## Privacy

This extension:
- **Does NOT collect** any personal data
- **Does NOT send** any data to external servers
- **Does NOT track** your browsing activity
- Only accesses tabs to detect and control media elements
- All data stays local to your browser

## Permissions Explained

- **tabs**: To identify which tabs have media playing
- **activeTab**: To send control commands to tabs
- **storage**: To save volume and mute preferences
- **host_permissions (<all_urls>)**: To inject content script for media detection

## Development

### File Structure
```
ChromeExtension/
├── manifest.json           # Extension configuration
├── background.js          # Background service worker
├── content.js            # Content script for media control
├── popup.html            # Popup interface
├── popup.css             # Popup styling
├── popup.js              # Popup functionality
├── icons/                # Extension icons
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   ├── icon128.png
│   └── icon.svg          # Source SVG icon
└── README.md
```

### Building

No build process required. The extension runs directly from the source files.

### Customizing Icons

See `icons/ICONS_README.md` for instructions on creating custom icons.

## Troubleshooting

### Extension not detecting media

- Make sure media is actually playing on the page
- Try refreshing the page with the media
- Click the "Refresh" button in the extension popup
- Some websites load media dynamically; wait a few seconds and check again

### Controls not working

- Check that the website doesn't block script execution
- Some streaming services have their own media controls that may conflict
- Try refreshing the page and the extension popup

### Icons not showing

- The placeholder icons are minimal and may appear as small dots
- See `icons/ICONS_README.md` to create proper icon files
- The extension will still work perfectly even with placeholder icons

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## License

MIT License - feel free to use and modify as needed.

## Support

If you encounter issues or have questions, please open an issue on the GitHub repository.

---

**Enjoy controlling your media!** 🎵🎬🎧
